import { useEffect } from 'react'
import { BackHandler } from 'react-native'

export const useGoBack = (goBackPress) => {
	useEffect(() => {
		BackHandler.addEventListener('hardwareBackPress', goBackPress)

		return () => {
			BackHandler.removeEventListener('hardwareBackPress', goBackPress)
		}
	}, [])
}
