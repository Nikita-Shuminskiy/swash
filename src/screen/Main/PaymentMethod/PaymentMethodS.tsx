import React from 'react'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { BaseWrapperComponent } from '../../../components/baseWrapperComponent'
import { Box, Image, Text } from 'native-base'
import HeaderGoBackTitle from '../../../components/HeaderGoBackTitle'
import { TouchableOpacity } from 'react-native'
import closeCircleGrayImg from '../../../assets/Images/order/closeCircleGray.png'
import BtnAddNewCard from '../../../components/pop-up/PaymentMethod/btnAddNewCard'
import { routerConstants } from '../../../constants/routerConstants'

type PaymentMethodSProps = {
	navigation: NavigationProp<ParamListBase>
}
const PaymentMethodS = ({ navigation }: PaymentMethodSProps) => {
	const goBack = () => {
		navigation.goBack()
	}
	const onPressNewPayment = () => {
		navigation.navigate(routerConstants.ADD_NEW_CARD)
	}

	return (
		<BaseWrapperComponent>
			<Box paddingX={4} mb={6} mt={3} flex={1} justifyContent={'flex-start'}>
				<Box>
					<HeaderGoBackTitle title={'About us'} goBackPress={goBack} />
				</Box>
				<Box mt={4}>
					<BtnAddNewCard onPressNewPayment={onPressNewPayment} />
				</Box>
			</Box>

		</BaseWrapperComponent>
	)
}

export default PaymentMethodS
