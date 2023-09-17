import React, { useEffect } from 'react'
import { BaseWrapperComponent } from '../../components/baseWrapperComponent'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { Box, Image, Text } from 'native-base'
import ArrowBack from '../../components/ArrowBack'
import { observer } from 'mobx-react-lite'
import OrdersStore from '../../store/OrdersStore/orders-store'
import loadingGif from '../../assets/Gif/loadingGif.gif'
import rootStore from '../../store/RootStore/root-store'
import { routerConstants } from '../../constants/routerConstants'
import { BackHandler } from 'react-native'

type OrderConfirmationSProps = {
	navigation: NavigationProp<ParamListBase>
	route: any
}
const OrderConfirmationS = observer(({ navigation, route }: OrderConfirmationSProps) => {
	const isFromSendOrder = route.params?.from === 'send_order'
	const { OrdersStoreService } = rootStore
	const { orderDetail } = OrdersStore
	const goBackPress = () => {
		if (isFromSendOrder) {
			OrdersStoreService.getSettingClient(navigation.navigate)
		} else {
			navigation.navigate(routerConstants.ORDERS)
		}
		return true
	}

	useEffect(() => {
		BackHandler.addEventListener('hardwareBackPress', goBackPress)

		return () => {
			BackHandler.removeEventListener('hardwareBackPress', goBackPress)
		}
	}, [])
	return (
		<BaseWrapperComponent>
			<Box paddingX={3}>
				<Box justifyContent={'flex-start'}>
					<ArrowBack goBackPress={goBackPress} />
				</Box>
				<Box mt={5} justifyContent={'flex-start'}>
					<Text fontSize={28} fontFamily={'semiBold'}>Swash #{orderDetail?.orders_id}</Text>
				</Box>
				<Box mt={10}>
					<Text fontSize={32} fontFamily={'semiBold'}>Looking for executor</Text>
				</Box>
				<Box mt={10} alignItems={'center'}>
					<Image alt={'logo'} source={loadingGif} />
				</Box>
			</Box>
		</BaseWrapperComponent>
	)
})

export default OrderConfirmationS
