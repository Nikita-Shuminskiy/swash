import React from 'react'
import { BaseWrapperComponent } from '../../components/baseWrapperComponent'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import GeneralHeader from '../../components/GeneralHeader'
import { observer } from 'mobx-react-lite'
import OrdersStore from '../../store/OrdersStore/orders-store'
import { Box, Text } from 'native-base'
import inProgressImg from '../../assets/Images/Executor/InProgress.png'
import contractorSentImg from '../../assets/Images/Executor/ContractorSent.png'
import contractorGotImg from '../../assets/Images/Executor/ContractorGot.png'
import onTheWayImg from '../../assets/Images/Executor/OnTheWay.png'
import { Image } from 'react-native'
import { colors } from '../../assets/colors/colors'
import locationImg from '../../assets/Images/locationBlue.png'
const STATUS_DATA = {
	'3': {
		img: inProgressImg,
		text: 'Swash in progress',
	},
	'4': {
		img: contractorSentImg,
		text: 'Contractor sent the\npackage',
	},
	'2': {
		img: contractorGotImg,
		text: 'Contractor got the\npackage',
	},
	'1': {
		img: onTheWayImg,
		text: 'On the way\nto the contractor',
	},
}
type ExecutorStatusSPorps = {
	navigation: NavigationProp<ParamListBase>
	route: any
}
const ExecutorStatusS = observer(({ navigation, route }: ExecutorStatusSPorps) => {
	const { orderDetail } = OrdersStore

	const statusData = STATUS_DATA[route.params.from]
	return (
		<BaseWrapperComponent>
			<Box paddingX={4}>
				<GeneralHeader navigation={navigation} orders_id={orderDetail.orders_id} />
				<Box mt={6} mb={12} alignItems={'center'}>
					<Text fontSize={32} textAlign={'center'} fontFamily={'semiBold'}>{statusData.text}</Text>
					<Box mt={6}>
						<Image style={{ width: 244, height: 244 }} source={statusData.img} />
					</Box>
				</Box>
				<Box borderRadius={16} mb={3} p={3} alignItems={'flex-start'} backgroundColor={'#E8F5FE'}>
					<Text fontSize={15} fontFamily={'semiBold'}>Estimated time of arrival</Text>
					<Text fontSize={15} fontFamily={'regular'}>12 august, 17:00</Text>
				</Box>
				<Box borderRadius={16} mb={3} p={3} alignItems={'flex-start'} backgroundColor={'#E8F5FE'}>
					<Text fontSize={15} fontFamily={'semiBold'}>Paczkomat</Text>
					<Text flexDirection={'row'} alignItems={'center'} fontSize={15} fontFamily={'regular'} color={colors.blue}>
						<Image style={{ width: 20, height: 20, marginRight: 4 }} source={locationImg} />
						GDA64, Gdańsk, Pszenna, 1
					</Text>
				</Box>
			</Box>
		</BaseWrapperComponent>
	)
})

export default ExecutorStatusS
