import RootStore from '../../RootStore'
import { LoadingEnum } from '../../types/types'
import { deviceStorage } from '../../../utils/storage/storage'
import { routerConstants } from '../../../constants/routerConstants'


export class OrdersStoreService {
	rootStore: typeof RootStore

	constructor(rootStore: typeof RootStore) {
		this.rootStore = rootStore
	}

	async getClientBaseInfo(navigate) {
		this.rootStore.Notification.setIsLoading(LoadingEnum.fetching)
		try {
			const data = await this.rootStore.AuthStore.getSettingsClient()
			if (!!data.client.phone_verify_datetime && !!data.client.consent_datetime) {
				if (!data.orders.length) {
					 await this.rootStore.OrdersStore.createOrderClient({
						hypo: 0,
						iron: 0,
					})
				}
				if (data.orders.length) {
					this.rootStore.OrdersStore.setOrders(data.orders)
				}
				this.rootStore.AuthStore.setAuth(true)
				navigate && navigate(routerConstants.CREATE_ORDER)
			}
			if (!data.client.phone_verify_datetime) return navigate && navigate(routerConstants.PHONE_VERIFY)
			if (!data.client.consent_datetime) {
				return navigate && navigate(routerConstants.TERMS_OF_USE)
			}

		} catch (e) {
			console.log(e, 'getClientBaseInfo')
		} finally {
			this.rootStore.Notification.setIsLoading(LoadingEnum.success)
		}
	}

	async deleteOrder(comment: string, orders_id: string) {
		try {
			await this.rootStore.OrdersStore.deleteOrder(comment, orders_id)
		} catch (e) {
			console.log(e)
		} finally {

		}
	}
	async deleteOrderPhoto(orders_id: string, photo_id: string) {
		try {
			await this.rootStore.OrdersStore.deleteOrderPhoto(orders_id, photo_id)
		} catch (e) {
			console.log(e)
		} finally {

		}
	}
	async getOrderReportDetail(orders_id: string) {
		try {
			await this.rootStore.OrdersStore.getOrderReportDetail(orders_id)
		} catch (e) {
			console.log(e)
		} finally {

		}
	}
}

export default OrdersStoreService
