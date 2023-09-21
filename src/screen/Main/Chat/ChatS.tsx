import React, { useEffect, useRef, useState } from 'react'
import { BaseWrapperComponent } from '../../../components/baseWrapperComponent'
import { observer } from 'mobx-react-lite'
import rootStore from '../../../store/RootStore/root-store'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import HeaderGoBackTitle from '../../../components/HeaderGoBackTitle'
import { Box } from 'native-base'
import { BackHandler, FlatList, ScrollView } from 'react-native'
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
	const { dialog, setDialog } = ChatStore
	const flatListRef = useRef<any>()
	const [isAtBottom, setIsAtBottom] = useState(false)
	const handleScroll = (event: any) => {
		const offsetY = event.nativeEvent.contentOffset.y
		const contentHeight = event.nativeEvent.contentSize.height
		const screenHeight = event.nativeEvent.layoutMeasurement.height

		if (contentHeight - offsetY <= screenHeight + 200) {
			setIsAtBottom(true)
		} else {
			setIsAtBottom(false)
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
			setDialog([])
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
		<BaseWrapperComponent>
			<Box paddingX={4} mt={2} mb={2}>
				<HeaderGoBackTitle title={'Support'} goBackPress={goBack} />
			</Box>
			<ScrollView onScroll={handleScroll} ref={flatListRef}>
				<Box paddingX={4} mb={6} flex={1}>
					<Box mt={4}>
						{
							!!dialog?.length &&
							dialog.map((message, key) => {
								return <Box key={key}>
									{renderItem({ item: message })}
								</Box>
							})
						}
					</Box>
				</Box>

			</ScrollView>
			{!isAtBottom && (
				<Box position={'absolute'} bottom={'15%'} right={5}>
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
