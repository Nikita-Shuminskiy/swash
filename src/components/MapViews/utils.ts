import * as Location from 'expo-location'

export const allowLocation = async () => {
	try {
		let { status } = await Location.requestForegroundPermissionsAsync()
		if (status !== 'granted') {
			console.error('Permission to access location was denied')
			return
		}
		return status
	} catch (e) {
		console.log('error', e)
	} finally {
	}
}
