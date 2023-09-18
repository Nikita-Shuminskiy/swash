import RootStore from '../../RootStore'
import { LoadingEnum } from '../../types/types'
import { routerConstants } from '../../../constants/routerConstants'
import { LastStep, payloadUpdOrderType, StatusOrder } from '../../../api/Client/type'
import { ReviewOrderPayload, StartOrderPayload } from '../../../api/Client/clientApi'
import { deviceStorage } from '../../../utils/storage/storage'


export class OrdersStoreService {
	rootStore: typeof RootStore

	constructor(rootStore: typeof RootStore) {
		this.rootStore = rootStore
	}

	async checkOrdersEditable(navigate) {
		this.rootStore.Notification.setLocalLoading(LoadingEnum.fetching)
		try {
			const data = await this.rootStore.AuthStore.getSettingsClient()
			const orderEditable = data.orders.find(order => order.status.trim() === StatusOrder.EDITABLE)
			if (orderEditable) {
				await this.rootStore.OrdersStore.getOrderReportDetail(orderEditable.id)
			} else {
				const idOrder = await this.rootStore.OrdersStore.createOrderClient({
					hypo: 0,
					iron: 0,
				})
				await this.rootStore.OrdersStore.getOrderReportDetail(idOrder)
			}
			navigate && navigate(routerConstants.CREATE_ORDER)
		} catch (e) {

		} finally {
			this.rootStore.Notification.setLocalLoading(LoadingEnum.success)
		}
	}

	async getSettingClient(navigate) {
		this.rootStore.Notification.setIsLoading(LoadingEnum.fetching)
		try {
			const token = await deviceStorage.getItem('token')
			if (!token) return false

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
			if (data.orders.length > 1) {
				const checkInDoneOrder = data.orders.filter(order => order.status.trim() === StatusOrder.IN_PROCESS)

				if (data.orders.length > checkInDoneOrder.length) { // есть ли в массиве заказ с editable
					const orderEditable = data.orders.find(order => order.status.trim() === StatusOrder.EDITABLE)

					if (orderEditable) {
						await this.rootStore.OrdersStore.getOrderReportDetail(orderEditable.id)
						navigate && navigate(routerConstants.CREATE_ORDER)
						return
					} else {
						this.rootStore.OrdersStore.setOrders(data.orders)
						navigate && navigate(routerConstants.ORDERS)
					}
				} else {
					this.rootStore.OrdersStore.setOrders(data.orders)
					navigate && navigate(routerConstants.ORDERS)
				}
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

	async getOrderReportClient() {
		try {
			await this.rootStore.OrdersStoreService.getOrderReportClient()
		} catch (e) {
			console.log(e, 'getOrderReportClient')
		} finally {
		}
	}

	async startOrder() {
		this.rootStore.Notification.setLocalLoading(LoadingEnum.fetching)
		try {
			await this.rootStore.OrdersStore.startOrder()
			return true
		} catch (e) {
			console.log(e, 'startOrder')
		} finally {
			this.rootStore.Notification.setLocalLoading(LoadingEnum.success)
		}
	}

	async reviewOrder(payload: Omit<ReviewOrderPayload, 'orders_id'>) {
		this.rootStore.Notification.setLocalLoading(LoadingEnum.fetching)
		try {
			await this.rootStore.OrdersStore.reviewOrder(payload)
			const data = await this.rootStore.AuthStore.getSettingsClient()
			this.rootStore.OrdersStore.setOrders(data.orders)
			return true
		} catch (e) {
		} finally {
			this.rootStore.Notification.setLocalLoading(LoadingEnum.success)
		}
	}

	async deleteOrderPhoto(photo_id: string) {
		try {
			await this.rootStore.OrdersStore.deleteOrderPhoto(photo_id)
			await this.rootStore.OrdersStore.getOrderReportDetail(this.rootStore.OrdersStore.orderDetail.orders_id)
		} catch (e) {
			console.log(e, 'deleteOrderPhoto')
		} finally {

		}
	}

	async saveOrderPhoto(photo) {
		try {
			const data = await this.rootStore.OrdersStore.saveOrderPhoto(photo)

			await this.rootStore.OrdersStore.getOrderReportDetail(this.rootStore.OrdersStore.orderDetail.orders_id)
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
			await this.rootStore.OrdersStore.getOrderReportDetail(this.rootStore.OrdersStore.orderDetail.orders_id)
		} catch (e) {
			console.log(e)
		} finally {
			this.rootStore.Notification.setLocalLoading(LoadingEnum.success)
		}
	}

	async getClosedOrders() {
		this.rootStore.Notification.setLocalLoading(LoadingEnum.fetching)
		try {
			const data = await this.rootStore.AuthStore.getSettingsClient()
			const closedOrders = data.orders.filter((order) => order.last_step === LastStep.admin_closed_order)
			await this.rootStore.OrdersStore.setClosedOrder(closedOrders)
		} catch (e) {
			console.log(e)
		} finally {
			this.rootStore.Notification.setLocalLoading(LoadingEnum.success)
		}
	}
}

export default OrdersStoreService
