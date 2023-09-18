import React, { useState } from 'react'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { BaseWrapperComponent } from '../../components/baseWrapperComponent'
import { Box, Text } from 'native-base'
import HeaderGoBackTitle from '../../components/HeaderGoBackTitle'
import { colors } from '../../assets/colors/colors'
import Button from '../../components/Button'
import CountriesPicker from '../../components/CountriesPicker'
import { CountryCode } from 'react-native-country-picker-modal/lib/types'
import rootStore from '../../store/RootStore/root-store'
import AuthStore from '../../store/AuthStore/auth-store'
import { observer } from 'mobx-react-lite'
import { useBurgerMenu } from '../../components/BurgerMenu/BurgerMenuContext'

type ChangeCountrySProps = {
	navigation: NavigationProp<ParamListBase>
}
const ChangeCountryS = observer(({ navigation }: ChangeCountrySProps) => {
	const { clientSettings } = AuthStore
	const { AuthStoreService } = rootStore
	const { isMenuOpen, setIsMenuOpen } = useBurgerMenu()
	const [selectedCountryCode, setSelectedCountryCode] = useState<CountryCode | null>(null)
	//const currentCountry = clientSettings.countries.find(el => el.country === clientSettings.client.country)



	const goBack = () => {
		navigation.goBack()
	}
	const onPressSave = () => {
		if(!selectedCountryCode) return
		AuthStoreService.updateUserInfo({ country: selectedCountryCode }).then((data) => {
			if (data) {
				setIsMenuOpen(true)
			}
		})
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
						<CountriesPicker saveCountryHandler={setSelectedCountryCode}   country={clientSettings?.client?.country} />
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
})

export default ChangeCountryS
