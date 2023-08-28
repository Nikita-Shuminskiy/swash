import { action, makeObservable, observable } from 'mobx'
import { authApi } from '../../api/authApi'
import { deviceStorage } from '../../utils/storage/storage'
import { UserAuthGoogleData } from '../../screen/authScreens/LoginS'
import { clientApi } from '../../api/Client/clientApi'
import { DataSettingClientType } from '../../api/Client/type'

export class AuthStore {
	user: any = {} as any
	userAuthGoogleData: UserAuthGoogleData = {} as UserAuthGoogleData
	isAuth: boolean = false
	phone: string = ''
	clientCode: number = 0
	clientSettings: DataSettingClientType = {} as DataSettingClientType

	setUser(userData: any): void {
		this.user = userData
	}

	setAuth(auth: boolean): void {
		this.isAuth = auth
	}

	setPhone(phone: string): void {
		this.phone = phone
	}

	setClientCode(code: number): void {
		this.clientCode = code
	}

	setClientSettings(data: any): void {
		this.clientSettings = data
	}

	async setUserAuthData(userData: UserAuthGoogleData) {
		await deviceStorage.saveItem('token', userData.token)
		await deviceStorage.saveItem('clients_id', userData.clients_id)
		this.userAuthGoogleData = userData
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

	async getBaseInfoClient() {

		const token = await deviceStorage.getItem('token')
		const clients_id = await deviceStorage.getItem('clients_id')
		const payload = {
			clients_id: clients_id,
			token: token,
		}
	//const dataPushMessages = await clientApi.getClientPushMessages(payload) // не коректный метод*/
		/*const { data: dataDictionary } = await clientApi.getDictionary({ language }) // basik auth failed
		console.log(dataDictionary)
		const { data: dataLogistic } = await clientApi.getLogisticPoints({ country }) //Basic authorization faul
		console.log(dataLogistic)*/
	}
	async getSettingsClient() {
		const token = await deviceStorage.getItem('token')
		const clients_id = await deviceStorage.getItem('clients_id')
		const { data } = await clientApi.getSettingsClient(
			{
				token,
				clients_id
			}
		)
		return data
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
			user: observable,
			clientSettings: observable,
			isAuth: observable,
			phone: observable,
			setUser: action,
			setPhone: action,
			getSettingsClient: action,
			setClientSettings: action,
			sendClientVerifyCode: action,
			getBaseInfoClient: action,
			setAuth: action,
			setUserAuthData: action,
			sendClientCode: action,
		})
		this.setAuth = this.setAuth.bind(this)
		this.getSettingsClient = this.getSettingsClient.bind(this)
		this.sendClientCode = this.sendClientCode.bind(this)
		this.setPhone = this.setPhone.bind(this)
		this.sendClientVerifyCode = this.sendClientVerifyCode.bind(this)
		this.getBaseInfoClient = this.getBaseInfoClient.bind(this)
		this.setUserAuthData = this.setUserAuthData.bind(this)
	}
}

export default new AuthStore()
