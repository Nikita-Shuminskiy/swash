import React from 'react'
import { BaseWrapperComponent } from '../../../components/baseWrapperComponent'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import BurgerMenuImg from '../../../components/burgerMenuImg'
import { observer } from 'mobx-react-lite'
import OrdersStore from '../../../store/OrdersStore/orders-store'
import { FlatList } from 'react-native'
import { Box, Image, Text } from 'native-base'
import { LastStep, OrderType } from '../../../api/Client/type'
import OrderViewer from '../../../components/list-viewer/OrderViewer/OrderViewer'
import Button from '../../../components/Button'
import { colors } from '../../../assets/colors/colors'
import addCircleImage from '../../../assets/Images/plus-circle-white.png'
import { routerConstants } from '../../../constants/routerConstants'
import rootStore from '../../../store/RootStore/root-store'
import AlertFeedBack from '../../../components/AlertFeedBack'

type OrdersSProps = {
	navigation: NavigationProp<ParamListBase>
}
const OrdersS = observer(({ navigation }: OrdersSProps) => {
	const { orders } = OrdersStore

	const { OrdersStoreService } = rootStore
	const renderItem = ({ item }: { item: OrderType }) => {
		const onPressDetails = () => {
			OrdersStoreService.getOrderReportDetail(item.id)
			switch (item.last_step) {
				case LastStep.client_must_get: {
					return navigation.navigate(routerConstants.EXECUTOR_MAP, {from: 'get'})
				}
				case LastStep.executor_perfomed: {
					return navigation.navigate(routerConstants.EXECUTOR_MAP, {from: 'takeIt'})
				}
				case LastStep.client_received: {
					return navigation.navigate(routerConstants.CLIENT_RECEIVED)
				}
				case LastStep.auction_open: {
					return navigation.navigate(routerConstants.ORDER_CONFIRMATION, {from: 'action_open'})
				}
				case LastStep.executor_confirm_client_must_pay: {
					return navigation.navigate(routerConstants.CLIENT_PAY, {from: 'client_must_pay'})
				}
			}

		}
		if(item.last_step === LastStep.admin_closed_order || item.last_step === LastStep.client_confirm) return
		return <OrderViewer onPressDetails={onPressDetails} order={item} />
	}
	const onPressSwash = () => {

	}
/*	useEffect(() => {
		navigation.navigate(routerConstants.NAVIGATION_TO_CHECKPOINT)
	}, [])*/
	return (
		<BaseWrapperComponent isKeyboardAwareScrollView={true}>
			<Box style={{ paddingHorizontal: 16 }}>
				<BurgerMenuImg />
				<Box mt={4}>
					<FlatList scrollEnabled={false} data={orders} renderItem={renderItem} />
				</Box>
				<Box mt={2} mb={5} alignItems={'center'}>
					<Button backgroundColor={colors.blue} colorText={colors.white}
									styleContainer={{
										borderRadius: 28,
										maxWidth: 280,
										width: '100%',
									}} onPress={onPressSwash} title={'Swash'} >
					<Box flexDirection={'row'} alignItems={'center'}>
						<Image style={{ width: 24, height: 24 }} source={addCircleImage} alt={'arrow'} />
						<Text fontSize={15} ml={1} fontFamily={'semiBold'} color={colors.white}>Swash</Text>
					</Box>
					</Button>
				</Box>
			</Box>
			<AlertFeedBack />
		</BaseWrapperComponent>
	)
})

export default OrdersS
