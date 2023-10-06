import React, { useState } from 'react'
import ModalPopup from '../../pop-up'
import { Box, Image, Text } from 'native-base'
import BtnAddNewCard from './btnAddNewCard'
import closeCircleGrayImg from '../../../assets/Images/order/closeCircleGray.png'
import { TouchableOpacity } from 'react-native'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { routerConstants } from '../../../constants/routerConstants'
import {DictionaryType} from "../../../store/DictionaryStore/dictionary-store";
import {DictionaryEnum} from "../../../store/DictionaryStore/type";

type PaymentMethodPopUpProps = {
	visible: boolean
	navigation: NavigationProp<ParamListBase>
	dictionary: DictionaryType
	onClose: () => void
}
const PaymentMethodPopUp = ({ visible, onClose, navigation, dictionary }: PaymentMethodPopUpProps) => {
	const [chosenMethod, setChosenMethod] = useState<boolean>(false)
	const onPressNewPayment = () => {
		navigation.navigate(routerConstants.ADD_NEW_CARD)
	}

	return (
		<ModalPopup style={{}} visible={visible} onClose={onClose}>
			<Box>
				<Box mb={5} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
					<Text fontSize={22} fontFamily={'semiBold'}>{dictionary[DictionaryEnum.PaymentMethod]}</Text>
					<TouchableOpacity onPress={onClose}>
						<Image alt={'close'} source={closeCircleGrayImg} />
					</TouchableOpacity>
				</Box>
				<BtnAddNewCard dictionary={dictionary} onPressNewPayment={onPressNewPayment} />
			</Box>
		</ModalPopup>
	)
}

export default PaymentMethodPopUp
