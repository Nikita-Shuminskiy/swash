import React, { useEffect } from 'react'
import { BaseWrapperComponent } from '../../../components/baseWrapperComponent'
import { observer } from 'mobx-react-lite'
import rootStore from '../../../store/RootStore/root-store'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import HeaderGoBackTitle from '../../../components/HeaderGoBackTitle'
import { Box } from 'native-base'
import { FlatList } from 'react-native'
import MessageViewer from '../../../components/list-viewer/MessageViewer/MessageViewer'

type ChatSProps = {
	navigation: NavigationProp<ParamListBase>
}
const ChatS = observer(({ navigation }: ChatSProps) => {
	const { ChatStore, ChatStoreService } = rootStore
	const { dialog } = ChatStore
	/*	useEffect(() => {
			ChatStoreService.getDialog()
		}, [])*/
	const goBack = () => {
		navigation.goBack()
	}
	const renderItem = ({ item }: { item: any }) => {

		return <MessageViewer message={item}/>
	}
	return (
		<BaseWrapperComponent isKeyboardAwareScrollView={true}>
			<Box paddingX={4} mb={6} mt={3} flex={1} justifyContent={'flex-start'}>
				<HeaderGoBackTitle title={'Support'} goBackPress={goBack} />
				<Box mt={4}>
					<FlatList data={[1]} renderItem={renderItem} scrollEnabled={false} />
				</Box>
			</Box>
		</BaseWrapperComponent>
	)
})

export default ChatS
