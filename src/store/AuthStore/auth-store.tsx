import { action, makeObservable, observable } from 'mobx'
import { authApi } from '../../api/authApi'
import { deviceStorage } from '../../utils/storage/storage'
import { UserAuthGoogleData } from '../../screen/authScreens/LoginS'
import { country, language } from '../../utils/commonUtils'
import { clientApi } from '../../api/Client/clientApi'

export class AuthStore {
	user: any = {} as any
	userAuthGoogleData: UserAuthGoogleData = {} as UserAuthGoogleData
	isAuth: boolean = false
	phone: string = ''
	clientCode: number = 0


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
			phone: formattedPhoneNumber ?? this.phone
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
		/*const dataGetOrderReportClient =  await clientApi.getOrderReportClient({ ...payload }) // ok
		const dataPushMessages = await clientApi.getClientPushMessages(payload) // не коректный метод*/

		const {data: dataSetting} = await clientApi.getSettingsClient(payload)
		console.log(dataSetting.orders)
		return !!dataSetting.client.phone_verify_datetime
		/*const { data: dataDictionary } = await clientApi.getDictionary({ language }) // basik auth failed
		console.log(dataDictionary)
		const { data: dataLogistic } = await clientApi.getLogisticPoints({ country }) //Basic authorization faul
		console.log(dataLogistic)*/
	}

	constructor() {
		makeObservable(this, {
			user: observable,
			isAuth: observable,
			phone: observable,
			setUser: action,
			setPhone: action,
			sendClientVerifyCode: action,
			getBaseInfoClient: action,
			setAuth: action,
			setUserAuthData: action,
			sendClientCode: action,
		})
		this.setAuth = this.setAuth.bind(this)
		this.sendClientCode = this.sendClientCode.bind(this)
		this.setPhone = this.setPhone.bind(this)
		this.sendClientVerifyCode = this.sendClientVerifyCode.bind(this)
		this.getBaseInfoClient = this.getBaseInfoClient.bind(this)
		this.setUserAuthData = this.setUserAuthData.bind(this)
	}
}

export default new AuthStore()
