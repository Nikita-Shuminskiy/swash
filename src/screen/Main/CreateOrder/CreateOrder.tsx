import React, {useState} from 'react'
import {BaseWrapperComponent} from '../../../components/baseWrapperComponent'
import {Box, Text} from 'native-base'
import Button from '../../../components/Button'
import {colors} from '../../../assets/colors/colors'
import {FlatList, StyleSheet} from 'react-native'
import PaymentMethodPopUp from '../../../components/pop-up/PaymentMethod/PaymentMethodPopUp'
import {observer} from 'mobx-react-lite'
import {NavigationProp, ParamListBase} from '@react-navigation/native'
import OrdersStore from '../../../store/OrdersStore/orders-store'
import rootStore from '../../../store/RootStore/root-store'
import AddPhotoComponent from '../../../components/AddPhotoComponent'
import BaseBottomPopUp from '../../../components/pop-up/BaseBottomPopUp'
import Footer from './Footer'
import Header from './Header'
import {routerConstants} from '../../../constants/routerConstants'
import CustomCheckbox from '../../../components/CustomCheckbox'
import {LogisticsPointType, payloadUpdOrderType} from '../../../api/Client/type'
import AuthStore from '../../../store/AuthStore/auth-store'
import PaymentMethod from '../../../components/PaymentMethod'
import DictionaryStore from "../../../store/DictionaryStore/dictionary-store";
import {DictionaryEnum} from "../../../store/DictionaryStore/type";
import {getCurrentPositionHandler} from "../../../components/MapViews/utils";
import NotificationStore from "../../../store/NotificationStore/notification-store";
import {LoadingEnum} from "../../../store/types/types";

type CreateOrderProps = {
    navigation: NavigationProp<ParamListBase>
}
const CreateOrder = observer(({navigation}: CreateOrderProps) => {
    const {dictionary} = DictionaryStore
    const {orderDetail} = OrdersStore
    const {logisticPoints, clientSettings} = AuthStore
    const {OrdersStoreService} = rootStore
    const [isShowModalPayment, setIsShowModalPayment] = useState<boolean>(false)
    const [isShowPopUpCanselSwash, setIsShowPopUpCanselSwash] = useState<boolean>(false)

    const deleteOrder = () => {
        OrdersStoreService.deleteOrder('', orderDetail.orders_id, navigation.navigate)
    }
    const onPressChosePaczkomat = async () => {
        try {
            const data = await getCurrentPositionHandler()
            if (data) {
                navigation.navigate(routerConstants.LOGISTIC_POINT)
            }
        } finally {
        }
    }

    const onPressChangePayment = () => {
        setIsShowModalPayment(prevState => !prevState)
    }
    const onSendOrder = () => {
        OrdersStoreService.startOrder().then((data) => {
            if (data) {
                navigation.navigate(routerConstants.ORDER_CONFIRMATION, {from: 'send_order'})
            }
        })
    }
    const onPressDeleteOrder = () => {
        setIsShowPopUpCanselSwash(true)
    }
    const updateOrder = (payload: payloadUpdOrderType) => {
        OrdersStoreService.updateOrder(payload)
    }
    const renderItem = ({item}: { item: LogisticsPointType }) => {
        const chousenPaczkomat = Number(orderDetail.client_logistic_partners_points_id) === Number(item.id)
        const onPressPaczkomat = () => {
            OrdersStoreService.updateOrder({
                orders_id: orderDetail.orders_id,
                client_logistic_partners_points_id: item.id,
            })
        }
        return <Box paddingY={5} mb={2} minHeight={70} backgroundColor={colors.grayBright} borderRadius={16}
                    flexDirection={'row'}
                    alignItems={'center'}
                    justifyContent={'flex-start'}>
            <Box ml={4}>
                <CustomCheckbox checked={chousenPaczkomat} onPress={onPressPaczkomat}/>
            </Box>
            <Box ml={2}>
                <Text fontFamily={'regular'} fontSize={15}>{item?.address.trim()}</Text>
            </Box>
        </Box>
    }
    return (
        <>
            <BaseWrapperComponent isKeyboardAwareScrollView={true}>
                <Box paddingX={4}>
                    <Header dictionary={dictionary} updateOrder={updateOrder} onPressDeleteOrder={onPressDeleteOrder}
                            orderDetail={orderDetail}/>
                    <Box mt={2}>
                        <Text fontSize={22} fontFamily={'semiBold'}>{dictionary[DictionaryEnum.Photo]}</Text>
                        <AddPhotoComponent/>
                    </Box>
                    <Box>
                        <Text mb={2} fontSize={22}
                              fontFamily={'semiBold'}>{dictionary[DictionaryEnum.ParcelLocker]}</Text>

                        <FlatList keyExtractor={(item, index) => index.toString()} scrollEnabled={false}
                                  data={logisticPoints}
                                  renderItem={renderItem}/>
                    </Box>
                    <Box mt={4} alignItems={'center'}>
                        <Button backgroundColor={colors.blue} styleText={styles.btnText} colorText={colors.white}
                                styleContainer={styles.styleContainerBtn}
                                onPress={onPressChosePaczkomat}
                                title={dictionary[DictionaryEnum.ChooseNewParcelLocker]}/>
                    </Box>
                    <Box mt={3} borderBottomWidth={1} borderColor={colors.grayBright}/>
                    <Box mt={4}>
                        <PaymentMethod onPressChangePayment={onPressChangePayment}/>
                    </Box>
                    <Box mt={4}>
                        <Footer dictionary={dictionary} orderDetail={orderDetail} navigate={navigation.navigate}
                                onSave={onSendOrder}/>
                    </Box>
                </Box>
            </BaseWrapperComponent>
            {
                isShowPopUpCanselSwash &&
                <BaseBottomPopUp dictionary={dictionary} text={dictionary[DictionaryEnum.CancelSwash]}
                                 onDelete={deleteOrder} visible={isShowPopUpCanselSwash}
                                 onClose={() => setIsShowPopUpCanselSwash(false)}/>
            }
            {
                isShowModalPayment &&
                <PaymentMethodPopUp dictionary={dictionary} navigation={navigation} visible={isShowModalPayment}
                                    onClose={() => setIsShowModalPayment(false)}/>
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
        width: '100%',
    },
    checkBox: {
        borderRadius: 40,
    },
})
export default CreateOrder
