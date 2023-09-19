import React, { useState } from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { Box, Text } from 'native-base'
import { colors } from '../assets/colors/colors'
import { Country, CountryCode } from 'react-native-country-picker-modal/lib/types'
import CountryPicker from 'react-native-country-picker-modal'
import arrow from '../assets/Images/arrow-bottom.png'
import { CountryType } from '../api/Client/type'
import BaseBottomPopUp from './pop-up/BaseBottomPopUp'
import CountriesPopUp from './pop-up/CountriesPopUp'
import CountryFlag from 'react-native-country-flag'

type CountriesPickerProps = {
	selectedCountry: CountryType
	openCountriesPopUp: (value: boolean) => void
}

const CountriesPicker = ({ selectedCountry, openCountriesPopUp }: CountriesPickerProps) => {

	return (
		<>
			<Box>
				<TouchableOpacity style={{ width: '100%' }} onPress={() => openCountriesPopUp(true)}>
					<Box style={{ height: 56 }} borderWidth={1} w={'100%'} borderRadius={16} borderColor={colors.grayBright}
							 flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
						<Box flexDirection={'row'} alignItems={'center'} justifyContent={'center'}>
							<Box ml={2} mr={1}>
								<CountryFlag isoCode={selectedCountry?.country} size={18} />
							</Box>
							<Text fontSize={15} fontFamily={'regular'} mr={1}> {selectedCountry?.country}</Text>
							<Text fontSize={15}
										fontFamily={'regular'}>{`(${selectedCountry?.tel_prefix})`}</Text>
						</Box>
						<Image
							source={arrow}
							style={{ width: 20, height: 20, marginRight: 10 }}
						/>
					</Box>
				</TouchableOpacity>
			</Box>

		</>
	)
}

export default CountriesPicker
