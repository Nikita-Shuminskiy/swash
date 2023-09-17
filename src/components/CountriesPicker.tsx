import React, { useState } from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { Box, Text } from 'native-base'
import { colors } from '../assets/colors/colors'
import { Country, CountryCode } from 'react-native-country-picker-modal/lib/types'
import CountryPicker from 'react-native-country-picker-modal'
import arrow from '../assets/Images/arrow-bottom.png'

type CountriesPickerProps = {
	saveCountryHandler: (country: CountryCode) => void
	country: CountryCode
}
const defCountry: Country = {
	callingCode: ['48'],
	cca2: 'PL',
	currency: ['PLN'],
	flag: 'flag-pl',
	name: 'Poland',
	region: 'Europe',
	subregion: 'Eastern Europe',
}
const CountriesPicker = ({saveCountryHandler, country}: CountriesPickerProps) => {

	const [isCountryPickerVisible, setIsCountryPickerVisible] = useState(false)
	const [selectedCountry, setSelectedCountry] = useState<Country>(defCountry)

	const showDatePicker = () => {
		setIsCountryPickerVisible(true)
	}

	const hideDatePicker = () => {
		setIsCountryPickerVisible(false)
	}

	const handleCountryChange = (country: Country) => {
		setSelectedCountry(country)
		saveCountryHandler(country.cca2)
	}
	return (
		<Box>
			<TouchableOpacity style={{ width: '100%' }} onPress={showDatePicker}>
				<Box style={{ height: 56 }} borderWidth={1} w={'100%'} borderRadius={16} borderColor={colors.grayBright}
						 flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
					<Box flexDirection={'row'} alignItems={'center'} justifyContent={'center'}>
						<Box ml={2}>
							<CountryPicker
								visible={isCountryPickerVisible}
								onClose={hideDatePicker}
								onSelect={handleCountryChange}
								countryCode={selectedCountry.cca2 ?? country} />
						</Box>
						<Text fontSize={15}
									fontFamily={'regular'}>{`(+${selectedCountry.callingCode[0]})` || 'Select Country'}</Text>
						{selectedCountry.name &&
							<Text fontSize={15} fontFamily={'regular'}> {selectedCountry.name as string}</Text>}
					</Box>
					<Image
						source={arrow}
						style={{ width: 20, height: 20, marginRight: 10 }}
					/>
				</Box>
			</TouchableOpacity>


		</Box>
	)
}

export default CountriesPicker
