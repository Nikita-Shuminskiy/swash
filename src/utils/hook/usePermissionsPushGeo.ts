import * as Notifications from 'expo-notifications'
import * as Location from 'expo-location'
import { useEffect, useState } from 'react'
import NotificationStore from '../../store/NotificationStore/notification-store'
import { LoadingEnum } from '../../store/types/types'

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
})

export const usePermissionsPushGeo = () => {
	const [notificationStatus, setNotificationStatus] = useState('undetermined')
	const [locationStatus, setLocationStatus] = useState('undetermined')
	const { setIsLoading} = NotificationStore
	const askNotificationPermissionHandler = async () => {
		const { status } = await Notifications.requestPermissionsAsync()
		setNotificationStatus(status)
		return status
	}

	const askLocationPermissionHandler = async () => {
		const { status } = await Location.requestForegroundPermissionsAsync()
		setLocationStatus(status)
		return status
	}

	useEffect(() => {
		(async () => {
			setIsLoading(LoadingEnum.fetching)
			try {
				const { status: existingNotificationStatus } = await Notifications.getPermissionsAsync()
				setNotificationStatus(existingNotificationStatus)

				const { status: existingLocationStatus } = await Location.getForegroundPermissionsAsync()
				setLocationStatus(existingLocationStatus)
			} catch (e) {

			} finally {
				setIsLoading(LoadingEnum.success)
			}
		})()
	}, [])

	return {
		askLocationPermissionHandler,
		askNotificationPermissionHandler,
		locationStatus,
		notificationStatus,
	}
}
