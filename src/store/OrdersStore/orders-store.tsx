import { action, makeObservable, observable } from 'mobx'
import { deviceStorage } from '../../utils/storage/storage'
import { clientApi } from '../../api/Client/clientApi'
import { CreateServicesDataType, OrderReportDetailType, OrderType, payloadUpdOrderType } from '../../api/Client/type'

export class OrdersStore {
	orderDetail: OrderReportDetailType = {} as OrderReportDetailType
	orders: OrderType[] = [] as OrderType[]

	setOrderDetail(order: OrderReportDetailType) {
		this.orderDetail = order
	}

	setOrders(orders: OrderType[]) {
		this.orders = orders
	}

	async createOrderClient(payload: CreateServicesDataType) {
		const token = await deviceStorage.getItem('token')
		const clients_id = await deviceStorage.getItem('clients_id')
		const { data } = await clientApi.createOrderClientPrev({
			services: { ...payload },
			clients_id: clients_id,
			token: token,
		})

		return data.order_id
	}

	async deleteOrder(comment: string, orders_id: string) {
		const token = await deviceStorage.getItem('token')
		const clients_id = await deviceStorage.getItem('clients_id')
		await clientApi.deleteOrder({
			orders_id,
			comment,
			clients_id: clients_id,
			token: token,
		})
	}

	async getOrderReportDetail(orders_id: string): Promise<OrderReportDetailType> {
		const token = await deviceStorage.getItem('token')
		const clients_id = await deviceStorage.getItem('clients_id')
		const { data } = await clientApi.getOrderReportDetail({
			token,
			clients_id,
			orders_id,
		})
		this.setOrderDetail(data)
		return data
	}

	async saveOrderPhoto(photo) {
		const token = await deviceStorage.getItem('token')
		const clients_id = await deviceStorage.getItem('clients_id')
		await clientApi.saveOrderPhoto({
			orders_id: this.orderDetail?.orders_id,
			clients_id,
			token,
			photo,
		})
	}

	async updateOrder(payload: payloadUpdOrderType) {
		const token = await deviceStorage.getItem('token')
		const clients_id = await deviceStorage.getItem('clients_id')
		const data = await clientApi.updOrder({
			...payload,
			token,
			clients_id,
		})

	}

	async deleteOrderPhoto(photo_id) {
		const token = await deviceStorage.getItem('token')
		const clients_id = await deviceStorage.getItem('clients_id')
		await clientApi.deleteOrderPhoto({
			token,
			clients_id,
			photo_id,
			order_number: this.orderDetail.orders_id,
		})
	}

	constructor() {
		makeObservable(this, {
			orderDetail: observable,
			orders: observable,
			createOrderClient: action,
			setOrderDetail: action,
			saveOrderPhoto: action,
			updateOrder: action,
			deleteOrderPhoto: action,
			setOrders: action,
			deleteOrder: action,
			getOrderReportDetail: action,
		})

		this.createOrderClient = this.createOrderClient.bind(this)
		this.updateOrder = this.updateOrder.bind(this)
		this.saveOrderPhoto = this.saveOrderPhoto.bind(this)
		this.getOrderReportDetail = this.getOrderReportDetail.bind(this)
		this.setOrderDetail = this.setOrderDetail.bind(this)
		this.deleteOrder = this.deleteOrder.bind(this)
		this.setOrders = this.setOrders.bind(this)
		this.deleteOrderPhoto = this.deleteOrderPhoto.bind(this)
	}
}

export default new OrdersStore()
