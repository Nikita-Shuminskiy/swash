import React, { forwardRef, useState } from 'react'
import { Box, FormControl, Input, WarningOutlineIcon, Text } from 'native-base'
import { StyleProp, TextStyle, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { InterfaceInputProps } from 'native-base/lib/typescript/components/primitives/Input/types'
import { colors } from '../assets/colors/colors'

type InputCustomProps = {
	label?: string
	errorMessage?: string
	error?: boolean
	textErrorStyles?: StyleProp<TextStyle>
	iconRight?: JSX.Element,
	iconLeft?: JSX.Element,
	onClearText?: () => void
	mt?: number
	heightInput?: number
} & InterfaceInputProps
const InputCustom = forwardRef(({
																	label,
																	onChangeText,
																	placeholder,
																	errorMessage,
																	error,
																	textErrorStyles,
																	keyboardType,
																	onBlur,
																	style,
																	value,
																	isRequired,
																	isInvalid,
																	type = 'text',
																	iconRight,
																	iconLeft,
																	heightInput = 10,
																	mt = 2,
																	...rest
																}: InputCustomProps, ref) => {
	const [showPassword, setShowPassword] = useState(false)
	return (
		<Box mt={mt} width={'100%'}>
			<FormControl isInvalid={isInvalid} isRequired={isRequired}>
				{label && <FormControl.Label ml={1}>
					<Text fontFamily={'regular'} fontSize={13}>{label}</Text>
				</FormControl.Label>}
				<Input
					ref={ref}
					value={value}
					style={[{ fontSize: 15, fontFamily: 'regular' }, style]}
					borderColor={colors.grayBright}
					keyboardType={keyboardType}
					onBlur={onBlur}
					onChangeText={onChangeText}
					placeholder={placeholder}
					h={heightInput}
					mt={1}
					InputRightElement={
						type === 'text' ? (
							<Box mr={2}>{iconRight}</Box>
						) : (
							<TouchableOpacity
								style={{ marginRight: 10 }}
								onPress={() => setShowPassword(!showPassword)}
							>
								<Feather name={!showPassword ? 'eye' : 'eye-off'} size={24} color={colors.gray} />
							</TouchableOpacity>
						)
					}
					InputLeftElement={<Box mr={2}>{iconLeft}</Box>}
					type={type === 'text' ? 'text' : showPassword ? 'text' : 'password'}
					{...rest}
				/>
				<FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size='xs' />}>
					{errorMessage ? errorMessage : 'Field is required'}
				</FormControl.ErrorMessage>
			</FormControl>
		</Box>
	)
})

export default InputCustom
