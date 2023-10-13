import React, {useCallback, useEffect} from 'react'
import { BaseWrapperComponent } from '../../components/baseWrapperComponent'
import { observer } from 'mobx-react-lite'
import { Box } from 'native-base'
import HeaderGoBackTitle from '../../components/HeaderGoBackTitle'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { FlatList } from 'react-native'
import { LastStep, OrderType } from '../../api/Client/type'
import OrderHistoryViewer from '../../components/list-viewer/OrderHistoryViewer/OrderHistoryViewer'
import rootStore from '../../store/RootStore/root-store'
import OrdersStore from '../../store/OrdersStore/orders-store'
import { routerConstants } from '../../constants/routerConstants'
import DictionaryStore from "../../store/DictionaryStore/dictionary-store";
import {DictionaryEnum} from "../../store/DictionaryStore/type";
import {useGoBack} from "../../utils/hook/useGoBack";

type OrderHistorySProps = {
	navigation: NavigationProp<ParamListBase>
}
const OrderHistoryS = observer(({ navigation }: OrderHistorySProps) => {
	const { OrdersStoreService } = rootStore
	const {dictionary} = DictionaryStore
	const { closedOrders, orderDetail } = OrdersStore

	const goBack = () => {
		navigation.navigate(routerConstants.ORDERS)
		return true
	}
	useGoBack(goBack)
	const onPressDetails = useCallback((id) => {
		OrdersStoreService.getOrderReportDetail(id)
		navigation.navigate(routerConstants.CLIENT_PAY, {from: 'ok'})
	}, [])
	const renderItem = useCallback( ({ item }: { item: OrderType }) => {
		return <OrderHistoryViewer dictionary={dictionary} onPressDetails={onPressDetails} order={item} />
	}, [])
	useEffect(() => {
		OrdersStoreService.getClosedOrders()
	}, [])
	return (
		<BaseWrapperComponent isKeyboardAwareScrollView={true}>
			<Box paddingX={4} mb={6} mt={3} flex={1} justifyContent={'space-between'}>
				<Box>
					<HeaderGoBackTitle title={dictionary[DictionaryEnum.OrderHistory]} goBackPress={goBack} />
				</Box>
				<Box mt={10}>
					<FlatList scrollEnabled={false} data={closedOrders} renderItem={renderItem} />
				</Box>
			</Box>
		</BaseWrapperComponent>
	)
})

export default OrderHistoryS
