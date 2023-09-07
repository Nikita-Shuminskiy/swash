import { action, makeObservable, observable } from 'mobx'
import { deviceStorage } from '../../utils/storage/storage'
import { clientApi, ReviewOrderPayload } from '../../api/Client/clientApi'
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
		const { data } = await clientApi.createOrderClientPrev({
			services: { ...payload },
		})
		return data.order_id
	}

	async deleteOrder(comment: string, orders_id: string) {
		const { data } = await clientApi.deleteOrder({
			orders_id,
			comment,
		})
	}

	async getOrderReportDetail(orders_id: string): Promise<OrderReportDetailType> {


		const { data } = await clientApi.getOrderReportDetail({
			orders_id,
		})
		this.setOrderDetail(data)
		return data
	}

	async saveOrderPhoto(photo) {
		const { data } = await clientApi.saveOrderPhoto({
			orders_id: this.orderDetail?.orders_id,
			photo,
		})
	}

	async startOrder() {
		const { data } = await clientApi.startOrder({
			orders_id: this.orderDetail.orders_id,
			client_logistic_parents_points_id: this.orderDetail.client_logistic_partners_points_id,
			services: {
				iron: +this.orderDetail.add_iron,
				hypo: +this.orderDetail.add_hypo,
			},
		})
	}

	async updateOrder(payload: payloadUpdOrderType) {
		const data = await clientApi.updOrder({
			...payload,
		})
	}

	async reviewOrder(payload: Omit<ReviewOrderPayload, 'orders_id'>) {

		const data = await clientApi.reviewOrder({
			orders_id: this.orderDetail.orders_id,
			...payload,
		})
	}

	async deleteOrderPhoto(photo_id) {

		await clientApi.deleteOrderPhoto({

			photo_id,
			order_number: this.orderDetail.orders_id,
		})
	}

	async getOrderReportClient() {

		const { data } = await clientApi.getOrderReportClient({})
		this.setOrders(data)
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
			startOrder: action,
			reviewOrder: action,
			getOrderReportDetail: action,
			getOrderReportClient: action,
		})

		this.createOrderClient = this.createOrderClient.bind(this)
		this.updateOrder = this.updateOrder.bind(this)
		this.getOrderReportClient = this.getOrderReportClient.bind(this)
		this.reviewOrder = this.reviewOrder.bind(this)
		this.startOrder = this.startOrder.bind(this)
		this.saveOrderPhoto = this.saveOrderPhoto.bind(this)
		this.getOrderReportDetail = this.getOrderReportDetail.bind(this)
		this.setOrderDetail = this.setOrderDetail.bind(this)
		this.deleteOrder = this.deleteOrder.bind(this)
		this.setOrders = this.setOrders.bind(this)
		this.deleteOrderPhoto = this.deleteOrderPhoto.bind(this)
	}
}

export default new OrdersStore()
