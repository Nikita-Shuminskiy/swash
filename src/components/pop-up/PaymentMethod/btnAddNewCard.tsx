import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Box, Image, Text } from 'native-base'
import { colors } from '../../../assets/colors/colors'
import addCircleImage from '../../../assets/Images/order/addCircle.png'
import {DictionaryEnum} from "../../../store/DictionaryStore/type";

const BtnAddNewCard = ({onPressNewPayment, dictionary}) => {
	return (
		<TouchableOpacity onPress={onPressNewPayment}>
			<Box paddingY={18} borderRadius={16} paddingX={5} flexDirection={'row'} alignItems={'center'}
					 justifyContent={'flex-start'}
					 backgroundColor={colors.grayBright}>
				<Image style={{ width: 24, height: 24 }} source={addCircleImage} alt={'arrow'} />
				<Text ml={2} fontSize={15} fontFamily={'regular'} color={colors.blue}>{dictionary[DictionaryEnum.AddNewCard]}</Text>

			</Box>
		</TouchableOpacity>
	)
}

export default BtnAddNewCard
