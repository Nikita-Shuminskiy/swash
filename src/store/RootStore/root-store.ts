import NotificationStore from '../NotificationStore/notification-store'import { makeAutoObservable } from 'mobx'import AuthStore from '../AuthStore/auth-store'import AuthStoreService from '../service/AuthStoreService/auth-store-service'import OrdersStoreService from '../service/OrdersStoreService/OrdersStoreService'import OrdersStore from '../OrdersStore'export class RootStore {	// init service	AuthStoreService: AuthStoreService = null as unknown as AuthStoreService	OrdersStoreService: OrdersStoreService = null as unknown as OrdersStoreService	//init store	AuthStore: typeof AuthStore = null as unknown as typeof AuthStore	OrdersStore: typeof OrdersStore = null as unknown as typeof OrdersStore	Notification: typeof NotificationStore = null as unknown as typeof NotificationStore	constructor() {		makeAutoObservable(this)		this.AuthStoreService = new AuthStoreService(this as any)		this.OrdersStoreService = new OrdersStoreService(this as any)		this.AuthStore = AuthStore		this.OrdersStore = OrdersStore		this.Notification = NotificationStore	}}export default new RootStore()