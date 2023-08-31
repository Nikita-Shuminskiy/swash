import React from 'react'
import { Box, Text } from 'native-base'
import { colors } from '../../assets/colors/colors'
import { OrderType } from '../../api/Client/type'
import { Image, TouchableOpacity } from 'react-native'
import paymentImg from '../../assets/Images/orders/payment-red.png'
import arrowBlue from '../../assets/Images/order/arrowRightBlue.png'
type OrderViewerProps = {
	order: OrderType
	onPressDetails: () => void
}
const OrderViewer = ({order, onPressDetails}: OrderViewerProps) => {

	return (
		<Box borderWidth={1} p={2} mb={2} borderColor={colors.grayBright} borderRadius={20}>
			<Box flexDirection={'row'} mb={2} alignItems={'center'} justifyContent={'flex-start'}>
				<Box mr={2}>
					<Image style={{ width: 40, height: 40 }} source={paymentImg} />
				</Box>
				<Box>
					<Text fontFamily={'semiBold'} fontSize={17}>Swash{' '}#{order.id}</Text>
					<Text fontFamily={'regular'} fontSize={13} color={colors.grayLight}>{order.status}</Text>
				</Box>
			</Box>
			<Box>
				<TouchableOpacity onPress={onPressDetails}>
					<Box paddingY={18} borderRadius={16} paddingX={5} flexDirection={'row'} alignItems={'center'}
							 justifyContent={'space-between'}
							 backgroundColor={colors.grayBright}>
						<Text fontFamily={'regular'} fontSize={13} color={colors.blue}>Details</Text>
						<Image source={arrowBlue} alt={'arrow'} />
					</Box>
				</TouchableOpacity>
			</Box>

		</Box>
	)
}

export default OrderViewer
