import React, {useCallback, useEffect} from 'react'
import {BaseWrapperComponent} from '../../components/baseWrapperComponent'
import {observer} from 'mobx-react-lite'
import {Box, Text} from 'native-base'
import HeaderGoBackTitle from '../../components/HeaderGoBackTitle'
import {NavigationProp, ParamListBase} from '@react-navigation/native'
import {FlatList, Image} from 'react-native'
import {OrderType} from '../../api/Client/type'
import OrderHistoryViewer from '../../components/list-viewer/OrderHistoryViewer/OrderHistoryViewer'
import rootStore from '../../store/RootStore/root-store'
import OrdersStore from '../../store/OrdersStore/orders-store'
import {routerConstants} from '../../constants/routerConstants'
import DictionaryStore from "../../store/DictionaryStore/dictionary-store";
import {DictionaryEnum} from "../../store/DictionaryStore/type";
import {useGoBack} from "../../utils/hook/useGoBack";
import Button from "../../components/Button";
import {colors} from "../../assets/colors/colors";
import smileSleepImg from '../../assets/Images/smileSleep.png'
import {useBurgerMenu} from "../../components/BurgerMenu/BurgerMenuContext";

type OrderHistorySProps = {
    navigation: NavigationProp<ParamListBase>
}
const OrderHistoryS = observer(({navigation}: OrderHistorySProps) => {
    const {OrdersStoreService} = rootStore
    const {dictionary} = DictionaryStore
    const {closedOrders, orderDetail} = OrdersStore
    const {isMenuOpen, setIsMenuOpen} = useBurgerMenu()
    const goBack = () => {
        navigation.navigate(routerConstants.ORDERS)
        return true
    }
    useGoBack(goBack)
    const onPressDetails = useCallback((id) => {
        OrdersStoreService.getOrderReportDetail(id)
        navigation.navigate(routerConstants.CLIENT_PAY, {from: 'ok'})
    }, [])
    const renderItem = useCallback(({item}: { item: OrderType }) => {
        return <OrderHistoryViewer dictionary={dictionary} onPressDetails={onPressDetails} order={item}/>
    }, [])
    useEffect(() => {
        if(!closedOrders.length) {
            OrdersStoreService.getClosedOrders()
        }
    }, [])
    const onPressCreateOrder = () => {
        setIsMenuOpen(false)
        OrdersStoreService.checkOrdersEditable(navigation.navigate)
    }
    const renderEmptyListOrder = () => {
        return <Box alignItems={'center'} justifyContent={'center'} flex={1} w={'100%'}>
            <Image style={{ width: 186, height: 180 }} alt={'img-sleep'} source={smileSleepImg}/>
            <Text fontSize={28} mt={8} textAlign={'center'} fontFamily={'semiBold'}>You still have not made
                a Swash!</Text>
            <Text mt={8} fontSize={16} fontFamily={'regular'}>Maybe it’s a good moment to begin?</Text>
            <Box mt={10} w={'100%'} alignItems={'center'}>
                <Button backgroundColor={colors.blue} colorText={colors.white}
                        styleContainer={{
                            borderRadius: 28,
                            maxWidth: 280,
                            width: '100%',
                        }} onPress={onPressCreateOrder} title={'Create your first Swash!'}/>
            </Box>
        </Box>
    }
    return (
        <BaseWrapperComponent styleKeyboardAwareScrollView={ !closedOrders.length && {justifyContent: 'center', flex: 1}} isKeyboardAwareScrollView={true}>
            <Box paddingX={4} mt={3}>
                <HeaderGoBackTitle title={dictionary[DictionaryEnum.OrderHistory]} goBackPress={goBack}/>
            </Box>
            <Box paddingX={4} mb={6} mt={3} flex={1} justifyContent={'center'} >
                <Box mt={10} >
                    <FlatList scrollEnabled={false} ListEmptyComponent={renderEmptyListOrder} data={closedOrders}
                              renderItem={renderItem}/>
                </Box>
            </Box>
        </BaseWrapperComponent>
    )
})

export default OrderHistoryS
