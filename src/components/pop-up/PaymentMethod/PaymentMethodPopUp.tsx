import React, { useState } from 'react'
import ModalPopup from '../../pop-up'
import { Box, Image, Text } from 'native-base'
import BtnAddNewCard from './btnAddNewCard'
import closeCircleGrayImg from '../../../assets/Images/order/closeCircleGray.png'
import { TouchableOpacity } from 'react-native'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { routerConstants } from '../../../constants/routerConstants'

type PaymentMethodPopUpProps = {
	visible: boolean
	navigation: NavigationProp<ParamListBase>
	onClose: () => void
}
const PaymentMethodPopUp = ({ visible, onClose, navigation }: PaymentMethodPopUpProps) => {
	const [chosenMethod, setChosenMethod] = useState<boolean>(false)
	const onPressNewPayment = () => {
		navigation.navigate(routerConstants.ADD_NEW_CARD)
	}

	return (
		<ModalPopup style={{}} visible={visible} onClose={onClose}>
			<Box>
				<Box mb={5} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
					<Text fontSize={22} fontFamily={'semiBold'}>Payment method</Text>
					<TouchableOpacity onPress={onClose}>
						<Image alt={'close'} source={closeCircleGrayImg} />
					</TouchableOpacity>
				</Box>
				<BtnAddNewCard onPressNewPayment={onPressNewPayment} />
			</Box>
		</ModalPopup>
	)
}

export default PaymentMethodPopUp
