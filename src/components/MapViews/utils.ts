import * as Location from 'expo-location'
import {createAlert} from '../CreateAlert'

export const allowLocation = async () => {
    try {
        let {status} = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
            createAlert({
                title: 'Message',
                message: 'Permission to access location was denied',
                buttons: [{text: 'Exit'}],
            })
            return
        }
        return status
    } catch (e) {
        console.log('error', e)
    } finally {
    }
}
export const getCurrentPositionHandler = async () => {
	try {
        let currentLocation = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.BestForNavigation,
            timeInterval: 1000
        })
        const { latitude, longitude } = currentLocation.coords
        return { latitude, longitude }
	} catch (e) {
		console.log(e, 'getCurrent')
	} finally {
	}
}
