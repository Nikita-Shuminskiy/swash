import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Box, Button, Text } from 'native-base'

import {
	CodeField,
	Cursor,
	useBlurOnFulfill,
	useClearByFocusCell,
} from 'react-native-confirmation-code-field'
import { colors } from '../assets/colors/colors'


const CELL_COUNT = 4
const PhoneVerification = () => {
	const [code, setCode] = useState('123')
	const [isValid, setIsValid] = useState(true)

	const handleCodeChange = (newCode) => {
		setCode(newCode)
	}

	const handleVerifyCode = () => {
		// Здесь вы можете выполнить проверку введенного кода
		setIsValid(false)
		console.log('Введенный код:', code)
	}
	const [value, setValue] = useState('')
	const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT })
	const [props, getCellOnLayoutHandler] = useClearByFocusCell({
		value,
		setValue,
	})


	return (
		<View>
			<CodeField
				ref={ref}
				{...props}
				// Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
				value={value}
				onChangeText={setValue}
				cellCount={CELL_COUNT}
				rootStyle={styles.codeFieldRoot}
				keyboardType='number-pad'
				textContentType='oneTimeCode'
				renderCell={({ index, symbol, isFocused }) => (
					<Box mr={3}  style={[styles.boxCell, isFocused && styles.activeCell]} backgroundColor={'#F5F5F6'} borderRadius={16} alignItems={'center'}
							 justifyContent={'center'}>
						<Text
							key={index}
							style={[styles.cell, isFocused && styles.focusCell]}
							onLayout={getCellOnLayoutHandler(index)}>
							{symbol || (isFocused ? <Cursor /> : null)}
						</Text>
					</Box>
				)}
			/>
			{
				!isValid && 	<Text mt={2} fontSize={15} color={colors.red}>Incorrect confirmation code</Text>
			}

		</View>
	)
}
const styles = StyleSheet.create({
	activeCell: {
		borderWidth: 1,
		borderColor: colors.blue
	},
	boxCell: { width: 56, height: 64 },
	root: { flex: 1, padding: 10 },
	title: { textAlign: 'center', fontSize: 22 },
	codeFieldRoot: { justifyContent: 'flex-start' },
	cell: {
		color: colors.black,
		lineHeight: 38,
		fontSize: 22,
		textAlign: 'center',
	},
	focusCell: {
		borderColor: '#000',
	},
})
export default PhoneVerification
