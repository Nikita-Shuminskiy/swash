import React, { useEffect, useRef, useState } from 'react'
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
import arrowBottomImg from '../../../assets/Images/Chat/arrowBottomBackground.png'
import Link from '../../../components/Link'

type ChatSProps = {
	navigation: NavigationProp<ParamListBase>
}
const ChatS = observer(({ navigation }: ChatSProps) => {
	const { ChatStore, ChatStoreService } = rootStore
	const { dialog } = ChatStore
	const flatListRef = useRef<any>()
	const [isAtBottom, setIsAtBottom] = useState(false);
	const handleScroll = (event: any) => {
		const offsetY = event.nativeEvent.contentOffset.y;
		const contentHeight = event.nativeEvent.contentSize.height;
		const screenHeight = event.nativeEvent.layoutMeasurement.height;

		// Если текущая позиция находится вблизи нижней части списка, устанавливаем isAtBottom в true
		if (contentHeight - offsetY <= screenHeight + 200) {
			setIsAtBottom(true);
		} else {
			setIsAtBottom(false);
		}
	}
	const scrollToBottom = () => {
		if (flatListRef?.current) {
			flatListRef.current?.scrollToEnd({ animated: true })
		}
	}
	useEffect(() => {
		ChatStoreService.getDialog(true)
		const id = +setInterval(() => {
			ChatStoreService.getDialog()
		}, 10000)
		return () => {
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
					<FlatList ref={flatListRef}
										data={dialog}
										onScroll={handleScroll}
										showsVerticalScrollIndicator={false}
										renderItem={renderItem}
										scrollEnabled={true} />
				</Box>
			</Box>
			{!isAtBottom && (
				<Box position={'absolute'} bottom={20} right={5}>
					<Link onPress={scrollToBottom} img={arrowBottomImg} styleImg={{ width: 42, height: 42 }} />
				</Box>
			)}
			<Box mb={2}>
				<Footer scrollToBottomHandler={() => scrollToBottom()} />
			</Box>
		</BaseWrapperComponent>
	)
})

export default ChatS
