import React, {useCallback} from 'react'
import {BaseWrapperComponent} from '../../components/baseWrapperComponent'
import {NavigationProp, ParamListBase} from '@react-navigation/native'
import {FlatList, Image, StyleSheet} from 'react-native'
import tShirtTop from '../../assets/Images/Сlothing/T-shirts-tops.png' // 3
import Bedding from '../../assets/Images/Сlothing/Bedding.png' // 9
import AddNewItem from '../../assets/Images/Сlothing/AddNewItem.png'
import ChildrenClothing from '../../assets/Images/Сlothing/ChildrensСlothing.png' // 8
import Outerwear from '../../assets/Images/Сlothing/Outerwear.png' // 1
import PantsShorts from '../../assets/Images/Сlothing/PantsShorts.png' //5
import PulloversSweaters from '../../assets/Images/Сlothing/PulloversSweaters.png' // 4
import ShirtsJackets from '../../assets/Images/Сlothing/ShirtsJackets.png' //2
import SkirtsDresses from '../../assets/Images/Сlothing/SkirtsDresses.png' //6
import UnderWearSocks from '../../assets/Images/Сlothing/UnderwearSocks.png' //7
import {Box, Text} from 'native-base'
import ArrowBack from '../../components/ArrowBack'
import AuthStore from '../../store/AuthStore/auth-store'
import {UnitType} from '../../api/Client/type'
import {colors} from '../../assets/colors/colors' // 7
import hypoallergenicBlueImg from '../../assets/Images/order/quill-blue.png'
import ironBlueImg from '../../assets/Images/order/iron-blue.png'
import Button from '../../components/Button'
import {DATA_IMG} from '../../utils/constants'
import DictionaryStore from "../../store/DictionaryStore/dictionary-store";
import PriceViewer from "../../components/list-viewer/PriceViewer/PriceViewer";
import {DictionaryEnum} from "../../store/DictionaryStore/type";
import {observer} from "mobx-react-lite";

type PriceSProps = {
    navigation: NavigationProp<ParamListBase>
}

const PriceS = observer(({navigation}: PriceSProps) => {
    const {clientSettings} = AuthStore
    const {dictionary} = DictionaryStore
    const goBackPress = () => {
        navigation.goBack()
    }
    const renderItem = useCallback(({item}: { item: UnitType }) => {
        return <PriceViewer price={item}/>
    }, [])
    return (
        <BaseWrapperComponent isKeyboardAwareScrollView={true}>
            <Box paddingX={3}>
                <Box alignItems={'center'} justifyContent={'center'}>
                    <Box position={'absolute'} left={2} top={0}>
                        <ArrowBack goBackPress={goBackPress}/>
                    </Box>
                    <Box>
                        <Text fontSize={17} fontFamily={'semiBold'}>{dictionary[DictionaryEnum.Prices]}</Text>
                    </Box>
                </Box>
                <Box mt={5}>
                    <FlatList scrollEnabled={false} data={clientSettings.units} renderItem={renderItem}/>
                </Box>
                <Box mt={2} mb={5} justifyContent={'center'} alignItems={'center'}>
                    <Button backgroundColor={colors.blue} colorText={colors.white} styleContainer={{
                        width: 280,
                        borderRadius: 28,
                    }} onPress={goBackPress} title={dictionary[DictionaryEnum.OK]}/>
                </Box>
            </Box>
        </BaseWrapperComponent>
    )
})

export default PriceS
