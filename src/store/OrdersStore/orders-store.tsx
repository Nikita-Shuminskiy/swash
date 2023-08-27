import { action, makeObservable, observable } from 'mobx'
import { deviceStorage } from '../../utils/storage/storage'
import { clientApi, CreateServicesDataType, payloadUpdOrderType } from '../../api/Client/clientApi'
import { OrderReportDetailType, OrderType } from '../../api/Client/type'

export class OrdersStore {
	orderDetail: OrderReportDetailType = {} as OrderReportDetailType
	orders: OrderType[] = [] as OrderType[]
	order: OrderType = {} as OrderType
	newOrderId: number = 0

	setOrderDetail(order: OrderReportDetailType) {
		this.orderDetail = order
	}
	setOrders(orders: OrderType[]) {
		this.orders = orders
	}

	setOrder(order: OrderType) {
		this.order = order
	}

	setNewOrderId(orderId: number) {
		this.newOrderId = orderId
	}

	async createOrderClient(payload: CreateServicesDataType) {
		const token = await deviceStorage.getItem('token')
		const clients_id = await deviceStorage.getItem('clients_id')

		const { data } = await clientApi.createOrderClientPrev({
			services: { ...payload },
			clients_id: clients_id,
			token: token,
		})
		this.setNewOrderId(data?.order_id)
		return data
	}

	async deleteOrder(comment: string, orders_id: string) {
		const token = await deviceStorage.getItem('token')
		const clients_id = await deviceStorage.getItem('clients_id')
		const { data } = await clientApi.deleteOrder({
			orders_id,
			comment,
			clients_id: clients_id,
			token: token,
		})
	}

	async getOrderReportDetail(orders_id: string) {
		const token = await deviceStorage.getItem('token')
		const clients_id = await deviceStorage.getItem('clients_id')
		const { data } = await clientApi.getOrderReportDetail({
			token,
			clients_id,
			orders_id,
		})
		this.setOrderDetail(data)
	}

	async saveOrderPhoto(photo) {
		try {
			const token = await deviceStorage.getItem('token')
			const clients_id = await deviceStorage.getItem('clients_id')
			const { data } = await clientApi.saveOrderPhoto({
				orders_id: this.orderDetail?.id,
				clients_id,
				token,
				photo,
			})
			console.log(data)
		} catch (e) {
			console.log(e)
		}
	}

	async updateOrder(payload: payloadUpdOrderType) {
		const token = await deviceStorage.getItem('token')
		const clients_id = await deviceStorage.getItem('clients_id')
	  const data = await clientApi.updOrder({
			...payload,
			token,
			clients_id
		})
		console.log(data.data)
	}

	async deleteOrderPhoto(photo_id) {
		const token = await deviceStorage.getItem('token')
		const clients_id = await deviceStorage.getItem('clients_id')
		const { data } = await clientApi.deleteOrderPhoto({
			token,
			clients_id,
			photo_id,
			order_number: this.orderDetail.id
		})
		console.log(data)
	}

	constructor() {
		makeObservable(this, {
			orderDetail: observable,
			orders: observable,
			order: observable,
			newOrderId: observable,
			createOrderClient: action,
			setOrderDetail: action,
			saveOrderPhoto: action,
			setNewOrderId: action,
			updateOrder: action,
			deleteOrderPhoto: action,
			setOrder: action,
			setOrders: action,
			deleteOrder: action,
			getOrderReportDetail: action,
		})

		this.createOrderClient = this.createOrderClient.bind(this)
		this.updateOrder = this.updateOrder.bind(this)
		this.setOrder = this.setOrder.bind(this)
		this.saveOrderPhoto = this.saveOrderPhoto.bind(this)
		this.getOrderReportDetail = this.getOrderReportDetail.bind(this)
		this.setOrderDetail = this.setOrderDetail.bind(this)
		this.deleteOrder = this.deleteOrder.bind(this)
		this.setOrders = this.setOrders.bind(this)
		this.setNewOrderId = this.setNewOrderId.bind(this)
		this.deleteOrderPhoto = this.deleteOrderPhoto.bind(this)
	}
}

export default new OrdersStore()
