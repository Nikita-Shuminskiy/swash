import React, {useState} from 'react'
import {Box} from 'native-base'

import paperClippingImg from '../../../assets/Images/Chat/paperСlippng.png'
import sendBtnImg from '../../../assets/Images/Chat/sendBtn.png'
import {ActivityIndicator, ImageBackground, StyleSheet, TextInput} from 'react-native'
import {colors} from '../../../assets/colors/colors'
import * as ImagePicker from 'expo-image-picker'
import closeCircleGrayImg from '../../../assets/Images/order/closeCircleGray.png'
import Link from '../../../components/Link'
import rootStore from '../../../store/RootStore/root-store'
import TypicalMessages from "./TypicalMessages";
import {ClientTypicalMessagesType} from "../../../api/Client/type";

type FooterProps = {
    scrollToBottomHandler: () => void
    client_typical_messages: ClientTypicalMessagesType[]
    dialogLength: number
}
const Footer = ({scrollToBottomHandler, client_typical_messages, dialogLength}: FooterProps) => {
    const {ChatStoreService} = rootStore
    const [currentImg, setCurrentImg] = useState<string>('')
    const [message, setMessage] = useState<string>('')
    const [loading, setLoading] = useState(false)
    const onGalleryHandler = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!')
            return
        }
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: false
            })

            if (!result.canceled) {
                const selectedAsset = result.assets[0]
                setCurrentImg(selectedAsset.uri)
            }
        } catch (error) {
        }
    }
    const onPressDeleteImg = () => {
        setCurrentImg('')
    }
    const onPressSendMessage = () => {
        if (!message && !currentImg) return
        setLoading(true)
        ChatStoreService.sendMessage({photo: currentImg, text: message.trim()}).then((data) => {
            if (data) {
                setCurrentImg('')
                setMessage('')
                scrollToBottomHandler()
            }
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <>
            <Box paddingX={4}>
                {
                    !dialogLength && client_typical_messages.map((el, index) => {
                        const onPress = () => {
                            setLoading(true)
                            ChatStoreService.sendMessage({text: el.message.trim()}).then((data) => {
                                if (data) {
                                    scrollToBottomHandler()
                                }
                            }).finally(() => {
                                setLoading(false)
                            })
                        }
                        return <TypicalMessages index={index} key={index} typicalMessage={el} onPress={onPress}/>
                    })
                }
                {
                    currentImg && <Box pt={2} flexDirection={'row'} alignItems={'center'} justifyContent={'flex-start'}>
                        <ImageBackground alt={'img-gallery'} resizeMethod={'resize'} style={{width: 64, height: 64}}
                                         borderRadius={16}
                                         source={{uri: currentImg}}>
                            <Link styleImg={{width: 24, height: 24}} styleLink={{position: 'absolute', right: -5, top: -10}}
                                  img={closeCircleGrayImg} onPress={onPressDeleteImg}/>
                        </ImageBackground>
                    </Box>
                }
                <Box flexDirection={'row'} alignItems={'flex-end'} mt={currentImg ? 2 : 0}
                     justifyContent={'space-evenly'}>
                    <Link styleImg={styles.img} styleLink={{marginRight: 10, marginBottom: 0}}
                          img={paperClippingImg} onPress={onGalleryHandler}/>
                    <Box flex={1}>
                        <TextInput multiline={true} value={message} onChangeText={setMessage} style={styles.input}/>
                    </Box>
                    {
                        loading ? <ActivityIndicator
                            color={colors.blue}
                            size='large'
                        /> : <Link styleImg={styles.img} styleLink={{marginLeft: 10, marginBottom: 0}}
                                   img={sendBtnImg} onPress={onPressSendMessage}/>
                    }

                </Box>
            </Box>
        </>
    )
}
const styles = StyleSheet.create({
    input: {
        fontFamily: 'regular',
        fontSize: 15,
        borderRadius: 24,
        backgroundColor: colors.grayBright,
        minHeight: 40,
        maxHeight: 140,
        paddingHorizontal: 16,
        paddingVertical: 7,
    },
    img: {width: 40, height: 40},
})
export default Footer
