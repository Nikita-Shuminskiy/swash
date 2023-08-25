import { action, makeObservable } from 'mobx'
import { deviceStorage } from '../../utils/storage/storage'
import { clientApi, CreateOrderClientPrevType, CreateServicesDataType } from '../../api/Client/clientApi'
import { country, language } from '../../utils/commonUtils'

export class OrdersStore {

	async getBaseInfoClient() {
		const token = await deviceStorage.getItem('token')
		const clients_id = await deviceStorage.getItem('clients_id')
		const payload = {
			clients_id: clients_id,
			token: token,
		}
		/*		const dataGetOrderReportClient =  await clientApi.getOrderReportClient({ ...payload }) // ok
				const {data: dataPushMessages} = await clientApi.getClientPushMessages(payload) // не коректный метод
				console.log(dataPushMessages)*/
		/*	const { data: dataDictionary } = await clientApi.getDictionary({ language }) // basik auth failed
				console.log(dataDictionary)
				const { data: dataLogistic } = await clientApi.getLogisticPoints({ country }) //Basic authorization faul
				console.log(dataLogistic)*/

		const { data: dataSetting } = await clientApi.getSettingsClient(payload)
		return dataSetting

	}

	async createOrderClient(payload: CreateServicesDataType) {
		const token = await deviceStorage.getItem('token')
		const clients_id = await deviceStorage.getItem('clients_id')

		const { data } = await clientApi.createOrderClientPrev({
			services: { ...payload },
			clients_id: clients_id,
			token: token,
		})
		console.log(data)
		return data
	}

	constructor() {
		makeObservable(this, {
			getBaseInfoClient: action,
			createOrderClient: action,
		})
		this.getBaseInfoClient = this.getBaseInfoClient.bind(this)
		this.createOrderClient = this.createOrderClient.bind(this)
	}
}

export default new OrdersStore()
