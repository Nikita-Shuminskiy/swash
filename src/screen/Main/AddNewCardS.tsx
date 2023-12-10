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
import DictionaryStore from "../../store/DictionaryStore/dictionary-store";
import {observer} from "mobx-react-lite";
import {DictionaryEnum} from "../../store/DictionaryStore/type";
import {routerConstants} from "../../constants/routerConstants";
import {useGoBack} from "../../utils/hook/useGoBack";

type AddNewCartSProps = {
	navigation: NavigationProp<ParamListBase>
}
const AddNewCardS = observer(({ navigation }: AddNewCartSProps) => {
	const {dictionary} = DictionaryStore
	const [cardNumber, setCardNumber] = useState('')
	const [expiry, setExpiry] = useState('')
	const [cvv, setCvv] = useState('')
	const isDisabledBtn = !cardNumber || !expiry || !cvv
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
	const goBack = () => {
		navigation.navigate(routerConstants.ORDERS)
		return true
	}
	useGoBack(goBack)
	const saveNewCard = () => {
		if (isDisabledBtn) return
	}
	return (
		<BaseWrapperComponent>
			<Box paddingX={5}>
				<Box flexDirection={'row'} alignItems={'center'} justifyContent={'center'}>
					<Box flex={1} position={'relative'} bottom={1}>
						<ArrowBack goBackPress={goBack} />
					</Box>
					<Box flex={2} alignItems={'center'} >
						<Text fontSize={22} fontFamily={'semiBold'}>{dictionary[DictionaryEnum.AddNewCard]}</Text>
					</Box>
					<Box flex={1} />
				</Box>

				<Box mt={10} borderWidth={1} borderColor={colors.grayBright} borderRadius={16} padding={5}>
					<InputCustom
						borderRadius={12}
						borderColor={colors.grayBright}
						placeholder={dictionary[DictionaryEnum.CardNumber]}
						label={dictionary[DictionaryEnum.CardNumber]}
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
								label={dictionary[DictionaryEnum.Expiry]}
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
				<Box mt={10} flex={1} w={'100%'} alignItems={'center'}>
					<Button styleContainer={{ maxWidth: 280, width: '100%', borderRadius: 28 }}
							backgroundColor={isDisabledBtn ? colors.bluePale : colors.blue}
							colorText={colors.white}
							onPress={saveNewCard} title={dictionary[DictionaryEnum.AddNewCard]} />
				</Box>
			</Box>
		</BaseWrapperComponent>
	)
})

export default AddNewCardS
