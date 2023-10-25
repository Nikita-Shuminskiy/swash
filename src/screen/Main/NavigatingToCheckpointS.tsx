import React, {useEffect, useState} from 'react'
import {BaseWrapperComponent} from '../../components/baseWrapperComponent'
import {Box, Text} from 'native-base'
import Button from '../../components/Button'
import {colors} from '../../assets/colors/colors'
import ArrowBack from '../../components/ArrowBack'
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'
import {Dimensions, Image, Linking, StyleSheet, View} from 'react-native'
import {getCurrentPositionHandler} from '../../components/MapViews/utils'
import {observer} from 'mobx-react-lite'
import takeYourThingsImg from '../../assets/Images/orders/takeThings.png'
import takeYourThingsFromImg from '../../assets/Images/orders/takeThingsFrom.png'
import OrdersStore from '../../store/OrdersStore/orders-store'
import Loaders from 'react-native-pure-loaders'
import DictionaryStore from "../../store/DictionaryStore/dictionary-store";
import {DictionaryEnum} from "../../store/DictionaryStore/type";
import userImg from "../../assets/Images/Map/user.svg";
import * as Location from "expo-location";
import Svg, {Path, SvgXml} from "react-native-svg";
import {userSvg} from "../../assets/Images/Svg";

type Coordinates = {
    latitude: number;
    longitude: number;
}
type NavigatingToCheckpointSProps = {
    navigation: any
    route: any
}

const NavigatingToCheckpointS = observer(({navigation, route}: NavigatingToCheckpointSProps) => {
    const {dictionary} = DictionaryStore
    const {orderDetail} = OrdersStore
    const isFromExecutorPerfomed = route.params.from === 'takeIt'
    const [myPosition, setMyPosition] = useState<Coordinates>(null)
    const goBackPress = () => {
        navigation.goBack()
    }

    const onPressNavigate = () => {
        if (!myPosition?.latitude) return
        const endLocation = [+orderDetail.client_logistic_partners_points_lat, +orderDetail.client_logistic_partners_points_lon]
        const startLocation = [myPosition.latitude, myPosition.longitude]

        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${startLocation}&destination=${endLocation}`
        Linking.openURL(googleMapsUrl).catch((err) =>
            console.error('Error opening Google Maps: ', err),
        )
    }
    const getCurrentPosition = async () => {
        try {
            const {latitude, longitude} = await getCurrentPositionHandler()
            setMyPosition({latitude, longitude})
        } catch (e) {
        }
    }
    useEffect(() => {
        getCurrentPosition()
    }, [])
    let initialRegion = {
        latitude: myPosition?.latitude,
        longitude: myPosition?.longitude,
        latitudeDelta: 0.0221,
        longitudeDelta: 0.0221,
    }

    return (
        <BaseWrapperComponent isKeyboardAwareScrollView={true}>
            <Box
                style={{
                    paddingHorizontal: 16,
                    justifyContent: 'space-between',
                    width: '100%',
                    flex: 1,
                    height: Dimensions.get('window').height
                }}>
                <Box>
                    <ArrowBack goBackPress={goBackPress}/>
                    <Box mt={2} mb={2}>
                        <Text fontSize={28} fontFamily={'semiBold'}>
                            Swash #{orderDetail.orders_id}
                        </Text>
                    </Box>
                    <Box p={3}
                         backgroundColor={isFromExecutorPerfomed ? `rgba(255, 170, 4, 0.2)` : `rgba(25, 215, 44, 0.08)`}
                         borderRadius={16}>
                        <Box
                            flexDirection={'row'}
                            alignItems={'flex-start'}>
                            <Image style={{width: 40, height: 40}}
                                   source={isFromExecutorPerfomed ? takeYourThingsImg : takeYourThingsFromImg}/>
                            <Box ml={2} flex={1}>
                                <Text fontSize={15} fontFamily={'regular'}>
                                    {
                                        isFromExecutorPerfomed ? dictionary[DictionaryEnum.ItsTimeToTakeThingsToPachkomat]
                                            : dictionary[DictionaryEnum.ItsTimeToPickUpThingsFromPachkomat]
                                    }
                                    <Text
                                        color={isFromExecutorPerfomed ? colors.orangeVivid : colors.greenBright}>{' '}
                                        {orderDetail.post_deadline}
                                    </Text>
                                </Text>
                            </Box>
                        </Box>

                    </Box>

                    <Box mt={4} h={200}>
                        {
                            myPosition ? <MapView
                                style={styles.map}
                                provider={PROVIDER_GOOGLE}
                                initialRegion={initialRegion}
                            >
                                {
                                    !!myPosition?.latitude && <Marker
                                        focusable={true}
                                        style={{width: 30, height: 30}}
                                        coordinate={myPosition}
                                        title={''}
                                    >
                                        <SvgXml xml={userSvg} width="100%" height="100%" />
                                    </Marker>
                                }
                            </MapView> : <View style={styles.containerLoading}>
                                <Loaders.Ellipses color={colors.blue}/>
                            </View>
                        }
                    </Box>

                    <Box mt={4}>
                        <Text fontSize={15} fontFamily={'regular'}>
                            {dictionary[DictionaryEnum.MustPickUpThingsFromPostomatBeforeItCloses]}
                        </Text>
                    </Box>
                </Box>
                <Box mb={3} mt={2} alignItems={'center'}>
                    <Button backgroundColor={colors.blue} colorText={colors.white}
                            styleContainer={{
                                borderRadius: 28,
                                maxWidth: 280,
                                width: '100%',
                            }} onPress={onPressNavigate} title={dictionary[DictionaryEnum.Navigate]}/>
                </Box>
            </Box>
        </BaseWrapperComponent>
    )
})

const styles = StyleSheet.create({
    containerLoading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(230,245,255,0.37)',
    },
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: 200,
    },
})

export default NavigatingToCheckpointS
