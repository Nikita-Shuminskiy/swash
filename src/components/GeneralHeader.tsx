import React from 'react'
import { Box, Text } from 'native-base'
import { colors } from '../assets/colors/colors'
import ArrowBack from './ArrowBack'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import {routerConstants} from "../constants/routerConstants";
import {useGoBack} from "../utils/hook/useGoBack";

type GeneralHeaderProps = {
	navigation: NavigationProp<ParamListBase>
	orders_id: string
}
const GeneralHeader = ({navigation, orders_id}:GeneralHeaderProps) => {
	const goBack = () => {
		navigation.navigate(routerConstants.ORDERS)
		return true
	}
	useGoBack(goBack)
	return (
		<Box>
			<ArrowBack goBackPress={goBack} />
			<Text fontSize={28} mt={3} fontFamily={'semiBold'} color={colors.black}>Swash #{orders_id}</Text>
		</Box>
	)
}

export default GeneralHeader
