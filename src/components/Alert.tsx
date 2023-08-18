import React from 'react'
import { Alert, Box, CloseIcon, Heading, HStack, IconButton, VStack } from 'native-base'
import { colors } from '../assets/colors/colors'
import NotificationStore from '../store/NotificationStore/notification-store'
import { TouchableHighlight, TouchableOpacity } from 'react-native'

type AlertProps = {
	text: string
}
const Alerts = ({ text }: AlertProps) => {
	const { setServerErrorText } = NotificationStore
	const onPressClose = () => {
		setServerErrorText(undefined)
	}
	return <Alert position={'absolute'} top={20}
								left={5}
								shadow={2} zIndex={10}
								borderRadius={16}
								style={{ backgroundColor: '#FF3F3F' }}
								w='90%'>
		<VStack space={1} flexShrink={1} w='90%'>
			<HStack flexShrink={1} space={2} alignItems='center' justifyContent='space-between'>
				<HStack space={2} flexShrink={1} alignItems='center'>
					<Alert.Icon color={colors.white} />
					<Heading fontSize='md' fontWeight='medium' color={colors.white}>
						Service auth error
					</Heading>
				</HStack>
				<IconButton onPress={onPressClose} variant='unstyled' icon={<CloseIcon size='4' color={colors.white} />} />
			</HStack>
			<Box pl='6' _text={{
				color: colors.white,
			}}>
				{text}
			</Box>
		</VStack>
	</Alert>
}

export default Alerts
