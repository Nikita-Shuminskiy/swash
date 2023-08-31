import React, { useEffect, useState } from 'react'
import { BaseWrapperComponent } from '../../components/baseWrapperComponent'
import { Box, Text } from 'native-base'
import Button from '../../components/Button'
import { colors } from '../../assets/colors/colors'
import ArrowBack from '../../components/ArrowBack'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { StyleSheet, View } from 'react-native'
import { getCurrentPositionHandler } from '../../components/MapViews/utils'

const NavigatingToCheckpointS = ({ navigation }) => {
	const [myPosition, setMyPosition] = useState<{ latitude: number, longitude: number }>()
	const goBackPress = () => {
		navigation.goBack()
	}
	const onPressNavigate = () => {

	}
	const getCurrentPosition = async () => {
		try {
			const { latitude, longitude } = await getCurrentPositionHandler()
			setMyPosition({ latitude, longitude })
		} catch (e) {

		}
	}
	useEffect(() => {
		getCurrentPosition()
	}, [])
	if (!myPosition) {
		return <View style={styles.container} />
	}
	const initialRegion = {
		latitude: myPosition?.latitude,
		longitude: myPosition?.longitude,
		latitudeDelta: 0.0221,
		longitudeDelta: 0.0221,
	}

	return (
		<BaseWrapperComponent>
			<Box style={{ paddingHorizontal: 16, justifyContent: 'space-between', width: '100%', flex: 1 }}>
				<Box>
					<ArrowBack goBackPress={goBackPress} />
					<Box mt={2} mb={2}>
						<Text fontSize={28} fontFamily={'semiBold'}>
							Swash #221
						</Text>
					</Box>
					<Box p={3} backgroundColor={`rgba(255, 170, 4, 0.2)`} borderRadius={16}>
						<Text fontSize={15} fontFamily={'regular'}>
							It's time to take things to the pachkomat! The cell is waiting for you until <Text
							color={colors.orangeVivid}>08/20/2023 15:00</Text>
						</Text>
					</Box>

					<Box mt={4}>
						<MapView
							style={styles.map}
							provider={PROVIDER_GOOGLE}
							initialRegion={initialRegion}
						>
							{
								!!myPosition?.latitude && <Marker
									focusable={true}
									style={{ width: 30, height: 30 }}
									image={require('../../assets/Images/Map/user.png')}
									coordinate={myPosition}
									title={''}
								/>
							}
						</MapView>
					</Box>

					<Box mt={4}>
						<Text fontSize={15} fontFamily={'regular'}>
							You must have time to pick up all the things from the postomat before it closes. Be careful, an employee
							of
							our service is not obliged to make refunds to you, please keep an eye on things. You can ask for help in
							the
							app chat in the menu
						</Text>
					</Box>
				</Box>
				<Box mb={5} alignItems={'center'}>
					<Button backgroundColor={colors.blue} colorText={colors.white}
									styleContainer={{
										borderRadius: 28,
										maxWidth: 280,
										width: '100%',
									}} onPress={onPressNavigate} title={'Navigate'} />
				</Box>
			</Box>
		</BaseWrapperComponent>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	map: {
		width: '100%',
		height: 200,
	},
})

export default NavigatingToCheckpointS
