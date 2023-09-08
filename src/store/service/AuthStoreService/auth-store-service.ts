import RootStore from '../../RootStore'import { LoadingEnum } from '../../types/types'import { deviceStorage } from '../../../utils/storage/storage'export class AuthStoreService {	rootStore: typeof RootStore	constructor(rootStore: typeof RootStore) {		this.rootStore = rootStore	}	async sendClientVerifyCode(code: string): Promise<any | void> {		try {			const data = await this.rootStore.AuthStore.sendClientVerifyCode(code)			return data.data		} catch (e) {			console.log(e, 'sendClientVerifyCode')			this.rootStore.Notification.setNotification('error', true, 'sendClientVerifyCode')		} finally {		}	}	async sendClientCode(formattedPhoneNumber?: string): Promise<boolean | void> {		this.rootStore.Notification.setIsLoading(LoadingEnum.fetching)		try {			const data = await this.rootStore.AuthStore.sendClientCode(formattedPhoneNumber)			return true		} catch (e) {			console.log(e, 'sendClientCode')			this.rootStore.Notification.setNotification('error', true, 'sendClientCode')		} finally {			this.rootStore.Notification.setIsLoading(LoadingEnum.success)		}	}	async sendClientRegister(payload: {		phone?: string,		country?: string,		language?: string,		consent_datetime?: string	}): Promise<boolean | void> {		try {			await this.rootStore.AuthStore.sendClientRegister(payload)			const idOrder = await this.rootStore.OrdersStore.createOrderClient({				hypo: 0,				iron: 0,			})			await this.rootStore.OrdersStore.getOrderReportDetail(idOrder)			this.rootStore.AuthStore.setAuth(true)			return true		} catch (e) {		} finally {		}	}	async checkToken(): Promise<boolean | void> {		try {			const token = await deviceStorage.getItem('token')			return true		} catch (e) {			return false		} finally {		}	}	async logout(): Promise<boolean | void> {		this.rootStore.Notification.setLocalLoading(LoadingEnum.fetching)		try {			await this.rootStore.AuthStore.logout()			await deviceStorage.removeItem('token')			await deviceStorage.removeItem('clients_id')			this.rootStore.AuthStore.clearStore()			this.rootStore.OrdersStore.clearStore()		} catch (e) {			return false		} finally {			this.rootStore.Notification.setLocalLoading(LoadingEnum.success)		}	}}export default AuthStoreService