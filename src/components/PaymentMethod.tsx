import React from 'react'
import { Box, Text } from 'native-base'
import { Image, TouchableOpacity } from 'react-native'
import { colors } from '../assets/colors/colors'
import arrowBlue from '../assets/Images/order/arrowRightBlue.png'
type PaymentMethodProps = {
	onPressChangePayment: () => void
}
const PaymentMethod = ({onPressChangePayment}: PaymentMethodProps) => {
	return (
		<>
			<Text mb={3} fontSize={22} fontFamily={'semiBold'}>Payment method</Text>
			<TouchableOpacity onPress={onPressChangePayment}>
				<Box paddingY={18} borderRadius={16} paddingX={5} flexDirection={'row'} alignItems={'center'}
						 justifyContent={'space-between'}
						 backgroundColor={colors.grayBright}>
					<Text fontSize={15} fontFamily={'regular'}>Google Pay</Text>
					<Image source={arrowBlue} alt={'arrow'} />
				</Box>
			</TouchableOpacity>
		</>
	)
}

export default PaymentMethod
