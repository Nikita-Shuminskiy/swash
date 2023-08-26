import { instance } from '../config'
import { DataSettingClientType } from './type'


export const clientApi = {
	async getLogisticPoints(payload: { country: string }) {
		return await instance.get(`washapi.php/get_logistics_points`, { params: payload })
	},
	async getDictionary(payload: { language: string }) {
		return await instance.get(`washapi.php/get_dictionary`, { params: payload })
	},
	async getSettingsClient(payload: { clients_id: string, token: string }) {
		return await instance.get<DataSettingClientType>(`washapi.php/get_settings_client`, { params: payload })
	},
	async sendClientRegister(payload: ClientRegisterType) {
		return await instance.post(`washapi.php/client_register`, {}, {
			params: payload,
		})
	},
	async getOrderReportClient(payload: { clients_id: string, token: string, date_finish?: string, date_start?: string }) {
		return await instance.get(`washapi.php/order_report_client`, { params: payload })
	},
	async getClientPushMessages(payload: { clients_id: string, token: string }) {
		return await instance.get(`washapi.php/get_client_push_messages`, { params: payload })
	},
	async clientRegister(payload: { clients_id: string, token: string, phone: string, language: string, country: string }) {
		return await instance.post(`washapi.php/client_register`, payload)
	},


	//order
	async deleteOrderPhoto(payload: { clients_id: string, token: string, photo_id: string }) {
		return await instance.post(`washapi.php/order_client_delete`, {}, {
			params: payload,
		})
	},
	async createOrderClientPrev(payload: CreateOrderClientPrevType) {
		return await instance.post(`washapi.php/order_client_prev`, payload)
	},
	async deleteOrder(payload: DeleteOrderPayload) {
		return await instance.post(`washapi.php/order_client_delete`, {}, { params: payload })
	},
	async getOrderReportDetail(payload: { clients_id: string, token: string, orders_id: string }) {
		return await instance.get(`washapi.php/order_report_client_detail`, { params: payload })
	},
	async saveOrderPhoto(payload: { clients_id: string, token: string, orders_id: string, photo: any }) {
		console.log(payload)
		return await instance.post(`washapi.php/order_client_photo`, {}, {
			params: payload,
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	},
}
export type DeleteOrderPayload = {
	orders_id: string
	clients_id: string,
	token: string,
	comment: string
}
export type ClientRegisterType = {
	clients_id: string,
	token: string,
	phone?: string,
	country?: string,
	language?: string,
	consent_datetime?: string
}

export type CreateOrderClientPrevType = {
	'clients_id': string,
	'token': string,
	'services': CreateServicesDataType
}
export type CreateServicesDataType = {
	'hypo': number,
	'iron': number
}
