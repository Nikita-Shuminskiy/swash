import React from 'react'
import {NavigationProp, ParamListBase} from '@react-navigation/native'
import {BaseWrapperComponent} from '../../../components/baseWrapperComponent'
import {Box, Image, Text} from 'native-base'
import HeaderGoBackTitle from '../../../components/HeaderGoBackTitle'
import {TouchableOpacity} from 'react-native'
import closeCircleGrayImg from '../../../assets/Images/order/closeCircleGray.png'
import BtnAddNewCard from '../../../components/pop-up/PaymentMethod/btnAddNewCard'
import {routerConstants} from '../../../constants/routerConstants'
import DictionaryStore from "../../../store/DictionaryStore/dictionary-store";
import {DictionaryEnum} from "../../../store/DictionaryStore/type";
import {observer} from "mobx-react-lite";

type PaymentMethodSProps = {
    navigation: NavigationProp<ParamListBase>
}
const PaymentMethodS = observer(({navigation}: PaymentMethodSProps) => {
    const {dictionary} = DictionaryStore
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
                    <HeaderGoBackTitle title={dictionary[DictionaryEnum.AboutSwash]} goBackPress={goBack}/>
                </Box>
                <Box mt={4}>
                    <BtnAddNewCard dictionary={dictionary} onPressNewPayment={onPressNewPayment}/>
                </Box>
            </Box>

        </BaseWrapperComponent>
    )
})

export default PaymentMethodS
