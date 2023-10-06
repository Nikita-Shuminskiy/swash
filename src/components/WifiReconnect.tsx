import React from 'react'
import {BaseWrapperComponent} from './baseWrapperComponent'
import imgBack from '../assets/Images/backWave.png'
import imgLook from '../assets/Images/wifiRed.png'
import {Box, Text} from 'native-base'
import {Image, Modal, StyleSheet} from 'react-native'
import {colors} from '../assets/colors/colors'
import Button from './Button'
import {StatusBar} from 'expo-status-bar'
import {LaundryService} from "../store/DictionaryStore/dictionary-store";
import {DictionaryEnum} from "../store/DictionaryStore/type";

type WifiReconnectProps = {
    visible?: boolean
    checkInternet?: () => void
    dictionary: LaundryService
}
const WifiReconnect = ({visible, checkInternet, dictionary}: WifiReconnectProps) => {
    const onPressReconnect = () => {
        checkInternet()
    }

    return (
        <Modal visible={visible}>
            <BaseWrapperComponent styleSafeArea={{backgroundColor: colors.redLight}}>
                <StatusBar backgroundColor={colors.redLight}/>
                <Box flex={1} w={'100%'} justifyContent={'space-between'} alignItems={'center'}
                     backgroundColor={colors.redLight}>
                    <Image style={styles.imgLogo} source={imgLook}/>
                    <Box justifyContent={'space-between'} w={'100%'}>
                        <Box alignItems={'center'}>
                            <Image style={{width: '100%'}} source={imgBack}/>
                        </Box>
                        <Box paddingX={10} h={375} w={'100%'} alignItems={'center'} justifyContent={'space-evenly'}
                             backgroundColor={colors.white}>
                            <Box flex={1} alignItems={'center'}>
                                <Text fontSize={28}
                                      fontFamily={'semiBold'}>{dictionary[DictionaryEnum.BadConnection]}</Text>
                                <Text textAlign={'center'} fontSize={15} fontFamily={'regular'}
                                      color={colors.grayLight}>
                                    {dictionary[DictionaryEnum.CheckInternetConnection]}
                                </Text>
                            </Box>
                            <Box flex={1} w={'100%'}>
                                <Button onPress={onPressReconnect} styleContainer={styles.styleContainerBtn}
                                        title={dictionary[DictionaryEnum.Reconnect]}
                                        colorText={colors.white} backgroundColor={colors.red}/>
                            </Box>

                        </Box>
                    </Box>
                </Box>
            </BaseWrapperComponent>
        </Modal>
    )
}
const styles = StyleSheet.create({
    imgLogo: {
        width: 300,
        height: 300,
    },
    styleContainerBtn: {
        marginTop: 10,
        marginBottom: 10,
    },
})

export default WifiReconnect
