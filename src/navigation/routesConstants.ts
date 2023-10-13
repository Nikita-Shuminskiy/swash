import React from 'react';
import CreateOrder from '../screen/Main/CreateOrder/CreateOrder';
import OrdersS from '../screen/Main/Orders/OrdersS';
import AddNewCardS from '../screen/Main/AddNewCardS';
import OrderConfirmationS from '../screen/Main/OrderConfirmationS';
import PriceS from '../screen/Main/PriceS';
import LogisticsPointS from '../screen/LogisticsPointS';
import ExecutorStatusS from '../screen/Main/ExecutorStatusS';
import ClientPayS from '../screen/Main/ClientPay/ClientPayS';
import FeedbackS from '../screen/Main/FeedbackS';
import NavigatingToCheckpointS from '../screen/Main/NavigatingToCheckpointS';
import ProfileUserS from '../screen/Main/ProfileUser/ProfileUserS';
import AboutUsS from '../screen/Main/AboutUsS';
import OrderHistoryS from '../screen/Main/OrderHistoryS';
import ChangeCountryS from '../screen/Main/ChangeCountryS';
import PaymentMethodS from '../screen/Main/PaymentMethod/PaymentMethodS';
import ChatS from '../screen/Main/Chat/ChatS';

import { routerConstants } from '../constants/routerConstants';
import ChangeLanguageS from "../screen/Main/ChangeLanguageS";

type Route = {
	name: string;
	component: React.ComponentType;
};

const authenticatedRoutes: Route[] = [
	{ name: routerConstants.ORDERS, component: OrdersS },
	{ name: routerConstants.CREATE_ORDER, component: CreateOrder },
	{ name: routerConstants.ADD_NEW_CARD, component: AddNewCardS },
	{ name: routerConstants.ORDER_CONFIRMATION, component: OrderConfirmationS },
	{ name: routerConstants.PRICE, component: PriceS },
	{ name: routerConstants.LOGISTIC_POINT, component: LogisticsPointS },
	{ name: routerConstants.EXECUTOR_STATUSES, component: ExecutorStatusS },
	{ name: routerConstants.CLIENT_PAY, component: ClientPayS },
	{ name: routerConstants.CLIENT_RECEIVED, component: FeedbackS },
	{ name: routerConstants.EXECUTOR_MAP, component: NavigatingToCheckpointS },
	{ name: routerConstants.PROFILE, component: ProfileUserS },
	{ name: routerConstants.PAYMENT_METHOD, component: PaymentMethodS },
	{ name: routerConstants.ORDER_HISTORY, component: OrderHistoryS },
	{ name: routerConstants.CHANGE_COUNTRY, component: ChangeCountryS },
	{ name: routerConstants.CHAT_SUPPORT, component: ChatS },
	{ name: routerConstants.CHANGE_LANGUAGE, component: ChangeLanguageS },
];

export default authenticatedRoutes;
