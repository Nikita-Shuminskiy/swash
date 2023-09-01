import React from 'react'
import { Box, Text } from 'native-base'
import { colors } from '../../../assets/colors/colors'

type OrderInfoItemProps = {
	nameField: string
	price: string
	color?: string
}
const OrderInfoItem = ({ nameField, price, color = colors.black }: OrderInfoItemProps) => {
	const isTotal = nameField === 'Total'
	return (
		<Box mb={2} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
			<Text fontSize={15} fontFamily={'regular'}
						color={colors.grayLight}>{nameField}</Text>
			<Text color={color} fontSize={isTotal ? 17 : 15} fontFamily={isTotal ? 'semiBold' : 'regular'}>{price}{' '}zl</Text>
		</Box>
	)
}

export default OrderInfoItem
