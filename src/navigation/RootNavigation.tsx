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
import GivePermissions from '../screen/authScreens/GivePermissions'
import VerifyNumberS from '../screen/authScreens/VerifyNumberS'
import rootStore from '../store/RootStore/root-store'
import AddPhoneS from '../screen/authScreens/AddPhoneS'
import WifiReconnectS from '../screen/authScreens/WifiReconnectS'
import NetInfo from '@react-native-community/netinfo'
import TermsOfUseS from '../screen/authScreens/TermsOfUseS'
import { usePermissionsPushGeo } from '../utils/hook/usePermissionsPushGeo'


const RootStack = createNativeStackNavigator()
const RootNavigation = observer(() => {
	const { isLoading, serverResponseText } = NotificationStore
	const { isAuth } = AuthStore
	const { AuthStoreService } = rootStore
	const {
		askNotificationPermissionHandler,
		askLocationPermissionHandler,
		notificationStatus,
		locationStatus,
	} = usePermissionsPushGeo()
	const [isConnected, setIsConnected] = useState(true)
	const [isGivePermission, setIsGivePermission] = useState(false)

	const checkInternetConnection = async () => {
		const netInfoState = await NetInfo.fetch()
		setIsConnected(netInfoState.isConnected)
	}

	useEffect(() => {
		const unsubscribe = NetInfo.addEventListener(state => {
			setIsConnected(state.isConnected)
		})
		Promise.all([
			askNotificationPermissionHandler(),
			askLocationPermissionHandler(),
		]).then(([notificationStatus, locationStatus]) => {
			if (notificationStatus !== 'granted' || locationStatus !== 'granted') {
				setIsGivePermission(true)
			}
		}).catch(error => {
			console.log('Promise all')
		})

		return () => {
			unsubscribe()
		}

	}, [])
	return (
		<NavigationContainer>
			{isLoading === LoadingEnum.fetching && <Loading visible={true} />}
			{serverResponseText && <Alerts text={serverResponseText} />}
			{!isConnected && <WifiReconnectS checkInternet={checkInternetConnection} visible={!isConnected} />}
			{isGivePermission && <GivePermissions visible={isGivePermission} />}
			<RootStack.Navigator>
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
