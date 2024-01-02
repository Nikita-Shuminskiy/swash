import RootStore from '../../RootStore'import { LoadingEnum } from '../../types/types'import { deviceStorage } from '../../../utils/storage/storage'import {ClientRegisterPayloadType, NotificationResponse} from '../../../api/Client/type'import {authApi, AuthGooglePayload} from "../../../api/authApi";import {routerConstants} from "../../../constants/routerConstants";import {processingNavigationOrderStatus} from "../../../screen/Main/Orders/utils";export class AuthStoreService {	rootStore: typeof RootStore	constructor(rootStore: typeof RootStore) {		this.rootStore = rootStore	}	async sendClientVerifyCode(code: string): Promise<any | void> {		try {			const data = await this.rootStore.AuthStore.sendClientVerifyCode(code)			return data.data		} catch (e) {			this.rootStore.Notification.setServerResponse({serverResponse: e?.message})		} finally {		}	}	async sendClientCode(formattedPhoneNumber?: string): Promise<boolean | void> {		this.rootStore.Notification.setIsLoading(LoadingEnum.fetching)		try {			const data = await this.rootStore.AuthStore.sendClientCode(formattedPhoneNumber)			return true		} catch (e) {			this.rootStore.Notification.setServerResponse({serverResponse: e?.message})		} finally {			this.rootStore.Notification.setIsLoading(LoadingEnum.success)		}	}	async sendClientRegister(payload: ClientRegisterPayloadType): Promise<boolean | void> {		try {			const data = await this.rootStore.AuthStore.sendClientRegister(payload)			/*const idOrder = await this.rootStore.OrdersStore.createOrderClient({				hypo: 0,				iron: 0,			})			await this.rootStore.OrdersStore.getOrderReportDetail(idOrder)*/			//this.rootStore.AuthStore.setAuth(true)			return true		} catch (e) {			this.rootStore.Notification.setServerResponse({serverResponse: e?.message})		} finally {		}	}	async updateUserInfo(payload: ClientRegisterPayloadType): Promise<boolean | void> {		this.rootStore.Notification.setLocalLoading(LoadingEnum.fetching)		try {			const data = await this.rootStore.AuthStore.sendClientRegister(payload)			await this.rootStore.AuthStore.getSettingsClient()			if(payload.language) {				await this.rootStore.DictionaryStore.sendDictionary(payload.language)			}			return true		} catch (e) {			this.rootStore.Notification.setServerResponse({serverResponse: e?.message})		} finally {			this.rootStore.Notification.setLocalLoading(LoadingEnum.success)		}	}	async updateClientPhoto(photo: string): Promise<boolean | void> {		this.rootStore.Notification.setLocalLoading(LoadingEnum.fetching)		try {			await this.rootStore.AuthStore.updateClientPhoto(photo)			await this.rootStore.AuthStore.getSettingsClient()			return true		} catch (e) {			this.rootStore.Notification.setServerResponse({serverResponse: e?.message})			return false		} finally {			this.rootStore.Notification.setLocalLoading(LoadingEnum.success)		}	}	async checkToken(): Promise<boolean | void> {		try {			const token = await deviceStorage.getItem('token')			return true		} catch (e) {			return false		} finally {		}	}	async logout(): Promise<boolean | void> {		this.rootStore.Notification.setLocalLoading(LoadingEnum.fetching)		try {			await this.rootStore.AuthStore.logout()			await deviceStorage.removeItem('token')			await deviceStorage.removeItem('clients_id')			this.rootStore.AuthStore.clearStore()			await deviceStorage.removeItem('tokenDate')			this.rootStore.OrdersStore.clearStore()			this.rootStore.AuthStore.setAuth(false)			return true		} catch (e) {			this.rootStore.Notification.setServerResponse({serverResponse: e?.message})			return false		} finally {			this.rootStore.Notification.setLocalLoading(LoadingEnum.success)		}	}	async forgotAboutDevice(): Promise<boolean | void> {		this.rootStore.Notification.setLocalLoading(LoadingEnum.fetching)		try {			await this.rootStore.AuthStore.forgotAboutDevice()			await deviceStorage.removeItem('token')			await deviceStorage.removeItem('clients_id')			this.rootStore.AuthStore.clearStore()			this.rootStore.OrdersStore.clearStore()			this.rootStore.AuthStore.setAuth(false)			return true		} catch (e) {			this.rootStore.Notification.setServerResponse({serverResponse: e?.message})			return false		} finally {			this.rootStore.Notification.setLocalLoading(LoadingEnum.success)		}	}	async processingNotificationResponse(notification: NotificationResponse | null): Promise<boolean | void> {		try {			if (notification?.order_id) {				const data = await this.rootStore.OrdersStore.getOrderReportDetail(String(notification?.order_id))				data &&  processingNavigationOrderStatus(this.rootStore.NavigationStore.navigation, data)			}			if (notification?.need_to_reading_report === "1") {				await authApi.sendPushReport(notification.push_id)			}			if (notification?.type === 'message') {				const data = await this.rootStore.ChatStoreService.getDialog(true)				data && this.rootStore.NavigationStore.navigation.navigate(routerConstants.CHAT_SUPPORT)			}			this.rootStore.NavigationStore.setNotification(notification)		} catch (e) {			this.rootStore.Notification.setServerResponse({serverResponse: e?.message})			return false		} finally {		}	}	async authWithGoogle(payload: AuthGooglePayload): Promise<boolean | void> {//		this.rootStore.Notification.setLocalLoading(LoadingEnum.fetching)		try {			const data = await this.rootStore.AuthStore.authWithGoogle(payload)			return data?.token		} catch (e) {			this.rootStore.Notification.setServerResponse({serverResponse: e?.message})			return false		} finally {		}	}	async getGlobalSetting(): Promise<void> {		this.rootStore.Notification.setLocalLoading(LoadingEnum.fetching)		try {			const isFirstEnter = await deviceStorage.getItem('onboarding')			if (isFirstEnter === 'true') return			await this.rootStore.AuthStore.getGlobalSetting()		} catch (e) {			console.log(e)		} finally {			this.rootStore.Notification.setLocalLoading(LoadingEnum.success)		}	}}export default AuthStoreService