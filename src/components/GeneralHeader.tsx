import React from 'react'
import { Box, Text } from 'native-base'
import { colors } from '../assets/colors/colors'
import ArrowBack from './ArrowBack'
import { NavigationProp, ParamListBase } from '@react-navigation/native'

type GeneralHeaderProps = {
	navigation: NavigationProp<ParamListBase>
	orders_id: string
}
const GeneralHeader = ({navigation, orders_id}:GeneralHeaderProps) => {
	const goBackPress = () => {
		navigation.goBack()
	}
	return (
		<Box>
			<ArrowBack goBackPress={goBackPress} />
			<Text fontSize={28} mt={3} fontFamily={'semiBold'} color={colors.black}>Swash #{orders_id}</Text>
		</Box>
	)
}

export default GeneralHeader
