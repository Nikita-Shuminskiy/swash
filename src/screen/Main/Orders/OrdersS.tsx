import React, {useCallback} from 'react'
import {BaseWrapperComponent} from '../../../components/baseWrapperComponent'
import {NavigationProp, ParamListBase, useFocusEffect} from '@react-navigation/native'
import BurgerMenuImg from '../../../components/BurgerMenu/BurgerMenuBtn'
import {observer} from 'mobx-react-lite'
import OrdersStore from '../../../store/OrdersStore/orders-store'
import {BackHandler, FlatList} from 'react-native'
import {Box, Image, Text} from 'native-base'
import {LastStep, OrderType} from '../../../api/Client/type'
import OrderViewer from '../../../components/list-viewer/OrderViewer/OrderViewer'
import Button from '../../../components/Button'
import {colors} from '../../../assets/colors/colors'
import addCircleImage from '../../../assets/Images/plus-circle-white.png'
import rootStore from '../../../store/RootStore/root-store'
import AlertFeedBack from '../../../components/AlertFeedBack'
import {processingNavigationOrderStatus} from "./utils";
import DictionaryStore from "../../../store/DictionaryStore/dictionary-store";

type OrdersSProps = {
    navigation: NavigationProp<ParamListBase>
    route: any
}
const OrdersS = observer(({navigation, route}: OrdersSProps) => {
    const {dictionary} = DictionaryStore
    const {orders} = OrdersStore
    const isOpenMenu = route.params?.from === 'open_menu'
    const {OrdersStoreService} = rootStore

    const onPressDetails = useCallback((order: OrderType) => {
        OrdersStoreService.getOrderReportDetail(order.id).then((data) => {
            if(data)  {
                processingNavigationOrderStatus(navigation, order)
            }
        })

    }, [])

    const renderItem = useCallback(({item}: { item: OrderType }) => {
        if (item.last_step === LastStep.admin_closed_order || item.last_step === LastStep.client_confirm) return
        return <OrderViewer onPressDetails={onPressDetails} order={item}/>
    }, [])
    const onPressSwash = () => {
        OrdersStoreService.checkOrdersEditable(navigation.navigate)
    }
    const onPressGoBack = () => {
        return true
    }
    useFocusEffect(
        React.useCallback(() => {
            BackHandler.addEventListener('hardwareBackPress', onPressGoBack)
            OrdersStoreService.getOrderReportClient()

            return () => {
                BackHandler.removeEventListener('hardwareBackPress', onPressGoBack)
            };
        }, [])
    );

    return (
        <>
            <AlertFeedBack dictionary={dictionary} navigation={navigation} route={route}/>
            <BaseWrapperComponent isKeyboardAwareScrollView={true}>
                <Box style={{paddingHorizontal: 16}}>
                    <BurgerMenuImg openingForced={isOpenMenu}/>
                    <Box mt={4}>
                        <FlatList scrollEnabled={false} data={orders} renderItem={renderItem}/>
                    </Box>
                    <Box mt={2} mb={5} alignItems={'center'}>
                        <Button backgroundColor={colors.blue} colorText={colors.white}
                                styleContainer={{
                                    borderRadius: 28,
                                    maxWidth: 280,
                                    width: '100%',
                                }} onPress={onPressSwash} title={'Swash'}>
                            <Box flexDirection={'row'} alignItems={'center'}>
                                <Image style={{width: 24, height: 24}} source={addCircleImage} alt={'arrow'}/>
                                <Text fontSize={15} ml={1} fontFamily={'semiBold'} color={colors.white}>Swash</Text>
                            </Box>
                        </Button>
                    </Box>
                </Box>
            </BaseWrapperComponent>
        </>
    )
})

export default OrdersS
