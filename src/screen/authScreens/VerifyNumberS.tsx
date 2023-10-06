import React from 'react'
import {BaseWrapperComponent} from '../../components/baseWrapperComponent'
import PhoneVerificationCode from '../../components/PhoneVerificationCode'
import {Box, Text} from 'native-base'
import {colors} from '../../assets/colors/colors'
import {NavigationProp, ParamListBase} from '@react-navigation/native'
import {observer} from 'mobx-react-lite'
import AuthStore from '../../store/AuthStore/auth-store'
import TimerComponent from '../../components/TimerComponent'
import rootStore from '../../store/RootStore/root-store'
import ArrowBack from '../../components/ArrowBack'
import DictionaryStore from "../../store/DictionaryStore/dictionary-store";
import {DictionaryEnum} from "../../store/DictionaryStore/type";

type VerifyNumberSProps = {
    navigation: NavigationProp<ParamListBase>
    route: any
}
const VerifyNumberS = observer(({navigation, route}: VerifyNumberSProps) => {
    const {dictionary} = DictionaryStore
        // dictionary[DictionaryEnum.PhoneVerification]
    const isFromUpdate = route.params?.from === 'update'
    const {phone} = AuthStore
    const {AuthStoreService} = rootStore
    const onPressSendCodeAgain = () => {
        AuthStoreService.sendClientCode()
    }
    const goBackPress = () => {
        navigation.goBack()
    }
    return (
        <BaseWrapperComponent isKeyboardAwareScrollView={true}>
            <Box paddingX={5} alignItems={'flex-start'}>
                <Box mb={5}>
                    <ArrowBack goBackPress={goBackPress}/>
                </Box>
                <Text fontSize={28} fontFamily={'semiBold'}>{dictionary[DictionaryEnum.PhoneVerification]}</Text>
                <Text fontSize={15} color={colors.gray} fontFamily={'regular'}>The code was sent to {dictionary[DictionaryEnum.CodeWasSentTo]}<Text
                    fontFamily={'regular'} fontSize={15}
                    color={colors.blue}>+{phone}</Text></Text>
                <Box mt={10} mb={10} flex={1} w={'100%'}>
                    <PhoneVerificationCode dictionary={dictionary} isFromUpdate={isFromUpdate} navigation={navigation}/>
                </Box>
                <TimerComponent dictionary={dictionary} onPressSendCodeAgain={onPressSendCodeAgain}/>
            </Box>

        </BaseWrapperComponent>
    )
})

export default VerifyNumberS
