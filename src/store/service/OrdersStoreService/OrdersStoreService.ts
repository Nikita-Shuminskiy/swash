import RootStore from '../../RootStore'
import { LoadingEnum } from '../../types/types'
import { routerConstants } from '../../../constants/routerConstants'
import { payloadUpdOrderType } from '../../../api/Client/clientApi'


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
					this.rootStore.OrdersStore.setOrder(data.orders[0])
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
	async deleteOrderPhoto(photo_id: string) {
		try {
			await this.rootStore.OrdersStore.deleteOrderPhoto(photo_id)
			await this.rootStore.OrdersStore.getOrderReportDetail(this.rootStore.OrdersStore.orderDetail.id)
		} catch (e) {
			console.log(e)
		} finally {

		}
	}
	async saveOrderPhoto(photo) {
		try {
			await this.rootStore.OrdersStore.saveOrderPhoto(photo)
			await this.rootStore.OrdersStore.getOrderReportDetail(this.rootStore.OrdersStore.orderDetail.id)
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

	async updateOrder(payload: payloadUpdOrderType) {
		try {
			await this.rootStore.OrdersStore.updateOrder(payload)
			await this.rootStore.OrdersStore.getOrderReportDetail(this.rootStore.OrdersStore.orderDetail.id)
		} catch (e) {
			console.log(e)
		} finally {

		}
	}
}

export default OrdersStoreService
