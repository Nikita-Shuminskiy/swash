import React, { useEffect, useState } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { StyleSheet } from 'react-native'
import { Box } from 'native-base'
import * as Location from 'expo-location'
import { useNavigation } from '@react-navigation/native'
import NotificationStore from '../../store/NotificationStore/notification-store'
import { LoadingEnum } from '../../store/types/types'
import { allowLocation } from './utils'
import AddressAutocomplete from '../AddressAutocomplete'

type MapViewsProps = {}
export const MapViews = ({}: MapViewsProps) => {
	const { setIsLoading } = NotificationStore
	const navigation = useNavigation<any>()
	const [mapRef, setMapRef] = useState(null)
	const [myPosition, setMyPosition] = useState<{ latitude: number, longitude: number }>()

	const getCurrentPositionHandler = async () => {
		setIsLoading(LoadingEnum.fetching)
		try {
			const status = await allowLocation()
			if (status) {
				let currentLocation = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.BestForNavigation })
				const { latitude, longitude } = currentLocation.coords
				setMyPosition({ latitude, longitude })
			}
		} catch (e) {
			console.log('err', e)
		} finally {
			setIsLoading(LoadingEnum.success)
		}
	}
	useEffect(() => {
		if (mapRef && myPosition.latitude) {
			mapRef.fitToCoordinates([{ latitude: myPosition.latitude, longitude: myPosition.longitude }], {
				edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
				animated: true,
			});
		}
	}, [myPosition]);
	useEffect(() => {
		getCurrentPositionHandler()
	}, [])

	const onSaveAutoCompleteHandler = () => {

	}
	const initialRegion = {
		latitude: myPosition?.latitude,
		longitude: myPosition?.longitude,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	};
	return <Box style={styles.container}>
		<Box zIndex={10} position={'absolute'} top={5} alignItems={'center'} justifyContent={'center'} flex={1} w={'100%'}>
			<AddressAutocomplete onSave={onSaveAutoCompleteHandler} />
		</Box>

		<MapView
			ref={(ref) => setMapRef(ref)}
			style={styles.map}
			initialRegion={myPosition?.latitude ? initialRegion : undefined}
		>
			{
				!!myPosition?.latitude && <Marker
					focusable={true}
					image={require('../../assets/Images/Map/user.png')}
					coordinate={myPosition}
					title={''}
				/>
			}

		</MapView>
	</Box>
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	map: {
		width: '100%',
		height: '100%',
	},
})
