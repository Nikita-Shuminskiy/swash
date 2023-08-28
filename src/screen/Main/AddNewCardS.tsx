import React, { useState } from 'react'
import { BaseWrapperComponent } from '../../components/baseWrapperComponent'
import ArrowBack from '../../components/ArrowBack'
import { Box, Text } from 'native-base'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { colors } from '../../assets/colors/colors'
import InputCustom from '../../components/TextInput'
import { View } from 'react-native'
import { Input } from 'native-base'
import Button from '../../components/Button'

type AddNewCartSProps = {
	navigation: NavigationProp<ParamListBase>
}
const AddNewCardS = ({ navigation }: AddNewCartSProps) => {
	const [cardNumber, setCardNumber] = useState('')
	const [expiry, setExpiry] = useState('')
	const [cvv, setCvv] = useState('')

	const handleCardNumberChange = (value) => {
		setCardNumber(value)
	}

	const handleExpiryChange = (value) => {
		let newValue = value

		// Remove any non-digit characters
		newValue = newValue.replace(/\D/g, '')

		if (newValue.length <= 4) {
			if (newValue.length >= 2) {
				// Add a slash after the first two digits
				newValue = newValue.slice(0, 2) + '/' + newValue.slice(2)
			}

			// Update the state with the formatted value
			setExpiry(newValue)
		}
	}
	const handleCvvChange = (value) => {
		// Add a slash after the second digit
		if (value.length <= 3) {
			setCvv(value)
		}
	}
	const goBackPress = () => {
		navigation.goBack()
	}
	const saveNewCard = () => {

	}
	return (
		<BaseWrapperComponent>
			<Box paddingX={5}>
				<Box flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
					<Box position={'relative'} bottom={1}>
						<ArrowBack goBackPress={goBackPress} />
					</Box>
					<Box>
						<Text fontSize={22} fontWeight={'600'}>Add new card</Text>
					</Box>
					<Box/>
				</Box>

				<Box mt={10} borderWidth={1} borderColor={colors.grayBright} borderRadius={16} padding={5}>
					<InputCustom
						borderRadius={12}
						borderColor={colors.grayBright}
						placeholder={'Card number'}
						label={'Card Number'}
						value={cardNumber}
						placeholderTextColor={'#B0BAC1'}
						onChangeText={handleCardNumberChange}
						keyboardType='numeric'
						maxLength={19}
					/>

					<Box flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
						<Box maxW={152} w={'100%'}>
							<InputCustom
								placeholder={'MM / YY'}
								borderRadius={12}
								borderColor={colors.grayBright}
								label={'Expiry'}
								value={expiry}
								placeholderTextColor={'#B0BAC1'}
								onChangeText={handleExpiryChange}
								keyboardType='numeric'
								maxLength={5}
							/>
						</Box>
						<Box maxW={122} w={'100%'}>
							<InputCustom
								placeholderTextColor={'#B0BAC1'}
								placeholder={'CVV / CVC'}
								borderRadius={12}
								borderColor={colors.grayBright}
								label={'CVV/CVC'}
								value={cvv}
								onChangeText={handleCvvChange}
								keyboardType='numeric'
								maxLength={3}
							/>
						</Box>
					</Box>
				</Box>
				<Box mt={10} alignItems={'center'}>
					<Button styleContainer={{ maxWidth: 280 }} backgroundColor={'#99D4FF'} colorText={colors.white}
									onPress={saveNewCard} title={'Add new card'} />
				</Box>
			</Box>
		</BaseWrapperComponent>
	)
}

export default AddNewCardS
