import { instance } from '../config'
import { ResponseDialogType, SendMessagePayloadType } from './type'
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator'


export const chatApi = {
	async getDialog() {
		return await instance.get<ResponseDialogType>(`washapi.php/clients_dialogs`)
	},
	async messageRead(message_id: string) {
		return await instance.post(`washapi.php/client_message_read`, {}, { params: { message_id } })
	},
	async getPushMessages() {
		return await instance.get(`washapi.php/get_client_push_messages`)
	},
	async sendMessage(payload: SendMessagePayloadType) {
		const formData = new FormData()
		// @ts-ignore
		formData.append('photo', { uri: payload.photo,
			name: 'image.jpg',
			type: 'image/jpeg',
		})
		return await instance.post(`washapi.php/client_new_message`, payload.photo ? formData : {}, {
			params: {
				orders_id: payload.orders_id,
				text: payload.text
			},
			headers: payload.photo ? {
				'Content-Type': 'multipart/form-data',
			} : {},
		})
	},
}
