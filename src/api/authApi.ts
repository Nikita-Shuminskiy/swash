import { instance } from './config'

export const authApi = {
	async getLogisticPoints(payload: { country: string }) {
		return await instance.get(`washapi.php/get_logistics_points`, { params: payload })
	},
	async getDictionary(payload: { language: string }) {
		return await instance.get(`washapi.php/get_dictionary`, { params: payload })
	},
	async getSettingsClient(payload: { clients_id: string, token: string }) {
		return await instance.get(`washapi.php/get_settings_client`, { params: payload })
	},
	async getOrderReportClient(payload: { clients_id: string, token: string, date_finish?: string, date_start?: string }) {
		return await instance.get(`washapi.php/order_report_client`, { params: payload })
	},
	async getClientPushMessages(payload: { clients_id: string, token: string }) {
		return await instance.get(`washapi.php/get_client_push_messages`, { params: payload })
	},
	async sendClientCodeVerify(payload: { clients_id: string, token: string, phone_verify_code: string }) {
		return await instance.post(`washapi.php/client_code_verify`, null, {
			params: payload,
		})
	},
	async sendClientCode(payload: { clients_id: string, token: string, phone: string }) {
		return await instance.post(`washapi.php/client_code_send`, {}, {
			params: payload
		})
	},
	async clientRegister(payload: { clients_id: string, token: string, phone: string, language: string, country: string }) {
		return await instance.post(`washapi.php/client_register`, payload)
	},
}
