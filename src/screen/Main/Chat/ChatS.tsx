import React, { useEffect, useRef } from 'react'
import { BaseWrapperComponent } from '../../../components/baseWrapperComponent'
import { observer } from 'mobx-react-lite'
import rootStore from '../../../store/RootStore/root-store'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import HeaderGoBackTitle from '../../../components/HeaderGoBackTitle'
import { Box } from 'native-base'
import { FlatList } from 'react-native'
import MessageViewer from '../../../components/list-viewer/MessageViewer/MessageViewer'
import { DialogType } from '../../../api/ChatApi/type'
import Footer from './Footer'

type ChatSProps = {
	navigation: NavigationProp<ParamListBase>
}
const ChatS = observer(({ navigation }: ChatSProps) => {
	const { ChatStore, ChatStoreService } = rootStore
	const { dialog } = ChatStore
	const flatListRef = useRef<any>();
	const scrollToBottom = () => {
		if(flatListRef?.current) {
			flatListRef.current?.scrollToEnd({animated: true});
		}
	}
	useEffect(() => {
		ChatStoreService.getDialog()
		const id = +setTimeout(() => {
			ChatStoreService.getDialog().then((data) => {
				if(data) {
					scrollToBottom()
				}
			})
		}, 5000)
		return () => {
			console.log(1)
			clearInterval(id)
		}
	}, [])
	const goBack = () => {
		navigation.goBack()
	}
	const renderItem = ({ item }: { item: DialogType }) => {
		return <MessageViewer message={item} />
	}

	return (
		<BaseWrapperComponent isKeyboardAwareScrollView={false}>
			<Box paddingX={4} mb={6} mt={3} flex={1}>
				<HeaderGoBackTitle title={'Support'} goBackPress={goBack} />
				<Box mt={4}>
					<FlatList ref={flatListRef} data={dialog} showsVerticalScrollIndicator={false} renderItem={renderItem} scrollEnabled={true} />
				</Box>
			</Box>
			<Box mb={2}>
				<Footer scrollToBottomHandler={() => scrollToBottom()} />
			</Box>
		</BaseWrapperComponent>
	)
})

export default ChatS
