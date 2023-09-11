import React, { useState } from 'react'
import { BaseWrapperComponent } from '../../components/baseWrapperComponent'
import { Box, Text } from 'native-base'
import { colors } from '../../assets/colors/colors'
import PhoneNumberField from '../../components/PhoneField'
import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native'
import Button from '../../components/Button'
import rootStore from '../../store/RootStore/root-store'
import { routerConstants } from '../../constants/routerConstants'
import AuthStore from '../../store/AuthStore/auth-store'
import ArrowBack from '../../components/ArrowBack'

type PhoneVerifySProps = {
	navigation: NavigationProp<ParamListBase>
	route: any
}
type CountryData = {
	callingCode: string[];
	cca2: string;
	currency: string[];
	flag: string;
	name: string;
	region: string;
	subregion: string;
};
const countryDataDefault = {
	callingCode: ['48'],
	cca2: 'PL',
	currency: ['PLN'],
	flag: 'flag-pl',
	name: 'Poland',
	region: 'Europe',
	subregion: 'Eastern Europe',
}
const AddPhoneS = ({ navigation, route }: PhoneVerifySProps) => {
	const { AuthStoreService } = rootStore
	const isFromUpdate = route.params?.from === 'update'
	const { setPhone: setVerifyPhone } = AuthStore
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
			AuthStoreService.updateUserInfo({
				phone: formattedPhoneNumber,
			}).then((data) => {
				if (data) {
					console.log('true')
					setVerifyPhone(formattedPhoneNumber)
					AuthStoreService.sendClientCode(formattedPhoneNumber).then((data) => {
						if (data) {
							navigation.navigate(routerConstants.VERIFY_NUMBER, { from: 'update' })
						}
					})
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
					<ArrowBack goBackPress={goBackPress} />
				</Box>
			}
			<Box flex={1} justifyContent={'center'} alignItems={'center'} paddingX={5}>
				<Box alignItems={'center'} mb={10}>
					<Text fontSize={22} mb={2} fontFamily={'semiBold'}>Phone verification</Text>
					<Text fontSize={15} color={colors.grayLight} fontFamily={'regular'}>We need your phone number</Text>
				</Box>
				<PhoneNumberField onChangeCountry={onChangeCountry} defaultValue={phone} errorMessage={'Incorrect phone number'}
													onChangeTextPhone={onChangeTextPhone}
													isRequired={true} isInvalid={disabledBtn} />
				<Box mt={10} w={'100%'} alignItems={'center'}>
					<Button styleContainer={{ maxWidth: 280, width: '100%', opacity: disabledBtn ? 0.3 : 1 }}
									backgroundColor={colors.blue}
									colorText={colors.white}
									onPress={onPressSendSMS} title={'Send SMS'} />
				</Box>
			</Box>
		</BaseWrapperComponent>
	)
}

export default AddPhoneS
