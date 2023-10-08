import React, {useEffect, useRef, useState} from 'react'
import {Avatar, Box, Image} from 'native-base'
import photoImg from '../../../assets/Images/photoWhite.png'
import {colors} from '../../../assets/colors/colors'
import {Modal, StyleSheet, TouchableOpacity} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import rootStore from '../../../store/RootStore/root-store'
import {BASE_URL} from '../../../api/config'
import {useBurgerMenu} from '../../../components/BurgerMenu/BurgerMenuContext'
import {Camera, CameraType} from "expo-camera";
import closeCameraImg from "../../../assets/Images/order/closeBlack.png";
import turnImg from "../../../assets/Images/turnWhite.png";
import btnCamera from "../../../assets/Images/order/blue-circle.png";

const AvatarProfile = ({photo}) => {
    const {isMenuOpen, setIsMenuOpen} = useBurgerMenu()
    const photoUrl = `${BASE_URL}${photo}`
    const [cameraPermission, setCameraPermission] = useState(null)
    const [isOpenCamera, setIsOpenCamera] = useState(false)
    const [cameraType, setCameraType] = useState<CameraType>(CameraType.back)

    const {AuthStoreService} = rootStore

    const [selectedImageUri, setSelectedImageUri] = useState<string>(photoUrl)
    const onGalleryHandler = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!')
            return
        }
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
            })

            if (!result.canceled) {
                const selectedAsset = result.assets[0]
                const selectedImageUri = selectedAsset.uri
                setSelectedImageUri(selectedImageUri)
                AuthStoreService.updateClientPhoto(selectedImageUri).then((data) => {
                    if (data) {
                        setIsMenuOpen(true)
                    }
                })
                setIsOpenCamera(false)
            }
        } catch (error) {
            console.log('Error selecting image from gallery:', error)
        }
    }

    const cameraRef = useRef(null)
    const getCameraPermission = async () => {
        const {status} = await Camera.requestCameraPermissionsAsync()
        setCameraPermission(status === 'granted')
        return status
    }
    const takePicture = async () => {
        //setLocalLoading(LoadingEnum.fetching)
        try {
            const photo = await cameraRef.current.takePictureAsync()
            setSelectedImageUri(photo.uri)
            AuthStoreService.updateClientPhoto(photo.uri).then((data) => {
                if (data) {
                    setIsMenuOpen(true)
                }
            })
            setIsOpenCamera(false)
        } catch (e) {
            console.log(e)
        } finally {
            //setLocalLoading(LoadingEnum.success)
        }
    }

    useEffect(() => {
        getCameraPermission()
    }, [])
    const changeCameraType = () => {
        setCameraType(cameraType === CameraType.front ? CameraType.back : CameraType.front)
    }
    return (
        <>
            <TouchableOpacity onPress={() => {
                if (!cameraPermission) {
                    getCameraPermission()
                }
                setIsOpenCamera(true)
            }}>
                <Box alignItems={'center'}>
                    <Image alt={'photo'} w={6} h={6} position={'absolute'} zIndex={2} top={9} source={photoImg}/>
                    <Box position={'absolute'} w={24} borderRadius={50} zIndex={1} top={0} opacity={0.3} h={24}
                         backgroundColor={colors.black}/>
                </Box>
                <Avatar bg='green.500' alignSelf='center' w={24} h={24} source={{
                    uri: selectedImageUri,
                }}/>
            </TouchableOpacity>
            {cameraPermission && isOpenCamera && (
                <Modal visible={isOpenCamera}>
                    <Camera pictureSize={'320x240'} autoFocus={true} type={cameraType} style={styles.camera}
                            ref={cameraRef}>
                        <Box position={'absolute'} top={'5%'} left={5}>
                            <TouchableOpacity onPress={() => {
                                setIsOpenCamera(false)
                                setCameraType(CameraType.back)
                            }}>
                                <Image source={closeCameraImg} alt={'delete'}/>
                            </TouchableOpacity>
                        </Box>
                        <Box borderRadius={50} w={50} h={50} alignItems={'center'} justifyContent={'center'}
                             position={'absolute'}
                             top={'5%'}
                             right={5}
                        >
                            <TouchableOpacity
                                onPress={changeCameraType}
                            >
                                <Image alt={'btn'} source={turnImg}/>

                            </TouchableOpacity>
                        </Box>
                        <Box position={'absolute'} bottom={5}>
                            <TouchableOpacity onPress={takePicture}>
                                <Image alt={'btn'} source={btnCamera}/>
                            </TouchableOpacity>
                        </Box>
                        <Box position={'absolute'} bottom={5} right={5}>
                            <TouchableOpacity
                                style={styles.btnGallery}
                                onPress={onGalleryHandler}>
                            </TouchableOpacity>
                        </Box>
                    </Camera>
                </Modal>
            )}
        </>
    )
}
const styles = StyleSheet.create({
    btnGallery: {backgroundColor: colors.gray, opacity: 0.8, width: 80, height: 80, borderRadius: 16},
    deleteImg: {
        position: 'absolute',
        top: -5,
        right: -10,
        width: 28,
        height: 28,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    camera: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    addPhotoButton: {
        width: 64,
        height: 64,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    image: {
        width: 64,
        height: 64,
        borderRadius: 16,
        margin: 10,
    },
})

export default AvatarProfile
