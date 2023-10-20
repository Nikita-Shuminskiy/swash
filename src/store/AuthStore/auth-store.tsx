import { action, makeObservable, observable } from 'mobx'
import {authApi, AuthGooglePayload} from '../../api/authApi'
import { deviceStorage } from '../../utils/storage/storage'
import { clientApi } from '../../api/Client/clientApi'
import { ClientRegisterPayloadType, DataSettingClientType, LogisticsPointType } from '../../api/Client/type'
import {language} from "../../utils/commonUtils";
import { createAlert } from '../../components/CreateAlert'

export class AuthStore {
	isAuth: boolean = false
	phone: string = ''
	logisticPoints: LogisticsPointType[] = [] as LogisticsPointType[]
	clientSettings: DataSettingClientType = {} as DataSettingClientType

	setAuth(auth: boolean): void {
		this.isAuth = auth
	}

	setPhone(phone: string): void {
		this.phone = phone
	}

	setLogisticPoints(data: LogisticsPointType[]): void {
		this.logisticPoints = data
	}

	setClientSettings(data: any): void {
		this.clientSettings = data
	}

	async setUserAuthData(token: string) {
		const currentDate = new Date().toISOString();
		await deviceStorage.saveItem('token', token)
		await deviceStorage.saveItem('tokenDate', currentDate)
	}

	async sendClientCode(formattedPhoneNumber?: string) {
		const payload = {
			phone: formattedPhoneNumber ?? this.phone,
		}

		const {data} =  await authApi.sendClientCode(payload)

	}

	async sendClientVerifyCode(code: string) {
		const payload = {
			phone_verify_code: code,
		}
		return await authApi.sendClientCodeVerify(payload)
	}

	async getLogisticPoints() {
		const { data } = await clientApi.getLogisticPoints({ country: 'PL' }) // временно
		this.setLogisticPoints(data.points)
		/*
				const dataPushMessages = await clientApi.getClientPushMessages(payload)*/
	}

	async getSettingsClient() {
		const { data } = await clientApi.getSettingsClient()
		this.setClientSettings(data)
		return data
	}

	async logout() {
		const { data } = await authApi.logout()
	}

	async forgotAboutDevice() {
		const { data } = await authApi.forgotAboutDevice()
	}

	clearStore() {
		this.phone = ''
		this.logisticPoints = []
		this.clientSettings = {} as DataSettingClientType
	}

	async sendClientRegister(payload: ClientRegisterPayloadType) {
		const { data } = await clientApi.sendClientRegister(payload)
		return data
	}
	async updateClientPhoto(photo: string) {
		const { data } = await clientApi.updateClientPhoto(photo)
		return data
	}
	async authWithGoogle(payload: AuthGooglePayload) {
		const { data } = await authApi.authWithGoogle(payload)
		await this.setUserAuthData(data?.token)
		return data
	}
	constructor() {
		makeObservable(this, {
			clientSettings: observable,
			isAuth: observable,
			logisticPoints: observable,
			phone: observable,
			setPhone: action,
			getSettingsClient: action,
			authWithGoogle: action,
			updateClientPhoto: action,
			setClientSettings: action,
			sendClientVerifyCode: action,
			getLogisticPoints: action,
			setAuth: action,
			setUserAuthData: action,
			sendClientCode: action,
			clearStore: action,
			setLogisticPoints: action,
		})
		this.setAuth = this.setAuth.bind(this)
		this.setLogisticPoints = this.setLogisticPoints.bind(this)
		this.getSettingsClient = this.getSettingsClient.bind(this)
		this.updateClientPhoto = this.updateClientPhoto.bind(this)
		this.sendClientCode = this.sendClientCode.bind(this)
		this.setPhone = this.setPhone.bind(this)
		this.clearStore = this.clearStore.bind(this)
		this.sendClientVerifyCode = this.sendClientVerifyCode.bind(this)
		this.getLogisticPoints = this.getLogisticPoints.bind(this)
		this.setUserAuthData = this.setUserAuthData.bind(this)
	}
}

export default new AuthStore()
