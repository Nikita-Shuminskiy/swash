import { instance } from './config'

export const authApi = {
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

}
