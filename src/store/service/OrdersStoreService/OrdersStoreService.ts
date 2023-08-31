import RootStore from '../../RootStore'
import { LoadingEnum } from '../../types/types'
import { routerConstants } from '../../../constants/routerConstants'
import { payloadUpdOrderType, StatusOrder } from '../../../api/Client/type'


export class OrdersStoreService {
	rootStore: typeof RootStore

	constructor(rootStore: typeof RootStore) {
		this.rootStore = rootStore
	}

	async getSettingClient(navigate) {
		this.rootStore.Notification.setIsLoading(LoadingEnum.fetching)
		try {
			const data = await this.rootStore.AuthStore.getSettingsClient()
			if (!data.client.phone_verify_datetime) return navigate && navigate(routerConstants.PHONE_VERIFY)
			if (!data.client.consent_datetime) return navigate && navigate(routerConstants.TERMS_OF_USE)

			this.rootStore.AuthStore.setAuth(true)
			await this.rootStore.AuthStore.getLogisticPoints()
			if (!data.orders.length) {
				const idOrder = await this.rootStore.OrdersStore.createOrderClient({
					hypo: 0,
					iron: 0,
				})
				await this.rootStore.OrdersStore.getOrderReportDetail(idOrder)
				navigate && navigate(routerConstants.CREATE_ORDER)
				return
			}
			if (data.orders.length === 1) {
				if (data.orders[0].status === StatusOrder.EDITABLE) {
					await this.rootStore.OrdersStore.getOrderReportDetail(data.orders[0].id)
				}
				navigate && navigate(routerConstants.CREATE_ORDER)
				return
			}
			console.log(data.orders.length)

			if (data.orders.length > 1) {
				const checkInDoneOrder = data.orders.filter(order => order.status === StatusOrder.IN_PROCESS)

				if (data.orders.length >= checkInDoneOrder.length) { // проверка есть ли в массиве заказ с editable
					const checkInEditOrder = data.orders.filter(order => order.status === StatusOrder.EDITABLE)

					if (checkInEditOrder.length === 1) { // если в orders все заказы in_process и есть один editable
						await this.rootStore.OrdersStore.getOrderReportDetail(checkInEditOrder[0].id)
						navigate && navigate(routerConstants.CREATE_ORDER)
						return
					}

					this.rootStore.OrdersStore.setOrders(data.orders)
					navigate && navigate(routerConstants.ORDERS)
				}

				//this.rootStore.OrdersStore.setOrder(data.orders[0])
				//this.rootStore.OrdersStore.setOrders(data.orders)
				// временно
			}


		} catch (e) {
			console.log(e, 'getSettingClient')
		} finally {
			this.rootStore.Notification.setIsLoading(LoadingEnum.success)
		}
	}

	async deleteOrder(comment: string, orders_id: string, navigate) {
		try {
			await this.rootStore.OrdersStore.deleteOrder(comment, orders_id)
			await this.rootStore.OrdersStoreService.getSettingClient(navigate)
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
			console.log(e, 'deleteOrderPhoto')
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
		this.rootStore.Notification.setLocalLoading(LoadingEnum.fetching)
		try {
			await this.rootStore.OrdersStore.updateOrder(payload)
			await this.rootStore.OrdersStore.getOrderReportDetail(this.rootStore.OrdersStore.orderDetail.id)
		} catch (e) {
			console.log(e)
		} finally {
			this.rootStore.Notification.setLocalLoading(LoadingEnum.success)
		}
	}
}

export default OrdersStoreService
