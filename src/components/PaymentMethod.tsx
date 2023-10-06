import React, {useState} from 'react'
import {Box, Text} from 'native-base'
import {Image, TouchableOpacity} from 'react-native'
import {colors} from '../assets/colors/colors'
import arrowBlue from '../assets/Images/order/arrowRightBlue.png'
import CustomCheckbox from './CustomCheckbox'
import {observer} from "mobx-react-lite";
import DictionaryStore from "../store/DictionaryStore/dictionary-store";
import {DictionaryEnum} from "../store/DictionaryStore/type";

type PaymentMethodProps = {
    onPressChangePayment: () => void
}
const PaymentMethod = observer(({onPressChangePayment}: PaymentMethodProps) => {
    const [checkState, setCheckState] = useState(false)
    const {dictionary} = DictionaryStore
    const onPress = () => {
        setCheckState(prevState => !prevState)
    }
    return (
        <>
            <Text mb={3} fontSize={22} fontFamily={'semiBold'}>{dictionary[DictionaryEnum.PaymentMethod]}</Text>
            <Box paddingY={18} borderRadius={16} paddingX={5} flexDirection={'row'} alignItems={'center'}
                 justifyContent={'space-between'}
                 backgroundColor={colors.grayBright}>
                <CustomCheckbox checked={checkState} onPress={onPress}/>

                <TouchableOpacity style={{flex: 1}} onPress={onPressChangePayment}>
                    <Box flexDirection={'row'} flex={1} justifyContent={'space-between'} alignItems={'center'}>
                        <Text ml={2} fontSize={15} fontFamily={'regular'}>Google Pay</Text>
                        <Image source={arrowBlue} alt={'arrow'}/>
                    </Box>
                </TouchableOpacity>

            </Box>
        </>
    )
})

export default PaymentMethod
