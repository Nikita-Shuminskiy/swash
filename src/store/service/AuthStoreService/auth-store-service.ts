import RootStore from '../../RootStore'import { LoadingEnum } from '../../types/types'import { deviceStorage } from '../../../utils/storage/storage'import { ClientRegisterPayloadType } from '../../../api/Client/type'export class AuthStoreService {	rootStore: typeof RootStore	constructor(rootStore: typeof RootStore) {		this.rootStore = rootStore	}	async sendClientVerifyCode(code: string): Promise<any | void> {		try {			const data = await this.rootStore.AuthStore.sendClientVerifyCode(code)			return data.data		} catch (e) {			console.log(e, 'sendClientVerifyCode')			this.rootStore.Notification.setNotification('error', true, 'sendClientVerifyCode')		} finally {		}	}	async sendClientCode(formattedPhoneNumber?: string): Promise<boolean | void> {		this.rootStore.Notification.setIsLoading(LoadingEnum.fetching)		try {			const data = await this.rootStore.AuthStore.sendClientCode(formattedPhoneNumber)			return true		} catch (e) {			console.log(e, 'sendClientCode')			this.rootStore.Notification.setNotification('error', true, 'sendClientCode')		} finally {			this.rootStore.Notification.setIsLoading(LoadingEnum.success)		}	}	async sendClientRegister(payload: ClientRegisterPayloadType): Promise<boolean | void> {		try {			await this.rootStore.AuthStore.sendClientRegister(payload)			const idOrder = await this.rootStore.OrdersStore.createOrderClient({				hypo: 0,				iron: 0,			})			await this.rootStore.OrdersStore.getOrderReportDetail(idOrder)			this.rootStore.AuthStore.setAuth(true)			return true		} catch (e) {		} finally {		}	}	async updateUserInfo(payload: ClientRegisterPayloadType): Promise<boolean | void> {		this.rootStore.Notification.setLocalLoading(LoadingEnum.fetching)		try {			await this.rootStore.AuthStore.sendClientRegister(payload)			await this.rootStore.AuthStore.getSettingsClient()			return true		} catch (e) {			console.log(e)		} finally {			this.rootStore.Notification.setLocalLoading(LoadingEnum.success)		}	}	async updateClientPhoto(photo: string): Promise<boolean | void> {		this.rootStore.Notification.setLocalLoading(LoadingEnum.fetching)		try {			await this.rootStore.AuthStore.updateClientPhoto(photo)			await this.rootStore.AuthStore.getSettingsClient()			return true		} catch (e) {			return false		} finally {			this.rootStore.Notification.setLocalLoading(LoadingEnum.success)		}	}	async checkToken(): Promise<boolean | void> {		try {			const token = await deviceStorage.getItem('token')			return true		} catch (e) {			return false		} finally {		}	}	async logout(): Promise<boolean | void> {		this.rootStore.Notification.setLocalLoading(LoadingEnum.fetching)		try {			await this.rootStore.AuthStore.logout()			await deviceStorage.removeItem('token')			await deviceStorage.removeItem('clients_id')			this.rootStore.AuthStore.clearStore()			this.rootStore.OrdersStore.clearStore()			this.rootStore.Notification.setInitLoading(LoadingEnum.success)			this.rootStore.AuthStore.setAuth(false)			return true		} catch (e) {			return false		} finally {			this.rootStore.Notification.setLocalLoading(LoadingEnum.success)		}	}	async forgotAboutDevice(): Promise<boolean | void> {		this.rootStore.Notification.setLocalLoading(LoadingEnum.fetching)		try {			await this.rootStore.AuthStore.forgotAboutDevice()			await deviceStorage.removeItem('token')			await deviceStorage.removeItem('clients_id')			this.rootStore.AuthStore.clearStore()			this.rootStore.Notification.setInitLoading(LoadingEnum.success)			this.rootStore.OrdersStore.clearStore()			this.rootStore.AuthStore.setAuth(false)			return true		} catch (e) {			return false		} finally {			this.rootStore.Notification.setLocalLoading(LoadingEnum.success)		}	}}export default AuthStoreService