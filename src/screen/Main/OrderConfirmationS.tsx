import React from 'react'
import { BaseWrapperComponent } from '../../components/baseWrapperComponent'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { Box, Image, Text } from 'native-base'
import ArrowBack from '../../components/ArrowBack'
import { observer } from 'mobx-react-lite'
import OrdersStore from '../../store/OrdersStore/orders-store'
import loadingGif from '../../assets/Gif/loadingGif.gif'

type OrderConfirmationSProps = {
	navigation: NavigationProp<ParamListBase>
}
const OrderConfirmationS = observer(({ navigation }: OrderConfirmationSProps) => {
	const { orderDetail } = OrdersStore
	const goBackPress = () => {
		navigation.goBack()
	}
	return (
		<BaseWrapperComponent>
			<Box paddingX={3}>
				<Box justifyContent={'flex-start'}>
					<ArrowBack goBackPress={goBackPress} />
				</Box>
				<Box mt={5} justifyContent={'flex-start'}>
					<Text fontSize={28} fontWeight={'600'}>Swash #{orderDetail?.id}</Text>
				</Box>
				<Box mt={10}>
					<Text fontSize={32} fontWeight={'600'}>Looking for executor</Text>
				</Box>
				<Box mt={10} alignItems={'center'}>
					<Image alt={'logo'} source={loadingGif} />
				</Box>
			</Box>
		</BaseWrapperComponent>
	)
})

export default OrderConfirmationS
