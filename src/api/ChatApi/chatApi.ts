import { instance } from '../config'
import { SendMessagePayloadType } from './type'
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator'


export const chatApi = {
	async getDialog() {
		return await instance.get(`washapi.php/clients_dialogs`)
	},
	async messageRead(message_id: string) {
		return await instance.post(`washapi.php/client_message_read`, {}, { params: { message_id } })
	},
	async getPushMessages() {
		return await instance.get(`washapi.php/get_client_push_messages`)
	},
	async sendMessage(payload: SendMessagePayloadType) {
		const resizedImage = await manipulateAsync(
			payload.photo,
			[{ resize: { width: 800, height: 800 } }],
			{ format: 'jpeg' as SaveFormat, compress: 0.8 },
		)
		const formData = new FormData()
		// @ts-ignore
		formData.append('photo', { uri: resizedImage.uri,
			name: 'image.jpg',
			type: 'image/jpeg',
		})
		return await instance.post(`washapi.php/client_new_message`, formData, {
			params: {
				orders_id: payload.orders_id,
			},
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	},
}
