import React, {useCallback, useState} from 'react'
import {BaseWrapperComponent} from '../../../components/baseWrapperComponent'
import GeneralHeader from '../../../components/GeneralHeader'
import {NavigationProp, ParamListBase} from '@react-navigation/native'
import {observer} from 'mobx-react-lite'
import OrdersStore from '../../../store/OrdersStore/orders-store'
import {Box, Text} from 'native-base'
import Button from '../../../components/Button'
import {colors} from '../../../assets/colors/colors'
import {FlatList, Image, StyleSheet} from 'react-native'
import ironBlueImg from '../../../assets/Images/order/iron-blue.png'
import ironImg from '../../../assets/Images/order/iron.png'
import hypoallergenicBlueImg from '../../../assets/Images/order/quill-blue.png'
import hypoallergenicImg from '../../../assets/Images/order/quil-gray.png'
import {UntilsOrderType} from '../../../api/Client/type'
import UntilsItemViewer from '../../../components/list-viewer/UntilsItemViewer'
import PaymentRequared from './PaymentRequared'
import PaymentMethod from '../../../components/PaymentMethod'
import OrderInfoItem from './OrderInfoItem'
import PaymentMethodPopUp from '../../../components/pop-up/PaymentMethod/PaymentMethodPopUp'
import doneImg from '../../../assets/Images/orders/doneGreen.png'
import closeImg from '../../../assets/Images/orders/closeRed.png'
import DictionaryStore from "../../../store/DictionaryStore/dictionary-store";
import {DictionaryEnum} from "../../../store/DictionaryStore/type";

type ClientPaySProps = {
    navigation: NavigationProp<ParamListBase>
    route: any
}
const ClientPayS = observer(({navigation, route}: ClientPaySProps) => {
    const checkFromStatus = route.params.from === 'done_client_must_pay'
    const {dictionary} = DictionaryStore
    const checkFromStatusOK = route.params.from === 'ok'
    const [isShowModalPayment, setIsShowModalPayment] = useState<boolean>(false)
    const {orderDetail} = OrdersStore

    const onPay = () => {

    }
    const renderItem = useCallback(({item}: {
        item: UntilsOrderType
    }) => {
        return <UntilsItemViewer dictionary={dictionary} until={item}/>
    }, [])

    const onPressChangePayment = () => {
        setIsShowModalPayment(prevState => !prevState)
    }
    return (
        <>
            <BaseWrapperComponent isKeyboardAwareScrollView={true}>
                <Box paddingX={4}>
                    <GeneralHeader orders_id={orderDetail.orders_id} navigation={navigation}/>
                    {checkFromStatusOK &&
                        <Image style={{width: 40, height: 40, position: 'absolute', right: 18, top: 43}} alt={'img'}
                               source={doneImg}/>}
                    <Text mt={4} fontSize={22} fontFamily={'semiBold'}>{dictionary[DictionaryEnum.Services]}</Text>
                    <Box mt={2} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Box flex={1}>
                            <Button
                                styleContainer={{
                                    ...styles.styleContainerBtn,
                                    borderColor: orderDetail.add_iron === '1' ? colors.blue : colors.grayLight,
                                    backgroundColor: orderDetail.add_iron === '1' ? '#E8F5FE' : null,
                                }}
                                onPress={() => {
                                }}
                            >
                                <Image
                                    style={{width: 32, height: 32}}
                                    alt={'iron'}
                                    source={orderDetail.add_iron === '1' ? ironBlueImg : ironImg}
                                />
                                <Text fontFamily={'regular'} ml={2}
                                      color={orderDetail.add_iron === '1' ? colors.blue : colors.grayLight}>
                                    {dictionary[DictionaryEnum.WithIroning]}
                                </Text>
                            </Button>
                        </Box>
                        <Box ml={2} flex={1}>
                            <Button
                                styleContainer={{
                                    ...styles.styleContainerBtn,
                                    borderColor: orderDetail.add_hypo === '1' ? colors.blue : colors.grayLight,
                                    backgroundColor: orderDetail.add_hypo === '1' ? '#E8F5FE' : null,
                                }}
                                onPress={() => {
                                }}
                            >
                                <Image
                                    style={{width: 29, height: 29}}
                                    alt={'hypo'}
                                    source={orderDetail.add_hypo === '1' ? hypoallergenicBlueImg : hypoallergenicImg}
                                />
                                <Text fontFamily={'regular'} ml={2}
                                      color={orderDetail.add_hypo === '1' ? colors.blue : colors.grayLight}>
                                    {dictionary[DictionaryEnum.Hypoallergenic]}
                                </Text>
                            </Button>
                        </Box>
                    </Box>
                    <Box mt={4}>
                        <FlatList scrollEnabled={false} data={orderDetail.units_order} renderItem={renderItem}/>
                        <Box mt={4}>
                            <PaymentMethod onPressChangePayment={checkFromStatusOK ? null : onPressChangePayment}/>
                        </Box>
                    </Box>
                    {
                        !checkFromStatus && !checkFromStatusOK && <Box mt={6} mb={6}>
                            <PaymentRequared dictionary={dictionary}/>
                        </Box>
                    }
                    <Box>
                        <Text mt={4} mb={2} fontSize={22}
                              fontFamily={'semiBold'}>{dictionary[DictionaryEnum.OrderInfo]}</Text>
                        <OrderInfoItem nameField={dictionary[DictionaryEnum.Order]} price={orderDetail.basic_pay}/>
                        <OrderInfoItem nameField={dictionary[DictionaryEnum.ParcelLocker]} price={'1'}/>
                        <OrderInfoItem nameField={dictionary[DictionaryEnum.Services]}
                                       price={orderDetail.services_pay}/>
                        <OrderInfoItem color={colors.greenBright} nameField={dictionary[DictionaryEnum.Discount]}
                                       price={`-${orderDetail.balance}`}/>
                        <OrderInfoItem nameField={dictionary[DictionaryEnum.Total]} price={orderDetail.amount}/>
                    </Box>
                    {
                        !checkFromStatusOK && <Box mt={10} mb={5} alignItems={'center'}>
                            <Button backgroundColor={colors.blue} colorText={colors.white}
                                    styleContainer={{
                                        borderRadius: 28,
                                        maxWidth: 280,
                                        width: '100%',
                                    }} onPress={onPay} title={dictionary[DictionaryEnum.Pay]}/>
                        </Box>
                    }

                </Box>
            </BaseWrapperComponent>
            {
                isShowModalPayment &&
                <PaymentMethodPopUp dictionary={dictionary} navigation={navigation} visible={isShowModalPayment}
                                    onClose={() => setIsShowModalPayment(false)}/>
            }
        </>
    )
})
const styles = StyleSheet.create({
    styleContainerBtn: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
        borderWidth: 1,
    },
})
export default ClientPayS
