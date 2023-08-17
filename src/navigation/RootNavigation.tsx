import React, { useEffect } from 'react'
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
import { usePermissionsPushGeo } from '../utils/hook/usePermissionsPushGeo'
import VerifyNumberS from '../screen/authScreens/VerifyNumberS'
import rootStore from '../store/RootStore/root-store'
import PhoneVerifyS from '../screen/authScreens/PhoneVerifyS'


const RootStack = createNativeStackNavigator()
const RootNavigation = observer(() => {
	const { isLoading, errorText } = NotificationStore
	const { isAuth } = AuthStore
	const { AuthStoreService } = rootStore
	const {
		askNotificationPermissionHandler,
		askLocationPermissionHandler,
		notificationStatus,
		locationStatus,
	} = usePermissionsPushGeo()


	useEffect(() => {
		AuthStoreService.getClientBaseInfo()
		askNotificationPermissionHandler()
		askLocationPermissionHandler()
	}, [])
	return (
		<NavigationContainer>
			{isLoading === LoadingEnum.fetching && <Loading visible={true} />}
			{errorText && <Alerts text={'errorText'} />}
			<RootStack.Navigator>
				<RootStack.Screen
					options={{ headerShown: false }}
					name={routerConstants.LOGIN}
					component={LoginS}
				/>
				<RootStack.Screen
					options={{ headerShown: false }}
					name={routerConstants.GIVE_PERMISSIONS}
					component={GivePermissions}
				/>
				<RootStack.Screen
					options={{ headerShown: false }}
					name={routerConstants.VERIFY_NUMBER}
					component={VerifyNumberS}
				/>
				<RootStack.Screen
					options={{ headerShown: false }}
					name={routerConstants.PHONE_VERIFY}
					component={PhoneVerifyS}
				/>
			</RootStack.Navigator>
		</NavigationContainer>
	)
})

export default RootNavigation
