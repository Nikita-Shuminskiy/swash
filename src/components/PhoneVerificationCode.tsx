import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Box, Text } from 'native-base'

import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field'
import { colors } from '../assets/colors/colors'
import { observer } from 'mobx-react-lite'
import rootStore from '../store/RootStore/root-store'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { routerConstants } from '../constants/routerConstants'
import {DictionaryType} from "../store/DictionaryStore/dictionary-store";
import {DictionaryEnum} from "../store/DictionaryStore/type";


const CELL_COUNT = 5
type PhoneVerificationProps = {
	navigation: NavigationProp<ParamListBase>
	isFromUpdate: boolean
	dictionary: DictionaryType
}
const PhoneVerificationCode = observer(({ navigation, isFromUpdate, dictionary }: PhoneVerificationProps) => {
	const [code, setCode] = useState('')
	const { AuthStoreService, AuthStore, OrdersStoreService } = rootStore
	const { clientSettings } = AuthStore

	const [isValid, setIsValid] = useState(true)
	const [statusServer, setStatusServer] = useState<'warning' | '' | 'error'>('')

	const handleCodeChange = (newCode: string) => {
		setCode(newCode)
		setStatusServer('')
		setIsValid(true)
	}
	useEffect(() => {
		if (code.trim().length === 5) {
			AuthStoreService.sendClientVerifyCode(code).then((data) => {
				if (data.status === 'warning' || data.status === 'error') {
					setStatusServer(data.status)
					setIsValid(false)
					setTimeout(() => {
						setCode('')
						setStatusServer('')
						setIsValid(true)
					}, 700)
				}
				if (data.status === 'ok') {
					if(isFromUpdate) return navigation.navigate(routerConstants.PROFILE, {from: 'open_menu'})
					if(clientSettings.client.consent_datetime) {
						return OrdersStoreService.getSettingClient(navigation.navigate)
					}
					navigation.navigate(routerConstants.TERMS_OF_USE)
				}
			})
		}
	}, [code])
	const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT })

	const [props, getCellOnLayoutHandler] = useClearByFocusCell({
		value: code,
		setValue: handleCodeChange,
	})

	return (
		<View>
			<CodeField
				ref={ref}
				{...props}
				// Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
				value={code}
				onChangeText={handleCodeChange}
				cellCount={CELL_COUNT}
				rootStyle={styles.codeFieldRoot}
				keyboardType='number-pad'
				textContentType='oneTimeCode'
				renderCell={({ index, symbol, isFocused }) => (
					<Box key={index} mr={3} style={[styles.boxCell, isFocused && styles.activeCell
						, (statusServer === 'warning' || statusServer === 'error') && styles.failedCodeBack,
					]} backgroundColor={'#F5F5F6'}
							 borderRadius={16} alignItems={'center'}
							 justifyContent={'center'}>
						<Text
							fontFamily={'semiBold'}
							style={[styles.cell, isFocused && styles.focusCell]}
							onLayout={getCellOnLayoutHandler(index)}>
							{symbol || (isFocused ? <Cursor /> : null)}
						</Text>
					</Box>
				)}
			/>
			{
				!isValid && <Text mt={2} fontFamily={'regular'} fontSize={15} color={colors.red}>{dictionary[DictionaryEnum.IncorrectConfirmationCode]}</Text>
			}

		</View>
	)
})
const styles = StyleSheet.create({
	failedCodeBack: {
		borderWidth: 1,
		borderColor: colors.red,
	},
	activeCell: {
		borderWidth: 1,
		borderColor: colors.blue,
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
export default PhoneVerificationCode
