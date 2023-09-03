import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { observer } from 'mobx-react-lite'
import AuthStore from '../store/AuthStore'
import NotificationStore from '../store/NotificationStore/notification-store'
import { NavigationContainer } from '@react-navigation/native'
import { LoadingEnum } from '../store/types/types'
import LoadingGlobal from '../components/LoadingGlobal'
import { routerConstants } from '../constants/routerConstants'
import LoginS from '../screen/authScreens/LoginS'
import Alerts from '../components/Alert'
import GivePermissions from '../components/GivePermissions'
import VerifyNumberS from '../screen/authScreens/VerifyNumberS'
import AddPhoneS from '../screen/authScreens/AddPhoneS'
import WifiReconnect from '../components/WifiReconnect'
import TermsOfUseS from '../screen/authScreens/TermsOfUseS'
import { usePermissionsPushGeo } from '../utils/hook/usePermissionsPushGeo'
import CreateOrder from '../screen/Main/CreateOrder/CreateOrder'
import AddNewCardS from '../screen/Main/AddNewCardS'
import OrderConfirmationS from '../screen/Main/OrderConfirmationS'
import PriceS from '../screen/Main/PriceS'
import LogisticsPointS from '../screen/LogisticsPointS'
import LoadingLocal from '../components/LoadingLocal'
import { useInternetConnected } from '../utils/hook/useInternetConnected'
import OrdersS from '../screen/Main/Orders/OrdersS'
import FeedbackS from '../screen/Main/FeedbackS'
import NavigatingToCheckpointS from '../screen/Main/NavigatingToCheckpointS'
import ClientPayS from '../screen/Main/ClientPay/ClientPayS'
import ExecutorStatusS from '../screen/Main/ExecutorStatusS'


const RootStack = createNativeStackNavigator()
const RootNavigation = observer(() => {
	const { isLoading, serverResponseText, isLocalLoading } = NotificationStore
	const { isAuth } = AuthStore
	const {
		askNotificationPermissionHandler,
		askLocationPermissionHandler,
		locationStatus,
	} = usePermissionsPushGeo()
	const checkStatusPermissions = locationStatus !== 'undetermined' && locationStatus !== 'granted'
	const { checkInternetConnection, isConnected } = useInternetConnected()


	return (
		<NavigationContainer>
			{isLoading === LoadingEnum.fetching && <LoadingGlobal visible={true} />}
			{isLocalLoading === LoadingEnum.fetching && <LoadingLocal visible={true} />}
			{serverResponseText && <Alerts text={serverResponseText} />}
			{!isConnected && <WifiReconnect checkInternet={checkInternetConnection} visible={!isConnected} />}
			{checkStatusPermissions && <GivePermissions askLocationPermissionHandler={askLocationPermissionHandler}
																									askNotificationPermissionHandler={askNotificationPermissionHandler}
																									visible={checkStatusPermissions} />}
			<RootStack.Navigator>
				{
					isAuth && <>
						<RootStack.Screen
							options={{ headerShown: false }}
							name={routerConstants.CREATE_ORDER}
							component={CreateOrder}
						/>
						<RootStack.Screen
							options={{ headerShown: false }}
							name={routerConstants.ORDERS}
							initialParams={{ showFeedback: false }}
							component={OrdersS}
						/>
						<RootStack.Screen
							options={{ headerShown: false }}
							name={routerConstants.ADD_NEW_CARD}
							component={AddNewCardS}
						/>
						<RootStack.Screen
							options={{ headerShown: false }}
							name={routerConstants.ORDER_CONFIRMATION}
							component={OrderConfirmationS}
						/>
						<RootStack.Screen
							options={{ headerShown: false }}
							name={routerConstants.PRICE}
							component={PriceS}
						/>

						<RootStack.Screen
							options={{ headerShown: false }}
							name={routerConstants.LOGISTIC_POINT}
							component={LogisticsPointS}
						/>

						<RootStack.Screen
							options={{ headerShown: false }}
							name={routerConstants.EXECUTOR_STATUSES}
							component={ExecutorStatusS}
						/>
						<RootStack.Screen
							options={{ headerShown: false }}
							name={routerConstants.CLIENT_PAY}
							component={ClientPayS}
						/>
						<RootStack.Screen
							options={{ headerShown: false }}
							name={routerConstants.CLIENT_RECEIVED}
							component={FeedbackS}
						/>
						<RootStack.Screen
							options={{ headerShown: false }}
							name={routerConstants.EXECUTOR_MAP}
							component={NavigatingToCheckpointS}
						/>
					</>
				}
				<RootStack.Screen
					options={{ headerShown: false }}
					name={routerConstants.LOGIN}
					component={LoginS}
				/>
				<RootStack.Screen
					options={{ headerShown: false }}
					name={routerConstants.VERIFY_NUMBER}
					component={VerifyNumberS}
				/>
				<RootStack.Screen
					options={{ headerShown: false }}
					name={routerConstants.PHONE_VERIFY}
					component={AddPhoneS}
				/>
				<RootStack.Screen
					options={{ headerShown: false }}
					name={routerConstants.TERMS_OF_USE}
					component={TermsOfUseS}
				/>
			</RootStack.Navigator>
		</NavigationContainer>
	)
})

export default RootNavigation
