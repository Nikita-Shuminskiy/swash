import React, { useState } from 'react'
import { BaseWrapperComponent } from '../../components/baseWrapperComponent'
import { Box, Text } from 'native-base'
import { colors } from '../../assets/colors/colors'
import PhoneNumberField from '../../components/PhoneField'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import Button from '../../components/Button'
import rootStore from '../../store/RootStore/root-store'
import { routerConstants } from '../../constants/routerConstants'

type PhoneVerifySProps = {
	navigation: NavigationProp<ParamListBase>
}
type CountryData = {
	callingCode: string[]; // Массив кодов для звонков
	cca2: string; // Код страны (двухсимвольный)
	currency: string[]; // Массив кодов валюты
	flag: string; // Имя файла флага
	name: string; // Название страны
	region: string; // Регион
	subregion: string; // Подрегион
};
const countryDataDefault = {
	callingCode: ["48"],
	cca2: "PL",
	currency: ["PLN"],
	flag: "flag-pl",
	name: "Poland",
	region: "Europe",
	subregion: "Eastern Europe",
};
const PhoneVerifyS = ({ navigation }: PhoneVerifySProps) => {
	const { AuthStoreService } = rootStore
	const [phone, setPhone] = useState<string>()
	const [isValidPhone, setIsValidPhone] = useState<boolean>(false)
	const [disabledBtn, setDisableBtn] = useState<boolean>(false)
	const [countryCode, setCountryCode] = useState<CountryData>(countryDataDefault);
	const onPressSendSMS = () => {
		if (!isValidPhone || !phone) {
			return setDisableBtn(true)
		}
		if (isValidPhone && !disabledBtn) {
			const formattedPhoneNumber = `${countryCode.callingCode[0]}${phone}`;
			AuthStoreService.sendClientVerifyCode(formattedPhoneNumber).then((data) => {
				if(data) {
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
	return (
		<BaseWrapperComponent>
			<Box flex={1} justifyContent={'center'} alignItems={'center'} paddingX={5}>
				<Box alignItems={'center'} mb={10}>
					<Text fontSize={22} mb={2} fontWeight={'600'}>Phone verification</Text>
					<Text fontSize={15} color={colors.grayLight}>We need your phone number</Text>
				</Box>
				<PhoneNumberField onChangeCountry={onChangeCountry}  defaultValue={phone} errorMessage={'Incorrect phone number'} onChangeText={onChangeTextPhone}
													isRequired={true} isInvalid={disabledBtn} />
				<Box mt={10}>
					<Button styleContainer={{ width: 280 }} backgroundColor={colors.blue} colorText={colors.white}
									onPress={onPressSendSMS} title={'Send SMS'} />
				</Box>
			</Box>
		</BaseWrapperComponent>
	)
}

export default PhoneVerifyS
