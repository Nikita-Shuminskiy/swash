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
	async authWithGoogle(payload: AuthGooglePayload) {
		return await instance.post(`washapi.php/auth_client_by_google_for_android`, {}, {params: payload})
	},

	async sendDeviceToken(token) {
		return await instance.post(`washapi.php/client_fcm_token`, {fcm_token: token})
	},
} //'http://stirka.webd.pro/washapi.php/auth_client_by_google?status=client&country=PL&language=PL',
export type AuthGooglePayload = {
	id_token: string
	server_auth_code: string
	language?: string
	country?: string
}
