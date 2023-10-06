import React from 'react'
import { Box, Text } from 'native-base'
import { Image } from 'react-native'
import warningImg from '../../../assets/Images/warning.png'
import { colors } from '../../../assets/colors/colors'
import {DictionaryEnum} from "../../../store/DictionaryStore/type";
import {observer} from "mobx-react-lite";

const PaymentRequared = observer(({dictionary}: any) => {
	return (
		<Box backgroundColor={colors.red} flexDirection={'row'} alignItems={'flex-start'} p={4} borderRadius={16}>
			<Image source={warningImg} style={{ position: "relative", top: 5 }} />
			<Box ml={2}>
				<Text fontSize={17} color={colors.white} fontFamily={'semiBold'}>{dictionary[DictionaryEnum.ProblemsWithPayment]}</Text>
				<Text fontSize={13} color={colors.white} fontFamily={'regular'}>
					{dictionary[DictionaryEnum.SomethingWentWrong]}</Text>
			</Box>
		</Box>
	)
})

export default PaymentRequared
