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
	async authWithGoogle(id_device: string) {
		const params: AuthGooglePayload = {
			country: 'PL',
			language: 'PL',
			status: 'client',
			id_device
		}
		return await instance.post(`washapi.php/auth_client_by_google`, {}, {params})
	},

	async sendDeviceToken(token) {
		return await instance.post(`washapi.php/client_fcm_token`, {fcm_token: token})
	},
} //'http://stirka.webd.pro/washapi.php/auth_client_by_google?status=client&country=PL&language=PL',
export type AuthGooglePayload = {
	status?: string
	language?: string
	id_device: string
	country?: string
}
