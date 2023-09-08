import { action, makeObservable, observable } from 'mobx'
import { authApi } from '../../api/authApi'
import { deviceStorage } from '../../utils/storage/storage'
import { UserAuthGoogleData } from '../../screen/authScreens/LoginS'
import { clientApi } from '../../api/Client/clientApi'
import { DataSettingClientType, LogisticsPointType } from '../../api/Client/type'

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

	async setUserAuthData(userData: UserAuthGoogleData) {
		await deviceStorage.saveItem('token', userData.token)
		await deviceStorage.saveItem('clients_id', userData.clients_id)
	}

	async sendClientCode(formattedPhoneNumber?: string) {
		const token = await deviceStorage.getItem('token')
		const clients_id = await deviceStorage.getItem('clients_id')
		const payload = {
			clients_id: clients_id,
			token: token,
			phone: formattedPhoneNumber ?? this.phone,
		}
		await authApi.sendClientCode(payload)
	}

	async sendClientVerifyCode(code: string) {
		const token = await deviceStorage.getItem('token')
		const clients_id = await deviceStorage.getItem('clients_id')
		const payload = {
			clients_id: clients_id,
			token: token,
			phone_verify_code: code,
		}
		return await authApi.sendClientCodeVerify(payload)
	}

	async getLogisticPoints() {
		const { data } = await clientApi.getLogisticPoints({ country: 'PL' }) // временно
		this.setLogisticPoints(data.points)
		/*		const { data: dataDictionary } = await clientApi.getDictionary({ language })
				const dataPushMessages = await clientApi.getClientPushMessages(payload)*/
	}

	async getSettingsClient() {
		const { data } = await clientApi.getSettingsClient()
		this.setClientSettings(data)
		return data
	}

	async logout() {
		await authApi.logout()
	}

	clearStore() {
		this.phone = ''
		this.logisticPoints = []
		this.clientSettings = {} as DataSettingClientType
	}

	async sendClientRegister(payload: {
		phone?: string,
		country?: string,
		language?: string,
		consent_datetime?: string
	}) {
		const token = await deviceStorage.getItem('token')
		const clients_id = await deviceStorage.getItem('clients_id')
		const { data } = await clientApi.sendClientRegister({ ...payload, clients_id, token })
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
			setClientSettings: action,
			sendClientVerifyCode: action,
			getLogisticPoints: action,
			setAuth: action,
			setUserAuthData: action,
			sendClientCode: action,
			clearStore: action,
			logout: action,
			setLogisticPoints: action,
		})
		this.setAuth = this.setAuth.bind(this)
		this.setLogisticPoints = this.setLogisticPoints.bind(this)
		this.getSettingsClient = this.getSettingsClient.bind(this)
		this.sendClientCode = this.sendClientCode.bind(this)
		this.setPhone = this.setPhone.bind(this)
		this.logout = this.logout.bind(this)
		this.clearStore = this.clearStore.bind(this)
		this.sendClientVerifyCode = this.sendClientVerifyCode.bind(this)
		this.getLogisticPoints = this.getLogisticPoints.bind(this)
		this.setUserAuthData = this.setUserAuthData.bind(this)
	}
}

export default new AuthStore()
