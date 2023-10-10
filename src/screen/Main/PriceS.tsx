import React, {useCallback} from 'react'
import {BaseWrapperComponent} from '../../components/baseWrapperComponent'
import {NavigationProp, ParamListBase} from '@react-navigation/native'
import {FlatList} from 'react-native'
import {Box, Text} from 'native-base'
import ArrowBack from '../../components/ArrowBack'
import AuthStore from '../../store/AuthStore/auth-store'
import {UnitType} from '../../api/Client/type'
import {colors} from '../../assets/colors/colors'
import Button from '../../components/Button'

import DictionaryStore from "../../store/DictionaryStore/dictionary-store";
import PriceViewer from "../../components/list-viewer/PriceViewer/PriceViewer";
import {DictionaryEnum} from "../../store/DictionaryStore/type";
import {observer} from "mobx-react-lite";
import {getInfoPriceElement} from "../../components/list-viewer/PriceViewer/utils";

type PriceSProps = {
    navigation: NavigationProp<ParamListBase>
}

const PriceS = observer(({navigation}: PriceSProps) => {
    const {clientSettings} = AuthStore
    const {dictionary, selectedLanguage} = DictionaryStore
    const goBackPress = () => {
        navigation.goBack()
    }

    const renderItem = ({item}: { item: UnitType }) => {
        const getInfo = getInfoPriceElement(item?.type_of_units_id, dictionary)

        return <PriceViewer price={item} getInfo={getInfo}/>
    }
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
                    <FlatList extraData={selectedLanguage} keyExtractor={(item, index) => index.toString()}
                              scrollEnabled={false} data={clientSettings.units} renderItem={renderItem}/>
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
