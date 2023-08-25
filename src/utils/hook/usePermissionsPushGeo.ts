import * as Notifications from 'expo-notifications'
import * as Location from 'expo-location'
import { useEffect, useState } from 'react'
import NotificationStore from '../../store/NotificationStore/notification-store'
import { LoadingEnum } from '../../store/types/types'


export const usePermissionsPushGeo = () => {

	const [notificationStatus, setNotificationStatus] = useState<string>('undetermined')
	const [locationStatus, setLocationStatus] = useState<string>('undetermined')
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
			try {
				const { status } = await Notifications.requestPermissionsAsync()
				setNotificationStatus(status)
				const { status: existingLocationStatus } = await Location.getForegroundPermissionsAsync()
				setLocationStatus(existingLocationStatus)
			} catch (e) {

			} finally {
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
