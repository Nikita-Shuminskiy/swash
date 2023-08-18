import React, { useRef, useState } from 'react'
import { SafeAreaView, TouchableOpacity, View } from 'react-native'
import PhoneInput, { PhoneInputProps } from 'react-native-phone-number-input'
import { colors } from '../assets/colors/colors'
import { Box, FormControl, Text, WarningOutlineIcon } from 'native-base'
import { EvilIcons } from '@expo/vector-icons'

type PhoneNumberFieldProps = PhoneInputProps & {
	isRequired: boolean
	isInvalid: boolean
	errorMessage?: string
	onValidNumber?: (isValid: boolean) => void,
	onChangeTextPhone: (text: string, isValid: boolean) => void
}
const PhoneNumberField: React.FC<PhoneNumberFieldProps> = ({
																														 isRequired,
																														 onChangeTextPhone,
																														 isInvalid,
																														 onValidNumber,
																														 errorMessage,
																														 ...rest
																													 }) => {
	const phoneInput = useRef<PhoneInput>(null)
	return (
		<Box w={'100%'}>
			<FormControl isInvalid={isInvalid} isRequired={isRequired}>
				<PhoneInput
					ref={phoneInput}
					textInputProps={{
						keyboardType: 'numeric',
					}}
					containerStyle={{
						width: '100%',
						height: 56,
						backgroundColor: '#F5F5F6',
						borderRadius: 16,
						alignItems: 'center',
					}}
					textContainerStyle={{ borderRadius: 16, backgroundColor: 'transparent', height: 50 }}
					codeTextStyle={{ color: colors.black, height: 23 }}
					textInputStyle={{ color: colors.black, fontSize: 14 }}
					defaultCode={'PL'}
					placeholder={'Phone*'}
					layout='first'
					onChangeText={(text) => {
						onChangeTextPhone(text, phoneInput.current?.isValidNumber(text))
					}}
					{...rest}
				/>
				<FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size='xs' />}>
					{errorMessage ? errorMessage : 'Field is required'}
				</FormControl.ErrorMessage>
			</FormControl>
		</Box>
	)
}

export default PhoneNumberField
