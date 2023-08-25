import RootStore from '../../RootStore'
import { LoadingEnum } from '../../types/types'
import { deviceStorage } from '../../../utils/storage/storage'


export class OrdersStoreService {
	rootStore: typeof RootStore

	constructor(rootStore: typeof RootStore) {
		this.rootStore = rootStore
	}

	async getClientBaseInfo() {
		this.rootStore.Notification.setIsLoading(LoadingEnum.fetching)
		try {
			const data = await this.rootStore.OrdersStore.getBaseInfoClient()
			if(!!data.client.phone_verify_datetime) {

			/*	if(!data.orders.length) {
					const payload = {
					hypo: 1,
					iron: 2
				}
					const createEmptyOrder = await this.rootStore.OrdersStore.createOrderClient(payload)
					console.log(createEmptyOrder)
				}*/
			}
		} catch (e) {
			console.log(e, 'getClientBaseInfo')
		} finally {
			this.rootStore.Notification.setIsLoading(LoadingEnum.success)
		}
	}
}

export default OrdersStoreService
