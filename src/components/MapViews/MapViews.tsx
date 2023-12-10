import React, {useCallback, useEffect, useState} from 'react'
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native'
import {Box} from 'native-base'
import NotificationStore from '../../store/NotificationStore/notification-store'
import {allowLocation, getCurrentPositionHandler} from './utils'
import AddressAutocomplete from '../AddressAutocomplete'
import myPositionImg from '../../assets/Images/Map/MyPosition.png'
import {LogisticsPointType, OrderReportDetailType} from '../../api/Client/type'
import MarkerCustom from './MarkerCustom'
import rootStore from '../../store/RootStore/root-store'
import {DictionaryType} from "../../store/DictionaryStore/dictionary-store";
import {SvgXml} from "react-native-svg";
import {userSvg} from "../../assets/Images/Svg";
import {createAlert} from "../CreateAlert";


type MapViewsProps = {
	logisticPoints?: LogisticsPointType[]
	orderDetail: OrderReportDetailType
	dictionary: DictionaryType
	goBackPress: () => void
}
export const MapViews = ({ logisticPoints, orderDetail, dictionary, goBackPress }: MapViewsProps) => {
	const { OrdersStoreService } = rootStore
	const [mapRef, setMapRef] = useState(null)
	const [myPosition, setMyPosition] = useState<{ latitude: number, longitude: number }>()

	const getCurrentPosition = async () => {
		try {
			const { latitude, longitude } = await getCurrentPositionHandler()
			setMyPosition({ latitude, longitude })
		} catch (e) {
			console.log(e)
		} finally {
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


	const onSaveAutoCompleteHandler = () => {

	}
	const initialRegion = {
		latitude: 54,
		longitude: 18,
		latitudeDelta: 12,
		longitudeDelta: 18,
	}
	const onPressCheckPoint = useCallback((point: LogisticsPointType) => {
		OrdersStoreService.updateOrder({
			orders_id: orderDetail.orders_id,
			client_logistic_partners_points_id: point.id,
		}).then((data) => {
			if(data) {
				goBackPress()
			}
		})
	}, [])
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
						coordinate={myPosition}
						title={''}
					>
						<SvgXml xml={userSvg} width="100%" height="100%" />
					</Marker>
				}
				{logisticPoints.length && logisticPoints.map((point) => {
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
