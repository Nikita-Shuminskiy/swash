import React, { ReactNode } from 'react'
import { ImageSourcePropType, StyleProp, TouchableOpacity } from 'react-native'
import { Box, Text } from 'native-base'
import { colors } from '../assets/colors/colors'

type ButtonProps = {
	onPress: () => void
	title?: string
	styleContainer?: StyleProp<any>
	styleText?: StyleProp<any>
	disabled?: boolean
	backgroundColor?: string
	colorText?: string
	children?: ReactNode
}
const Button = ({
									onPress,
									title,
									styleContainer,
									disabled,
									styleText,
									backgroundColor,
									children,
									colorText,
									...rest
								}: ButtonProps) => {
	return (
		<TouchableOpacity
			style={{
				backgroundColor: backgroundColor ?? colors.white,
				padding: 10,
				borderRadius: 16,
				alignItems: 'center',
				justifyContent: 'center',
				minHeight: 54,
				...styleContainer,
			}}
			disabled={disabled}
			onPress={!disabled ? onPress : null}
			{...rest}
		>
			{
				children ? children : <Box flexDirection={'row'} alignItems={'center'}>
					<Text
						color={colorText}
						style={{
							fontSize: 15,
							fontWeight: '600',
							...styleText,
						}}
					>
						{title}
					</Text>
				</Box>
			}

		</TouchableOpacity>
	)
}
export default Button
