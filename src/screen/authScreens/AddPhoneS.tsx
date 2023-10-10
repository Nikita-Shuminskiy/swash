import React, {useState} from 'react'
import {BaseWrapperComponent} from '../../components/baseWrapperComponent'
import {Box, Text} from 'native-base'
import {colors} from '../../assets/colors/colors'
import {NavigationProp, ParamListBase} from '@react-navigation/native'
import Button from '../../components/Button'
import rootStore from '../../store/RootStore/root-store'
import {routerConstants} from '../../constants/routerConstants'
import AuthStore from '../../store/AuthStore/auth-store'
import ArrowBack from '../../components/ArrowBack'
import {countryDataDefault} from '../../utils/constants'
import DictionaryStore from "../../store/DictionaryStore/dictionary-store";
import {DictionaryEnum} from "../../store/DictionaryStore/type";
import {PhoneNumberInput} from "../../components/PhoneNumberFieldMask";
import {Country} from "react-native-country-picker-modal";

type PhoneVerifySProps = {
    navigation: NavigationProp<ParamListBase>
    route: any
}

const AddPhoneS = ({navigation, route}: PhoneVerifySProps) => {
    const {AuthStoreService} = rootStore
    const {dictionary} = DictionaryStore
    const isFromUpdate = route.params?.from === 'update'
    const {setPhone: setVerifyPhone, clientSettings} = AuthStore

    const [phone, setPhone] = useState<string>('')
    const [disabledBtn, setDisableBtn] = useState<boolean>(false)

    const [country, setCountry] = useState<Country>(countryDataDefault)
    const [isValidPhone, setIsValidPhone] = useState<boolean>(false)

    const onPressSendSMS = () => {
        if (!isValidPhone || !phone) {
            return setDisableBtn(true)
        }
        const formattedPhoneNumber = `${country.callingCode[0]} ${phone}`
        if (isFromUpdate && !!(isValidPhone && !disabledBtn)) {
            if (clientSettings?.client?.phone === formattedPhoneNumber) {
                return
            }
            AuthStoreService.updateUserInfo({
                phone: formattedPhoneNumber,
            }).then((data) => {
                if (data) {
                    setVerifyPhone(formattedPhoneNumber)
                    navigation.navigate(routerConstants.VERIFY_NUMBER, {from: 'update'})
                }
            })
            return
        }

        if (isValidPhone && !disabledBtn) {
            setVerifyPhone(formattedPhoneNumber)
            AuthStoreService.sendClientCode(formattedPhoneNumber).then((data) => {
                if (data) {
                    navigation.navigate(routerConstants.VERIFY_NUMBER)
                }
            })
        }
    }

    const onChangeTextPhone = (text: string, isValid: boolean) => {
        setIsValidPhone(isValid)
        setDisableBtn(false)
        setPhone(text)
    }
    const goBackPress = () => {
        navigation.goBack()
    }
    const onPressChangeCountry = (country: Country) => {
        setCountry(country)
        setIsValidPhone(true)
        setPhone('')
        setDisableBtn(false)
    }
    return (
        <BaseWrapperComponent>
            {
                isFromUpdate && <Box position={'relative'} top={3} paddingX={5}>
                    <ArrowBack goBackPress={goBackPress}/>
                </Box>
            }
            <Box flex={1} justifyContent={'center'} alignItems={'center'} paddingX={5}>
                <Box alignItems={'center'} mb={10}>
                    <Text fontSize={22} mb={2}
                          fontFamily={'semiBold'}>{dictionary[DictionaryEnum.PhoneVerification]}</Text>
                    <Text fontSize={15} color={colors.grayLight}
                          fontFamily={'regular'}>{dictionary[DictionaryEnum.WeNeedPhoneNum]}</Text>
                </Box>
                <PhoneNumberInput
                    phoneValue={phone}
                    country={country}
                    setCountry={onPressChangeCountry}
                    onValidNumber={setIsValidPhone}
                    errorMessage={dictionary[DictionaryEnum.IncorrectConfirmationCode]}
                    placeholder={dictionary[DictionaryEnum.Phone]}
                    onChangeTextPhone={onChangeTextPhone}
                    isRequired={true} isInvalid={disabledBtn}
                    countries={clientSettings.countries}/>
                <Box mt={10} w={'100%'} alignItems={'center'}>
                    <Button styleContainer={{maxWidth: 280, width: '100%', opacity: disabledBtn ? 0.3 : 1}}
                            backgroundColor={colors.blue}
                            colorText={colors.white}
                            onPress={onPressSendSMS} title={dictionary[DictionaryEnum.SendSMS]}/>
                </Box>
            </Box>
        </BaseWrapperComponent>
    )
}

export default AddPhoneS
