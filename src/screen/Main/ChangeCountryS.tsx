import React from 'react'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { BaseWrapperComponent } from '../../components/baseWrapperComponent'
import { Box, Text } from 'native-base'
import HeaderGoBackTitle from '../../components/HeaderGoBackTitle'
import { colors } from '../../assets/colors/colors'
import Button from '../../components/Button'
import PhoneNumberField from '../../components/PhoneField'
import { Country } from 'react-native-country-picker-modal/lib/types'

type ChangeCountrySProps = {
	navigation: NavigationProp<ParamListBase>
}
const ChangeCountryS = ({ navigation }: ChangeCountrySProps) => {
	const goBack = () => {
		navigation.goBack()
	}
	const onPressSave = () => {

	}
	const onChangeCountry = (country: Country) => {
		console.log(country)
	}
	return (
		<BaseWrapperComponent>
			<Box paddingX={4} mb={6} mt={3} flex={1}>
				<Box>
					<HeaderGoBackTitle title={'Country'} goBackPress={goBack} />
				</Box>
				<Box mt={4}>
					<Text fontSize={15} fontFamily={'regular'} color={colors.grayLight}>You can always change country in your
						profile</Text>
					<Box mt={4} mb={4}>
						<PhoneNumberField onChangeCountry={onChangeCountry}
															onChangeTextPhone={() => {
															}}

															defaultCode={'PL'}
															isRequired={false} isInvalid={false} />
					</Box>
					<Box>
						<Button onPress={onPressSave}
										styleContainer={{ borderRadius: 50 }}
										backgroundColor={colors.blue}
										colorText={colors.white}
										title={'Save'} />
					</Box>
				</Box>
			</Box>
		</BaseWrapperComponent>
	)
}

export default ChangeCountryS
