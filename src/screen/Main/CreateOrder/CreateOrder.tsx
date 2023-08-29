import React, { useState } from 'react'
import { BaseWrapperComponent } from '../../../components/baseWrapperComponent'
import { Box, Text } from 'native-base'
import Button from '../../../components/Button'
import { colors } from '../../../assets/colors/colors'
import { FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native'
import PaymentMethodPopUp from '../../../components/pop-up/PaymentMethod/PaymentMethodPopUp'
import arrowBlue from '../../../assets/Images/order/arrowRightBlue.png'
import { observer } from 'mobx-react-lite'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import OrdersStore from '../../../store/OrdersStore/orders-store'
import rootStore from '../../../store/RootStore/root-store'
import AddPhotoComponent from '../../../components/AddPhotoComponent'
import PopUpCanselSwash from '../../../components/pop-up/PopUpCanselSwash'
import Footer from './Footer'
import Header from './Header'
import { routerConstants } from '../../../constants/routerConstants'
import CustomCheckbox from '../../../components/CustomCheckbox'
import { LogisticsPointType, payloadUpdOrderType } from '../../../api/Client/type'
import AuthStore from '../../../store/AuthStore/auth-store'

type CreateOrderProps = {
	navigation: NavigationProp<ParamListBase>
}
const CreateOrder = observer(({ navigation }: CreateOrderProps) => {
	const { orderDetail } = OrdersStore
	const { logisticPoints } = AuthStore
	const { OrdersStoreService } = rootStore
	const [isShowModalPayment, setIsShowModalPayment] = useState<boolean>(false)
	const [isShowPopUpCanselSwash, setIsShowPopUpCanselSwash] = useState<boolean>(false)
	const [isChecked, setIsChecked] = useState(false)


	const deleteOrder = () => {
		OrdersStoreService.deleteOrder('', orderDetail.id, navigation.navigate)
	}

	const onPressPachkomat = () => {
		setIsChecked(prevState => !prevState)
	}
	const onPressChosePaczkomat = () => {
		navigation.navigate(routerConstants.LOGISTIC_POINT)
	}
	const onPressChangePayment = () => {
		setIsShowModalPayment(prevState => !prevState)
	}
	const onSendOrder = () => {
		navigation.navigate(routerConstants.ORDER_CONFIRMATION)
		/*	OrdersStoreService.updateOrder({
				orders_id,
				units_order,
				amount,
			})*/
	}
	const onPressDeleteOrder = () => {
		setIsShowPopUpCanselSwash(true)
	}
	const updateOrder = (payload: payloadUpdOrderType) => {
		OrdersStoreService.updateOrder(payload)
	}
	const renderItem = ({ item }: { item: LogisticsPointType }) => {

		return <Box paddingY={5} mb={2} minHeight={70} backgroundColor={colors.grayBright} borderRadius={16} flexDirection={'row'}
								alignItems={'center'}
								justifyContent={'flex-start'}>
			<Box ml={4}>
				<CustomCheckbox checked={isChecked} onPress={onPressPachkomat} />
			</Box>
			<Box ml={2}>
				<Text fontSize={15}>{item.address.trim()}</Text>
			</Box>
		</Box>
	}
	return (
		<>
			<BaseWrapperComponent isKeyboardAwareScrollView={true}>
				<Box style={{ paddingHorizontal: 16 }}>
					<Header updateOrder={updateOrder} onPressDeleteOrder={onPressDeleteOrder} orderDetail={orderDetail} />
					<Box mt={2}>
						<Text fontSize={22} fontWeight={'600'}>Photo</Text>
						<AddPhotoComponent />
					</Box>
					<Box>
						<Text mb={2} fontSize={22} fontWeight={'600'}>Paczkomat</Text>

						<FlatList keyExtractor={(item, index) => index.toString()} scrollEnabled={false} data={logisticPoints} renderItem={renderItem} />
					</Box>
					<Box mt={4} alignItems={'center'}>
						<Button backgroundColor={colors.blue} styleText={styles.btnText} colorText={colors.white}
										styleContainer={styles.styleContainerBtn}
										onPress={onPressChosePaczkomat} title={'Choose new Paczkomat'} />
					</Box>
					<Box mt={3} borderBottomWidth={1} borderColor={colors.grayBright} />
					<Box mt={4}>
						<Text mb={3} fontSize={22} fontWeight={'600'}>Payment method</Text>
						<TouchableOpacity onPress={onPressChangePayment}>
							<Box paddingY={18} borderRadius={16} paddingX={5} flexDirection={'row'} alignItems={'center'}
									 justifyContent={'space-between'}
									 backgroundColor={colors.grayBright}>
								<Text fontSize={15} fontWeight={'500'}>Google Pay</Text>
								<Image source={arrowBlue} alt={'arrow'} />
							</Box>
						</TouchableOpacity>
					</Box>
					<Box mt={4}>
						<Footer isDisableBtn={true} navigate={navigation.navigate} onSave={onSendOrder} />
					</Box>
				</Box>
			</BaseWrapperComponent>
			{
				isShowPopUpCanselSwash &&
				<PopUpCanselSwash onDelete={deleteOrder} visible={isShowPopUpCanselSwash}
													onClose={() => setIsShowPopUpCanselSwash(false)} />
			}
			{
				isShowModalPayment &&
				<PaymentMethodPopUp navigation={navigation} visible={isShowModalPayment}
														onClose={() => setIsShowModalPayment(false)} />
			}

		</>
	)
})
const styles = StyleSheet.create({
	btnText: {
		fontWeight: '500',
	},
	styleContainerBtn: {
		borderRadius: 50,
		height: 56,
		maxWidth: 238,
		width: '100%'
	},
	checkBox: {
		borderRadius: 40,
	},
})
export default CreateOrder
