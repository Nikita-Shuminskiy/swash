import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Box, Image, Text } from 'native-base'
import { colors } from '../../../assets/colors/colors'
import addCircleImage from '../../../assets/Images/order/addCircle.png'

const BtnAddNewCard = ({onPressNewPayment}) => {
	return (
		<TouchableOpacity onPress={onPressNewPayment}>
			<Box paddingY={18} borderRadius={16} paddingX={5} flexDirection={'row'} alignItems={'center'}
					 justifyContent={'flex-start'}
					 backgroundColor={colors.grayBright}>
				<Image style={{ width: 24, height: 24 }} source={addCircleImage} alt={'arrow'} />
				<Text ml={2} fontSize={15} color={colors.blue}>Add new card</Text>

			</Box>
		</TouchableOpacity>
	)
}

export default BtnAddNewCard
