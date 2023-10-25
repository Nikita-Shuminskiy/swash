import RootStore from '../../RootStore'
import {LoadingEnum} from '../../types/types'
import {routerConstants} from '../../../constants/routerConstants'
import {LastStep, payloadUpdOrderType, StatusOrder} from '../../../api/Client/type'
import {ReviewOrderPayload, StartOrderPayload} from '../../../api/Client/clientApi'
import {deviceStorage} from '../../../utils/storage/storage'
import {checkToken} from "../../../utils/commonUtils";
import {createAlert} from "../../../components/CreateAlert";


export class OrdersStoreService {
    rootStore: typeof RootStore

    constructor(rootStore: typeof RootStore) {
        this.rootStore = rootStore
    }

    async checkOrdersEditable(navigate) {
        this.rootStore.Notification.setLocalLoading(LoadingEnum.fetching)
        try {
            const data = await this.rootStore.AuthStore.getSettingsClient()
            const orderEditable = data.orders.find(order => order.status.trim() === StatusOrder.EDITABLE)
            if (orderEditable) {
                await this.rootStore.OrdersStore.getOrderReportDetail(orderEditable.id)
            } else {
                const idOrder = await this.rootStore.OrdersStore.createOrderClient({
                    hypo: 0,
                    iron: 0,
                })
                await this.rootStore.OrdersStore.getOrderReportDetail(idOrder)
            }
            navigate && navigate(routerConstants.CREATE_ORDER)
        } catch (e) {

        } finally {
            this.rootStore.Notification.setLocalLoading(LoadingEnum.success)
        }
    }

    async getSettingClient(navigate: (route: string) => void, isLoading = false) {
        isLoading && this.rootStore.Notification.setIsLoading(LoadingEnum.fetching)
        try {
            const checkValidToken = await checkToken()
            if (!checkValidToken) return 'not_token'

            const data = await this.rootStore.AuthStore.getSettingsClient()
            await this.rootStore.DictionaryStore.getDictionaryLocal(data?.client?.language)

            if (!data?.client.phone_verify_datetime) return navigate && navigate(routerConstants.PHONE_VERIFY)
            if (!data?.client.consent_datetime) return navigate && navigate(routerConstants.TERMS_OF_USE)

            this.rootStore.AuthStore.setAuth(true)
            await this.rootStore.AuthStore.getLogisticPoints()
            if (!data?.orders.length) {
                const idOrder = await this.rootStore.OrdersStore.createOrderClient({
                    hypo: 0,
                    iron: 0,
                })
                await this.rootStore.OrdersStore.getOrderReportDetail(idOrder)
                navigate && navigate(routerConstants.CREATE_ORDER)
                return
            }
            if (data?.orders.length === 1) {
                if (data?.orders[0].status === StatusOrder.EDITABLE) {
                    await this.rootStore.OrdersStore.getOrderReportDetail(data.orders[0].id)
                }
                navigate && navigate(routerConstants.CREATE_ORDER)
                return
            }
            if (data?.orders.length > 1) {
                const checkInDoneOrder = data.orders.filter(order => order.status.trim() === StatusOrder.IN_PROCESS)

                if (data?.orders.length > checkInDoneOrder.length) { // есть ли в массиве заказ с editable
                    const orderEditable = data.orders.find(order => order.status.trim() === StatusOrder.EDITABLE)

                    if (orderEditable) {
                        await this.rootStore.OrdersStore.getOrderReportDetail(orderEditable.id)
                        navigate && navigate(routerConstants.CREATE_ORDER)
                        return
                    } else {
                        this.rootStore.OrdersStore.setOrders(data.orders)
                        navigate && navigate(routerConstants.ORDERS)
                    }
                } else {
                    this.rootStore.OrdersStore.setOrders(data.orders)
                    navigate && navigate(routerConstants.ORDERS)
                }
            }
        } catch (e) {
            console.log(e)
            this.rootStore.Notification.setNotification({serverResponse: e?.message})
        } finally {
            isLoading && setTimeout(() => {
                this.rootStore.Notification.setIsLoading(LoadingEnum.success)
            }, 3000)
        }
    }

    async deleteOrder(comment: string, orders_id: string, navigate) {
        this.rootStore.Notification.setLocalLoading(LoadingEnum.fetching)
        try {
            await this.rootStore.OrdersStore.deleteOrder(comment, orders_id)
            await this.rootStore.OrdersStoreService.getSettingClient(navigate)
        } catch (e) {
            this.rootStore.Notification.setNotification({serverResponse: e?.message})
        } finally {
            this.rootStore.Notification.setLocalLoading(LoadingEnum.success)
        }
    }

    async getOrderReportClient() {
       // this.rootStore.Notification.setLocalLoading(LoadingEnum.fetching)
        try {
            await this.rootStore.OrdersStore.getOrderReportClient()
        } catch (e) {
            this.rootStore.Notification.setNotification({serverResponse: e?.message})
        } finally {
           // this.rootStore.Notification.setLocalLoading(LoadingEnum.success)
        }
    }

    async startOrder() {
        this.rootStore.Notification.setLocalLoading(LoadingEnum.fetching)
        try {
            await this.rootStore.OrdersStore.startOrder()
            return true
        } catch (e) {
            this.rootStore.Notification.setNotification({serverResponse: e?.message})
        } finally {
            this.rootStore.Notification.setLocalLoading(LoadingEnum.success)
        }
    }

    async reviewOrder(payload: Omit<ReviewOrderPayload, 'orders_id'>) {
        this.rootStore.Notification.setLocalLoading(LoadingEnum.fetching)
        try {
            await this.rootStore.OrdersStore.reviewOrder(payload)
            const data = await this.rootStore.AuthStore.getSettingsClient()
            this.rootStore.OrdersStore.setOrders(data.orders)
            return true
        } catch (e) {
            this.rootStore.Notification.setNotification({serverResponse: e?.message})
        } finally {
            this.rootStore.Notification.setLocalLoading(LoadingEnum.success)
        }
    }

    async deleteOrderPhoto(photo_id: string) {
        try {
            await this.rootStore.OrdersStore.deleteOrderPhoto(photo_id)
            await this.rootStore.OrdersStore.getOrderReportDetail(this.rootStore.OrdersStore.orderDetail.orders_id)
        } catch (e) {
            this.rootStore.Notification.setNotification({serverResponse: e?.message})
        } finally {

        }
    }

    async saveOrderPhoto(photo) {
        try {
            const data = await this.rootStore.OrdersStore.saveOrderPhoto(photo)

            await this.rootStore.OrdersStore.getOrderReportDetail(this.rootStore.OrdersStore.orderDetail.orders_id)
        } catch (e) {
            this.rootStore.Notification.setNotification({serverResponse: e?.message})
        } finally {

        }
    }

    async getOrderReportDetail(orders_id: string) {
        try {
            await this.rootStore.OrdersStore.getOrderReportDetail(orders_id)
        } catch (e) {
            this.rootStore.Notification.setNotification({serverResponse: e?.message})
        } finally {

        }
    }

    async updateOrder(payload: payloadUpdOrderType) {
        this.rootStore.Notification.setLocalLoading(LoadingEnum.fetching)
        try {
            await this.rootStore.OrdersStore.updateOrder(payload)
            await this.rootStore.OrdersStore.getOrderReportDetail(this.rootStore.OrdersStore.orderDetail.orders_id)
        } catch (e) {
            this.rootStore.Notification.setNotification({serverResponse: e?.message})
        } finally {
            this.rootStore.Notification.setLocalLoading(LoadingEnum.success)
        }
    }

    async getClosedOrders() {
        this.rootStore.Notification.setLocalLoading(LoadingEnum.fetching)
        try {
            const data = await this.rootStore.AuthStore.getSettingsClient()
            const closedOrders = data.orders.filter((order) => order.last_step === LastStep.admin_closed_order)
            await this.rootStore.OrdersStore.setClosedOrder(closedOrders)
            return true
        } catch (e) {
            this.rootStore.Notification.setNotification({serverResponse: e?.message})
        } finally {
            this.rootStore.Notification.setLocalLoading(LoadingEnum.success)
        }
    }


}

export default OrdersStoreService
