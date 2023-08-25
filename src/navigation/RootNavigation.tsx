import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { observer } from 'mobx-react-lite'
import AuthStore from '../store/AuthStore'
import NotificationStore from '../store/NotificationStore/notification-store'
import { NavigationContainer } from '@react-navigation/native'
import { LoadingEnum } from '../store/types/types'
import Loading from '../components/Loading'
import { routerConstants } from '../constants/routerConstants'
import LoginS from '../screen/authScreens/LoginS'
import Alerts from '../components/Alert'
import GivePermissions from '../components/GivePermissions'
import VerifyNumberS from '../screen/authScreens/VerifyNumberS'
import rootStore from '../store/RootStore/root-store'
import AddPhoneS from '../screen/authScreens/AddPhoneS'
import WifiReconnect from '../components/WifiReconnect'
import NetInfo from '@react-native-community/netinfo'
import TermsOfUseS from '../screen/authScreens/TermsOfUseS'
import { usePermissionsPushGeo } from '../utils/hook/usePermissionsPushGeo'
import MainS from '../screen/Main/MainS'
import AddNewCardS from '../screen/Main/AddNewCardS'


const RootStack = createNativeStackNavigator()
const RootNavigation = observer(() => {
	const { isLoading, serverResponseText, setIsLoading } = NotificationStore
	const { isAuth, setAuth } = AuthStore
	const { AuthStoreService, OrdersStoreService } = rootStore
	const {
		askNotificationPermissionHandler,
		askLocationPermissionHandler,
		locationStatus,
	} = usePermissionsPushGeo()
	const checkStatusPermissions = locationStatus !== 'undetermined' && locationStatus !== 'granted'
	const [isConnected, setIsConnected] = useState(true)


	const checkInternetConnection = async () => {
		setIsLoading(LoadingEnum.fetching)
		try {
			const netInfoState = await NetInfo.fetch()
			setIsConnected(netInfoState.isConnected)
		} catch (e) {

		} finally {
			setIsLoading(LoadingEnum.success)
		}
	}

	useEffect(() => {
		AuthStoreService.checkToken().then((data) => {
			if (data) {
				OrdersStoreService.getClientBaseInfo()
				setAuth(true)
			}
		})
		const unsubscribe = NetInfo.addEventListener(state => {
			setIsConnected(state.isConnected)
		})
		return () => {
			unsubscribe()
		}

	}, [])

	return (
		<NavigationContainer>
			{isLoading === LoadingEnum.fetching && <Loading visible={true} />}
			{serverResponseText && <Alerts text={serverResponseText} />}
			{!isConnected && <WifiReconnect checkInternet={checkInternetConnection} visible={!isConnected} />}
			{checkStatusPermissions && <GivePermissions askLocationPermissionHandler={askLocationPermissionHandler}
																									askNotificationPermissionHandler={askNotificationPermissionHandler}
																									visible={checkStatusPermissions} />}
			<RootStack.Navigator>
				{
					isAuth ?  <>
						<RootStack.Screen
							options={{ headerShown: false }}
							name={routerConstants.LOGIN}
							component={MainS}
						/>
						<RootStack.Screen
							options={{ headerShown: false }}
							name={routerConstants.ADD_NEW_CARD}
							component={AddNewCardS}
						/>
					</> : <>
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
					</>
				}
			</RootStack.Navigator>
		</NavigationContainer>
	)
})

export default RootNavigation
