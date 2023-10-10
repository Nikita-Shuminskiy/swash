import { instance } from '../config'
import {
	ClientRegisterPayloadType,
	CreateOrderClientPrevType,
	DataSettingClientType,
	DeleteOrderPayload,
	LogisticsPointType, payloadUpdOrderType,
} from './type'
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator'
import {DictionaryType} from "../../store/DictionaryStore/dictionary-store";


export const clientApi = {
	async getLogisticPoints(payload: { country: string }) {
		return await instance.get<ResponseLogisticsPoints>(`washapi.php/get_logistics_points`, { params: payload })
	},

	async getDictionary(payload: { language: string }) {
		return await instance.get<DictionaryType>(`washapi.php/get_dictionary`, { params: payload })
	},
	async getSettingsClient() {
		return await instance.get<DataSettingClientType>(`washapi.php/get_settings_client`)
	},
	async sendClientRegister(payload: ClientRegisterPayloadType) {
		return await instance.post(`washapi.php/client_register`, {}, {
			params: payload,
		})
	},
	async updateClientPhoto(photo: string) {
		const resizedImage = await manipulateAsync(
			photo,
			[{ resize: { width: 720, height: 1280 } }],
			{ format: 'jpeg' as SaveFormat, compress: 0.5 },
		)
		const formData = new FormData()
		// @ts-ignore
		formData.append('photo', { uri: resizedImage.uri,
			name: 'image.jpg',
			type: 'image/jpeg',
		})
		return await instance.post(`washapi.php/client_register`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	},
	async saveOrderPhoto(payload: { orders_id: string, photo: string }) {
		const { orders_id, photo } = payload
		const resizedImage = await manipulateAsync(
			photo, [{ resize: {  width: 720, height: 1280 } }],
			{ format: 'jpeg' as SaveFormat, compress: 0.5 },
		)
		const formData = new FormData()

		// @ts-ignore
		formData.append('photo', { uri: resizedImage.uri,
			name: 'image.jpg', type: 'image/jpeg',
		})

		return await instance.post(`washapi.php/order_client_photo`, formData, {
			params: {
				orders_id,
			},
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	},
	async getOrderReportClient(payload: { date_finish?: string, date_start?: string }) {
		return await instance.get(`washapi.php/order_report_client`, { params: payload })
	},
	async getClientPushMessages(payload: { clients_id: string, token: string }) {
		return await instance.get(`washapi.php/get_client_push_messages`, { params: payload })
	},
	async clientRegister(payload: { phone: string, language: string, country: string }) {
		return await instance.post(`washapi.php/client_register`, payload)
	},

	//order
	async deleteOrderPhoto(payload: { photo_id: string, order_number: string }) {
		return await instance.post(`washapi.php/order_client_photo_delete`, payload)
	},
	async createOrderClientPrev(payload: CreateOrderClientPrevType) {
		return await instance.post(`washapi.php/order_client_prev`, payload)
	},
	async deleteOrder(payload: DeleteOrderPayload) {
		return await instance.post(`washapi.php/order_client_delete`, {}, { params: payload })
	},
	async getOrderReportDetail(payload: { orders_id: string }) {
		return await instance.get(`washapi.php/order_report_client_detail`, { params: payload })
	},

	async startOrder(payload: StartOrderPayload) {
		return await instance.post(`washapi.php/order_client_start`, payload)
	},
	async updOrder(payload: payloadUpdOrderType) {
		return await instance.post(`washapi.php/order_client_register`, payload)
	},
	async reviewOrder(payload: ReviewOrderPayload) {
		return await instance.post(`washapi.php/order_client_review`, {}, { params: payload })
	},
}
type ResponseLogisticsPoints = {
	status: string;
	points: LogisticsPointType[];
};
export type ReviewOrderPayload = {
	orders_id: string
	points: string
	comment: string
}

export type StartOrderPayload = {
	orders_id: string
	client_logistic_parents_points_id: string
	services: {
		hypo: number
		iron: number
	}
}
