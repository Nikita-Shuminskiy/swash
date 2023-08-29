import React, { useEffect, useState } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Box } from 'native-base'
import * as Location from 'expo-location'
import { useNavigation } from '@react-navigation/native'
import NotificationStore from '../../store/NotificationStore/notification-store'
import { allowLocation } from './utils'
import AddressAutocomplete from '../AddressAutocomplete'
import myPositionImg from '../../assets/Images/Map/MyPosition.png'
import { LogisticsPointType } from '../../api/Client/type'
import MarkerCustom from './MarkerCustom'

type MapViewsProps = {
	logisticPoints: LogisticsPointType[]
}
export const MapViews = ({ logisticPoints }: MapViewsProps) => {
	const { setIsLoading } = NotificationStore
	const navigation = useNavigation<any>()
	const [mapRef, setMapRef] = useState(null)
	const [myPosition, setMyPosition] = useState<{ latitude: number, longitude: number }>({
		latitude: 54.34544523458879,
		longitude: 18.66879642843845
	})

	const getCurrentPositionHandler = async () => {
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
		}
	}
/*	useEffect(() => {
		if (mapRef && myPosition?.latitude) {
			mapRef.fitToCoordinates([{ latitude: myPosition.latitude, longitude: myPosition.longitude }], {
				edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
				animated: true,
			})
		}
	}, [myPosition])
	useEffect(() => {
		getCurrentPositionHandler()
	}, [])*/

	const onSaveAutoCompleteHandler = () => {

	}
	if (!myPosition) {
		return <View style={styles.container} />
	}
	const initialRegion = {
		latitude: myPosition?.latitude,
		longitude: myPosition?.longitude,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	}

	return <>
		<Box style={styles.container}>
			<Box zIndex={20} position={'absolute'} top={5} alignItems={'center'} justifyContent={'center'} flex={1}
					 w={'100%'}>
				<AddressAutocomplete onSave={onSaveAutoCompleteHandler} />
			</Box>
			<MapView
				ref={(ref) => setMapRef(ref)}
				style={styles.map}
				provider={PROVIDER_GOOGLE}
				initialRegion={initialRegion}
			>
				{
					!!myPosition?.latitude && <Marker
						focusable={true}
						style={{ width: 20, height: 20 }}
						image={require('../../assets/Images/Map/user.png')}
						coordinate={myPosition}
						title={''}
					/>
				}
				{logisticPoints.map(point => (
					<MarkerCustom point={point} key={point.id} />
				))}
			</MapView>
			<Box mt={5} zIndex={10} position={'absolute'} right={0} bottom={10}>
				<TouchableOpacity onPress={getCurrentPositionHandler}>
					<Image style={{ width: 88, height: 88 }} source={myPositionImg} />
				</TouchableOpacity>
			</Box>
		</Box>

	</>
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
