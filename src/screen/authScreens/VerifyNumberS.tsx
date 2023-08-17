import React from 'react'
import { BaseWrapperComponent } from '../../components/baseWrapperComponent'
import PhoneVerification from '../../components/PhoneVerification'
import { Box, Text } from 'native-base'
import { colors } from '../../assets/colors/colors'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { observer } from 'mobx-react-lite'
import AuthStore from '../../store/AuthStore/auth-store'
import TimerComponent from '../../components/TimerComponent'
import rootStore from '../../store/RootStore/root-store'
import ArrowBack from '../../components/ArrowBack'

type VerifyNumberSProps = {
	navigation: NavigationProp<ParamListBase>
}
const VerifyNumberS = observer(({ navigation }: VerifyNumberSProps) => {
	const { phone } = AuthStore
	const { AuthStoreService } = rootStore
	const onPressSendCodeAgain = () => {
		AuthStoreService.sendClientVerifyCode(phone)
	}
	const goBackPress = () => {
		navigation.goBack()
	}
	return (
		<BaseWrapperComponent isKeyboardAwareScrollView={true}>
			<Box paddingX={5} alignItems={'flex-start'}>
				<Box mb={5}>
					<ArrowBack goBackPress={goBackPress} />
				</Box>
				<Text fontSize={28} fontWeight={'700'}>Phone verification</Text>
				<Text fontSize={15} color={colors.gray}>The code was sent to <Text fontSize={15}
																																					 color={colors.blue}>+{phone}</Text></Text>
				<Box mt={10} mb={10} flex={1} w={'100%'}>
					<PhoneVerification />
				</Box>
				<TimerComponent onPressSendCodeAgain={onPressSendCodeAgain} />
			</Box>

		</BaseWrapperComponent>
	)
})

export default VerifyNumberS
