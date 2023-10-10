import React, {useState} from 'react'
import {BaseWrapperComponent} from '../../components/baseWrapperComponent'
import {Box, Text} from 'native-base'
import {colors} from '../../assets/colors/colors'
import {NavigationProp, ParamListBase, RouteProp} from '@react-navigation/native'
import Button from '../../components/Button'
import rootStore from '../../store/RootStore/root-store'
import {routerConstants} from '../../constants/routerConstants'
import AuthStore from '../../store/AuthStore/auth-store'
import ArrowBack from '../../components/ArrowBack'
import {countryDataDefault} from '../../utils/constants'
import {PhoneNumberField} from '../../components/PhoneField'
import DictionaryStore from "../../store/DictionaryStore/dictionary-store";
import {DictionaryEnum} from "../../store/DictionaryStore/type";

type PhoneVerifySProps = {
    navigation: NavigationProp<ParamListBase>
    route: any
}
export type CountryData = {
    callingCode: string[];
    cca2: string;
    currency: string[];
    flag: string;
    name: string;
    region: string;
    subregion: string;
};

const AddPhoneS = ({navigation, route}: PhoneVerifySProps) => {
    const {AuthStoreService} = rootStore
    const {dictionary} = DictionaryStore
    const isFromUpdate = route.params?.from === 'update'
    const {setPhone: setVerifyPhone, clientSettings} = AuthStore
    const [phone, setPhone] = useState<string>()
    const [isValidPhone, setIsValidPhone] = useState<boolean>(false)
    const [disabledBtn, setDisableBtn] = useState<boolean>(false)
    const [countryCode, setCountryCode] = useState<CountryData>(countryDataDefault)

    const onPressSendSMS = () => {
        if (!isValidPhone || !phone) {
            return setDisableBtn(true)
        }

        const formattedPhoneNumber = `${countryCode.callingCode[0]}${phone}`
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
    const onChangeTextPhone = (value: string, isValid: boolean) => {
        setIsValidPhone(isValid)
        if (isValid) {
            setDisableBtn(false)
        }
        setPhone(value)
    }
    const onChangeCountry = (country) => {
        setCountryCode(country)
    }
    const goBackPress = () => {
        navigation.goBack()
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
                <PhoneNumberField defaultCode={'PL'}
                                  onChangeCountry={onChangeCountry} defaultValue={phone}
                                  errorMessage={dictionary[DictionaryEnum.IncorrectConfirmationCode]}
                                  placeholder={dictionary[DictionaryEnum.Phone]}
                                  onChangeTextPhone={onChangeTextPhone}
                                  isRequired={true} isInvalid={disabledBtn}/>
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
