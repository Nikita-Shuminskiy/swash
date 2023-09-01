import React from 'react'
import { Box, Text } from 'native-base'
import { Image } from 'react-native'
import warningImg from '../../../assets/Images/warning.png'
import { colors } from '../../../assets/colors/colors'

const PaymentRequared = () => {
	return (
		<Box backgroundColor={colors.red} flexDirection={'row'} alignItems={'flex-start'} p={4} borderRadius={16}>
			<Image source={warningImg} style={{ position: "relative", top: 5 }} />
			<Box ml={2}>
				<Text fontSize={17} color={colors.white} fontFamily={'semiBold'}>Problems with payment</Text>
				<Text fontSize={13} color={colors.white} fontFamily={'regular'}>
					Something went wrong.{'\n'}
					Try changing payment method and try again</Text>
			</Box>
		</Box>
	)
}

export default PaymentRequared
