import React from 'react'
import { BaseWrapperComponent } from '../../../components/baseWrapperComponent'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import BurgerMenuImg from '../../../components/burgerMenuImg'
import { observer } from 'mobx-react-lite'
import OrdersStore from '../../../store/OrdersStore/orders-store'
import { FlatList } from 'react-native'
import { Box } from 'native-base'
import { OrderType } from '../../../api/Client/type'

type OrdersSProps = {
	navigation: NavigationProp<ParamListBase>
}
const OrdersS = observer(({ navigation }: OrdersSProps) => {
	const { orders } = OrdersStore
	const renderItem = ({ item }: { item: OrderType }) => {

	}
	return (
		<BaseWrapperComponent isKeyboardAwareScrollView={true}>
			<BurgerMenuImg />
			<Box>
				<FlatList scrollEnabled={false} data={orders} renderItem={renderItem} />
			</Box>
		</BaseWrapperComponent>
	)
})

export default OrdersS
