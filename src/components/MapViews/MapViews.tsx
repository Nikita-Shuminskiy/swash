import React, { useEffect, useState } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Box } from 'native-base'
import NotificationStore from '../../store/NotificationStore/notification-store'
import { getCurrentPositionHandler } from './utils'
import AddressAutocomplete from '../AddressAutocomplete'
import myPositionImg from '../../assets/Images/Map/MyPosition.png'
import { LogisticsPointType, OrderReportDetailType } from '../../api/Client/type'
import MarkerCustom from './MarkerCustom'
import rootStore from '../../store/RootStore/root-store'
import LoadingLocal from '../LoadingLocal'
import { LoadingEnum } from '../../store/types/types'
import {DictionaryType} from "../../store/DictionaryStore/dictionary-store";


type MapViewsProps = {
	logisticPoints?: LogisticsPointType[]
	orderDetail: OrderReportDetailType
	dictionary: DictionaryType
}
export const MapViews = ({ logisticPoints, orderDetail, dictionary }: MapViewsProps) => {
	const { setIsLoading, setLocalLoading } = NotificationStore
	const { OrdersStoreService } = rootStore
	const [mapRef, setMapRef] = useState(null)
	const [myPosition, setMyPosition] = useState<{ latitude: number, longitude: number }>({
		latitude: 54.34544523458879,
		longitude: 18.66879642843845,
	})

	const getCurrentPosition = async () => {
		setLocalLoading(LoadingEnum.fetching)
		try {
			const { latitude, longitude } = await getCurrentPositionHandler()
			setMyPosition({ latitude, longitude })
		} catch (e) {

		} finally {
			setLocalLoading(LoadingEnum.success)
		}
	}
	useEffect(() => {
		if (mapRef && myPosition?.latitude) {
			mapRef.fitToCoordinates([{ latitude: myPosition.latitude, longitude: myPosition.longitude }], {
				edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
				animated: true,
			})
		}
	}, [myPosition])
	useEffect(() => {
		getCurrentPosition()
	}, [])

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
				<AddressAutocomplete dictionary={dictionary} onSave={onSaveAutoCompleteHandler} />
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
				{logisticPoints.length && logisticPoints.map((point) => {
					const onPressCheckPoint = () => {
						OrdersStoreService.updateOrder({
							orders_id: orderDetail.orders_id,
							client_logistic_partners_points_id: point.logistic_partners_id,
						})
					}
					return <MarkerCustom onPressCheckPoint={onPressCheckPoint} point={point} key={point.id} />
				})}
			</MapView>
			<Box mt={5} zIndex={10} position={'absolute'} right={0} bottom={10}>
				<TouchableOpacity onPress={getCurrentPosition}>
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
