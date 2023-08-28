import React from 'react'
import { BaseWrapperComponent } from '../components/baseWrapperComponent'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { Box, Text } from 'native-base'
import ArrowBack from '../components/ArrowBack'
import { colors } from '../assets/colors/colors'
import { MapViews } from '../components/MapViews/MapViews'
import { Image, TouchableOpacity } from 'react-native'
import myPositionImg from '../assets/Images/Map/MyPosition.png'

type LogisticsPointProps = {
	navigation: NavigationProp<ParamListBase>
}
const LogisticsPointS = ({ navigation }: LogisticsPointProps) => {
	const goBackPress = () => {
		navigation.goBack()
	}
	return (
		<BaseWrapperComponent>
			<Box paddingX={3} h={58} backgroundColor={colors.white} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
				<Box position={'relative'} bottom={1}>
					<ArrowBack goBackPress={goBackPress} />
				</Box>
				<Box>
					<Text fontSize={22} fontWeight={'600'}>Select Paczkomat</Text>
				</Box>
				<Box/>
			</Box>
			<MapViews />
		</BaseWrapperComponent>
	)
}

export default LogisticsPointS