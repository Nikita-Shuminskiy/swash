import RootStore from '../../RootStore'import { LoadingEnum } from '../../types/types'import { deviceStorage } from '../../../utils/storage/storage'export class AuthStoreService {	rootStore: typeof RootStore	constructor(rootStore: typeof RootStore) {		this.rootStore = rootStore	}	async getClientBaseInfo() {		this.rootStore.Notification.setIsLoading(LoadingEnum.fetching)		try {			const data = await this.rootStore.AuthStore.getBaseInfoClient()		} catch (e) {			console.log(e, 'getClientBaseInfo')		} finally {			this.rootStore.Notification.setIsLoading(LoadingEnum.success)		}	}	async sendClientVerifyCode(code: string): Promise<any | void> {		//this.rootStore.Notification.setIsLoading(LoadingEnum.fetching)		try {			const data = await this.rootStore.AuthStore.sendClientVerifyCode(code)			console.log(data)			return data.data		} catch (e) {			console.log(e, 'sendClientVerifyCode')			this.rootStore.Notification.setNotification('error', true, 'sendClientVerifyCode')		} finally {			//this.rootStore.Notification.setIsLoading(LoadingEnum.success)		}	}	async sendClientCode(formattedPhoneNumber?: string): Promise<boolean | void> {		this.rootStore.Notification.setIsLoading(LoadingEnum.fetching)		try {			const data = await this.rootStore.AuthStore.sendClientCode(formattedPhoneNumber)			return true		} catch (e) {			console.log(e, 'sendClientCode')			this.rootStore.Notification.setNotification('error', true, 'sendClientCode')		} finally {			this.rootStore.Notification.setIsLoading(LoadingEnum.success)		}	}	async checkToken(): Promise<boolean | void> {		this.rootStore.Notification.setIsLoading(LoadingEnum.fetching)		try {			const token = await deviceStorage.getItem('token')			return true		} catch (e) {			return false		} finally {			this.rootStore.Notification.setIsLoading(LoadingEnum.success)		}	}}export default AuthStoreService