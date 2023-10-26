import {LastStep} from "../../../api/Client/type";
import {routerConstants} from "../../../constants/routerConstants";
import {allowLocation, getCurrentPositionHandler} from "../../../components/MapViews/utils";

export const onPressOrderDetails = (navigation, order) => {
    switch (order.last_step?.trim()) {
        case LastStep.client_must_get: {
            getCurrentPositionHandler().then((data) => {
                if (data) {
                    return navigation.navigate(routerConstants.EXECUTOR_MAP, {from: 'get'})
                }
            })
            return
        }
        case LastStep.executor_perfomed: {
            getCurrentPositionHandler().then((data) => {
                if (data) {
                    return navigation.navigate(routerConstants.EXECUTOR_MAP, {from: 'takeIt'})
                }
            })
            return
        }
        case LastStep.client_received: {
            return navigation.navigate(routerConstants.CLIENT_RECEIVED)
        }
        case LastStep.auction_open: {
            return navigation.navigate(routerConstants.ORDER_CONFIRMATION, {from: 'action_open'})
        }
        case LastStep.executor_confirm_client_must_pay: {
            return navigation.navigate(routerConstants.CLIENT_PAY, {from: 'client_must_pay'})
        }
        case LastStep.executor_done_client_must_pay: {
            return navigation.navigate(routerConstants.CLIENT_PAY, {from: 'done_client_must_pay'})
        }
        case LastStep.client_sent: {
            return navigation.navigate(routerConstants.EXECUTOR_STATUSES, {from: '1'})
        }
        case LastStep.executor_must_get: {
            return navigation.navigate(routerConstants.EXECUTOR_STATUSES, {from: '1'})
        }

        case LastStep.executor_received: {
            return navigation.navigate(routerConstants.EXECUTOR_STATUSES, {from: '2'})
        }
        case LastStep.executor_confirm: {
            return navigation.navigate(routerConstants.EXECUTOR_STATUSES, {from: '3'})
        }
        case LastStep.executor_done: {
            return navigation.navigate(routerConstants.EXECUTOR_STATUSES, {from: '3'})
        }

        case LastStep.executor_sent: {
            return navigation.navigate(routerConstants.EXECUTOR_STATUSES, {from: '4'})
        }

    }
}