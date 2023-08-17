import { action, makeObservable, observable } from 'mobx'
import { authApi } from '../../api/authApi'
import { deviceStorage } from '../../utils/storage/storage'
import { UserAuthGoogleData } from '../../screen/authScreens/LoginS'
import { country, language } from '../../utils/commonUtils'

export class AuthStore {
	user: any = {} as any
	userAuthGoogleData: UserAuthGoogleData = {} as UserAuthGoogleData
	isAuth: boolean = false
	phone: string = ''


	setUser(userData: any): void {
		this.user = userData
	}

	setAuth(auth: boolean): void {
		this.isAuth = auth
	}

	setPhone(phone: string): void {
		this.phone = phone
	}

	async setUserAuthData(userData: UserAuthGoogleData) {
		await deviceStorage.saveItem('token', userData.token)
		await deviceStorage.saveItem('clients_id', userData.clients_id)
		this.userAuthGoogleData = userData
	}

	async sendClientVerifyCode(phone: string) {
		const token = await deviceStorage.getItem('token')
		const clients_id = await deviceStorage.getItem('clients_id')
		const payload = {
			clients_id: '1',
			token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoia2VuaGVybGlAZ21haWwuY29tIiwiZXhwaXJlIjoxNzIzODI3Mjg5LjUyODc0M30.QrHmrh0mZGNOrGx8lrzEXYgsgvk3NVHVjsejR20gMfs.Y2xpZW50cw',
			phone_verify_code: phone,
		}
		this.setPhone(phone)
		const sendClientCodeVerify = await authApi.sendClientCodeVerify(payload)
		console.log(sendClientCodeVerify)
	}

	async getBaseInfoClient() {
		const payload = {
			clients_id: this.userAuthGoogleData.clients_id,
			token: this.userAuthGoogleData.token,
		}
		const dataPushMessages = await authApi.getClientPushMessages(payload)

		const dataSettingClient = await authApi.getSettingsClient(payload)
		const dataDictionary = await authApi.getDictionary({ language })
		const dataReportClient = await authApi.getOrderReportClient({ ...payload })
		console.log(country)
		const dataLogisticPoints = await authApi.getLogisticPoints({ country })
		console.log(dataLogisticPoints)
		console.log(dataReportClient)
		console.log(dataDictionary)
		console.log(dataPushMessages)
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
		})
		this.setAuth = this.setAuth.bind(this)
		this.setPhone = this.setPhone.bind(this)
		this.sendClientVerifyCode = this.sendClientVerifyCode.bind(this)
		this.getBaseInfoClient = this.setAuth.bind(this)
		this.setUserAuthData = this.setUserAuthData.bind(this)
	}
}

export default new AuthStore()
