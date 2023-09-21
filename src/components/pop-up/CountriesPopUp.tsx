import React from 'react'
import ModalPopup from '../pop-up'
import { Box, Image, Text } from 'native-base'
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import closeImage from '../../assets/Images/order/closeCircleGray.png'
import { colors } from '../../assets/colors/colors'
import { CountryType } from '../../api/Client/type'
import { CountryCode } from 'react-native-country-picker-modal/lib/types'
import CountryFlag from 'react-native-country-flag'

type PopUpCanselSwashProps = {
	visible: boolean
	text: string
	onClose: () => void
	currentCountry: CountryCode
	saveCountry: (country: CountryType) => void
	countries: CountryType[];
}
const CountriesPopUp = ({ visible, onClose, text, countries, saveCountry, currentCountry }: PopUpCanselSwashProps) => {
	return (
		<ModalPopup modalHeight={Math.round(Dimensions.get('window').height * 0.3)} style={{}} visible={visible}
								onClose={onClose}>
			<Box>
				<Box flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
					<Text fontSize={22} fontFamily={'semiBold'}>{text}</Text>
					<TouchableOpacity onPress={onClose}>
						<Image alt={'close-img'} source={closeImage} />
					</TouchableOpacity>
				</Box>
				<Box mt={2}>
					{
						countries.map((country) => {
							return <TouchableOpacity onPress={() => {
								saveCountry(country)
								onClose()
							}} key={country.country}>
								<Box borderWidth={1} flexDirection={'row'}
										 alignItems={'center'}
										 borderColor={currentCountry === country.country ? colors.blue : colors.grayLight} p={4}
										 borderRadius={16}
										 mb={2}>
									<Box mr={1}>
										<CountryFlag isoCode={country.country} size={18} />
									</Box>
									<Text mr={1}>{country.country}</Text>
									<Text>({country.tel_prefix}){' '}</Text>

								</Box>
							</TouchableOpacity>
						})
					}
				</Box>
			</Box>
		</ModalPopup>
	)
}
const styles = StyleSheet.create({
	styleContainerBtn: {
		maxWidth: 168,
		minWidth: 0,
		height: 56,
		borderRadius: 28,
	},
	btnYes: {
		borderWidth: 1,
		borderColor: colors.blue,
	},
})
export default CountriesPopUp
