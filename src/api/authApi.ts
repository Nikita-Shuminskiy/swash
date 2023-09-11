import { instance } from './config'

export const authApi = {
	async sendClientCodeVerify(payload: { phone_verify_code: string }) {
		return await instance.post(`washapi.php/client_code_verify`, null, {
			params: payload,
		})
	},
	async sendClientCode(payload: { phone: string }) {
		return await instance.post(`washapi.php/client_code_send`, {}, {
			params: payload,
		})
	},
	async logout() {
		return await instance.post(`washapi.php/client_forget_about_device`)
	},
	async forgotAboutDevice() {
		return await instance.post(`washapi.php/client_forget_about_device`)
	},
}
