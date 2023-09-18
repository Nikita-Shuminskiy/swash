import React, { useEffect } from 'react'
import { BaseWrapperComponent } from '../../../components/baseWrapperComponent'
import { observer } from 'mobx-react-lite'
import rootStore from '../../../store/RootStore/root-store'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import HeaderGoBackTitle from '../../../components/HeaderGoBackTitle'
import { Box } from 'native-base'

type ChatSProps = {
	navigation: NavigationProp<ParamListBase>
}
const ChatS = observer(({ navigation }: ChatSProps) => {
	const { ChatStore, ChatStoreService } = rootStore
	const { dialog } = ChatStore
	useEffect(() => {
		ChatStoreService.getDialog()
	}, [])
	const goBack = () => {
		navigation.goBack()
	}
	return (
		<BaseWrapperComponent isKeyboardAwareScrollView={true}>
			<Box paddingX={4} mb={6} mt={3} flex={1} justifyContent={'flex-start'}>
				<HeaderGoBackTitle title={'Support'} goBackPress={goBack} />
			</Box>
		</BaseWrapperComponent>
	)
})

export default ChatS
