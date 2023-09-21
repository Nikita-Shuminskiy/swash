import { instance } from '../config'
import { ResponseDialogType, SendMessagePayloadType } from './type'
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator'


const convertToFormDataImg = async (img) => {
	const resizedImage = await manipulateAsync(
		img,
		[{ resize: { width: 1000, height: 1000 } }],
		{ format: 'jpeg' as SaveFormat, compress: 0.8 },
	)
	const formData = new FormData()
	// @ts-ignore
	formData.append('photo', { uri: resizedImage.uri,
		name: 'image.jpg',
		type: 'image/jpeg',
	})
	return formData
}
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

		if (payload.photo) {
			const formData = await convertToFormDataImg(payload.photo)
			return await instance.post(`washapi.php/client_new_message`, formData, {
				params: {
					orders_id: payload.orders_id,
					text: payload.text,
				},
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
		}
		return await instance.post(`washapi.php/client_new_message`, {}, {
			params: {
				orders_id: payload.orders_id,
				text: payload.text,
			},
		})
	},
}
