import React, {memo} from 'react'
import { Box, Text } from 'native-base'
import { colors } from '../../../assets/colors/colors'
import { OrderType } from '../../../api/Client/type'
import { Image, TouchableOpacity } from 'react-native'
import arrowBlue from '../../../assets/Images/order/arrowRightBlue.png'
import { getLastStepStatusOrder } from './utils'
import { format } from 'date-fns'

type OrderViewerProps = {
	order: OrderType
	onPressDetails: (order: OrderType) => void
}
const OrderViewer = memo(({ order, onPressDetails }: OrderViewerProps) => {

	const getCurrData = getLastStepStatusOrder(order.last_step?.trim(), order.date_estimated_ready)

	return (
		<Box borderWidth={1} p={2} mb={2} borderColor={colors.grayBright} borderRadius={20}>
			<Box flexDirection={'row'} mb={2} alignItems={'center'} justifyContent={'flex-start'}>
				<Box mr={2}>
					<Image style={{ width: 40, height: 40 }} source={getCurrData?.img} />
				</Box>
				<Box>
					<Text fontFamily={'semiBold'} fontSize={17}>Swash{' '}#{order.id}</Text>
					<Text fontFamily={'regular'} fontSize={13}>{getCurrData?.text}</Text>
				</Box>
			</Box>
			<Box>
				<TouchableOpacity onPress={() => onPressDetails(order)}>
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
})

export default OrderViewer
