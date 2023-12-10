import React from 'react'
import {BaseWrapperComponent} from '../components/baseWrapperComponent'
import {NavigationProp, ParamListBase} from '@react-navigation/native'
import {Box, Text} from 'native-base'
import ArrowBack from '../components/ArrowBack'
import {colors} from '../assets/colors/colors'
import {MapViews} from '../components/MapViews/MapViews'
import {observer} from 'mobx-react-lite'
import AuthStore from '../store/AuthStore/auth-store'
import OrdersStore from '../store/OrdersStore/orders-store'
import DictionaryStore from "../store/DictionaryStore/dictionary-store";
import {DictionaryEnum} from "../store/DictionaryStore/type";

type LogisticsPointProps = {
    navigation: NavigationProp<ParamListBase>
}
const LogisticsPointS = observer(({navigation}: LogisticsPointProps) => {
    const {logisticPoints} = AuthStore
    const {dictionary} = DictionaryStore
    const {orderDetail} = OrdersStore
    const goBackPress = () => {
        navigation.goBack()
    }
    return (
        <BaseWrapperComponent>
            <Box paddingX={3} h={58} backgroundColor={colors.white} flexDirection={'row'} alignItems={'center'}
                 justifyContent={'space-between'}>
                <Box position={'relative'} bottom={1}>
                    <ArrowBack goBackPress={goBackPress}/>
                </Box>
                <Box>
                    <Text fontSize={22} fontFamily={'semiBold'}>{dictionary[DictionaryEnum.SelectPaczkomat]}</Text>
                </Box>
                <Box/>
            </Box>
            <MapViews dictionary={dictionary} goBackPress={goBackPress} orderDetail={orderDetail} logisticPoints={logisticPoints}/>
        </BaseWrapperComponent>
    )
})

export default LogisticsPointS
