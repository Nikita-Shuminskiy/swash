import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { observer } from 'mobx-react-lite'
import AuthStore from '../store/AuthStore'
import NotificationStore from '../store/NotificationStore/notification-store'
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
import LoadingLocal from '../components/LoadingLocal'
import { useInternetConnected } from '../utils/hook/useInternetConnected'
import { BurgerMenuProvider } from '../components/BurgerMenu/BurgerMenuContext'
import BurgerMenu from '../components/BurgerMenu/BurgerMenu'
import authenticatedRoutes from './routesConstants'
import rootStore from '../store/RootStore/root-store'
import { useNavigation } from '@react-navigation/native'


const RootStack = createNativeStackNavigator()
const RootNavigation = observer(() => {
	const { isLoading, serverResponseText, isLocalLoading, setIsLoading } = NotificationStore

	const { AuthStoreService, OrdersStoreService } = rootStore
	const { isAuth } = AuthStore
	const {
		askNotificationPermissionHandler,
		askLocationPermissionHandler,
		locationStatus,
	} = usePermissionsPushGeo()
	const checkStatusPermissions = locationStatus !== 'undetermined' && locationStatus !== 'granted'
	const { checkInternetConnection, isConnected } = useInternetConnected()
	const navigate = useNavigation<any>()

	useEffect(() => {
		setIsLoading(LoadingEnum.fetching)
		OrdersStoreService.getSettingClient(navigate?.navigate).finally(() => {
			setTimeout(() => {
				setIsLoading(LoadingEnum.success)
			}, 3000)
		})
	}, [])
	return (
		<BurgerMenuProvider>
			{isLoading === LoadingEnum.fetching && <LoadingGlobal visible={true} />}
			{isLocalLoading === LoadingEnum.fetching && <LoadingLocal visible={true} />}
			{serverResponseText && <Alerts text={serverResponseText} />}
			{!isConnected && <WifiReconnect checkInternet={checkInternetConnection} visible={!isConnected} />}
			{checkStatusPermissions && <GivePermissions askLocationPermissionHandler={askLocationPermissionHandler}
																									askNotificationPermissionHandler={askNotificationPermissionHandler}
																									visible={checkStatusPermissions} />}
			<BurgerMenu />
			<RootStack.Navigator screenOptions={{ headerShown: false }}>
				<RootStack.Screen
					name={routerConstants.LOGIN}
					component={LoginS}
				/>
				<RootStack.Screen
					name={routerConstants.VERIFY_NUMBER}
					component={VerifyNumberS}
				/>
				<RootStack.Screen
					name={routerConstants.PHONE_VERIFY}
					component={AddPhoneS}
				/>
				<RootStack.Screen
					name={routerConstants.TERMS_OF_USE}
					component={TermsOfUseS}
				/>
				{
					isAuth &&
					authenticatedRoutes.map((route) => {
						return <RootStack.Screen
							key={route.name}
							name={route.name}
							component={route.component}
						/>
					})
				}
			</RootStack.Navigator>
		</BurgerMenuProvider>
	)
})

export default RootNavigation
