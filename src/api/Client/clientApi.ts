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
	async createOrderClientPrev(payload: CreateOrderClientPrevType) {
		return await instance.post(`washapi.php/order_client_prev`, payload)
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
}

export type CreateOrderClientPrevType = {
	"clients_id": string,
	"token": string,
	"services": CreateServicesDataType
}
export type CreateServicesDataType = {
	"hypo": number,
	"iron": number
}
