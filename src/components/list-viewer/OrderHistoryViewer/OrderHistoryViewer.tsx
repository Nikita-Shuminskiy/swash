import React from 'react'
import {Box, Text} from 'native-base'
import {colors} from '../../../assets/colors/colors'
import {Image, TouchableOpacity} from 'react-native'
import arrowBlue from '../../../assets/Images/order/arrowRightBlue.png'
import doneImg from '../../../assets/Images/orders/doneGreen.png'
import closeImg from '../../../assets/Images/orders/closeRed.png'
import {LastStep, OrderType} from '../../../api/Client/type'
import {dateStringFormat} from '../../../utils/commonUtils'
import {observer} from "mobx-react-lite";
import {DictionaryType} from "../../../store/DictionaryStore/dictionary-store";
import {DictionaryEnum} from "../../../store/DictionaryStore/type";

type OrderHistoryViewerProps = {
    onPressDetails: (id: string) => void
    order: OrderType
    dictionary: DictionaryType
}
const OrderHistoryViewer = observer(({onPressDetails, order, dictionary}: OrderHistoryViewerProps) => {
    const isClosedOrder = order.last_step === LastStep.admin_closed_order
    return (
        <Box borderWidth={1} p={2} mb={2} borderColor={colors.grayBright} borderRadius={20}>
            <Box flexDirection={'row'} mb={2} alignItems={'center'}>
                <Box mr={2}>
                    <Image style={{width: 40, height: 40}} source={isClosedOrder ? doneImg : closeImg}/>
                </Box>
                <Box flexDirection={'row'} flex={1} justifyContent={'space-between'} alignItems={'flex-start'}>
                    <Box>
                        <Text fontFamily={'semiBold'} fontSize={17}>Swash{' '}#{order.id}</Text>
                        <Text fontFamily={'regular'} color={isClosedOrder ? colors.greenBright : colors.red}
                              fontSize={13}>{isClosedOrder ? dictionary[DictionaryEnum.Finished] : dictionary[DictionaryEnum.Declined]}</Text>
                    </Box>
                    <Box>
                        <Text fontFamily={'regular'} color={colors.grayLight}
                              fontSize={15}>{dateStringFormat('dd.MM.yyyy', order.date_estimated_ready)}</Text>
                    </Box>
                </Box>
            </Box>
            <Box>
                <TouchableOpacity onPress={() => onPressDetails(order.id)}>
                    <Box paddingY={18} borderRadius={16} paddingX={5} flexDirection={'row'} alignItems={'center'}
                         justifyContent={'space-between'}
                         backgroundColor={colors.grayBright}>
                        <Text fontFamily={'regular'} fontSize={13} color={colors.blue}>{dictionary[DictionaryEnum.Details]}</Text>
                        <Image source={arrowBlue} alt={'arrow'}/>
                    </Box>
                </TouchableOpacity>
            </Box>

        </Box>
    )
})

export default OrderHistoryViewer
