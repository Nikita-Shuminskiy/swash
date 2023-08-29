import React, { useEffect, useRef, useState } from 'react'
import { FlatList, Image, ImageBackground, Modal, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Camera, CameraType, FlashMode } from 'expo-camera'
import addPhotoImage from '../assets/Images/order/add_photo.png'
import { observer } from 'mobx-react-lite'
import OrdersStore from '../store/OrdersStore/orders-store'
import rootStore from '../store/RootStore/root-store'
import deleteImg from '../assets/Images/order/closeCircleGray.png'
import btnCamera from '../assets/Images/order/blue-circle.png'
import closeCameraImg from '../assets/Images/order/closeBlack.png'
import DeletePhotoModal from './modal/DeletePhotoModal'
import NotificationStore from '../store/NotificationStore/notification-store'
import { LoadingEnum } from '../store/types/types'
import * as ImagePicker from 'expo-image-picker'
import { Box } from 'native-base'
import { PhotoType } from '../api/Client/type'
import { BASE_URL } from '../api/config'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../assets/colors/colors'


const AddPhotoComponent = observer(() => {
	const { orderDetail } = OrdersStore
	const { setLocalLoading } = NotificationStore
	const { OrdersStoreService } = rootStore

	const [cameraPermission, setCameraPermission] = useState(null)
	const [isOpenCamera, setIsOpenCamera] = useState(false)
	const [isDeleteModal, setIsDeleteModal] = useState(false)
	const [deletedPhotoId, setDeletedPhotoId] = useState('')


	const cameraRef = useRef(null)

	useEffect(() => {
		getCameraPermission()

	}, [])

	const getCameraPermission = async () => {
		const { status } = await Camera.requestCameraPermissionsAsync()
		setCameraPermission(status === 'granted')
		return status
	}
	const takePicture = async () => {
		setLocalLoading(LoadingEnum.fetching)
		try {
			const photo = await cameraRef.current.takePictureAsync()
			await OrdersStoreService.saveOrderPhoto(photo.uri)
			setIsOpenCamera(false)
		} catch (e) {
			console.log(e)
		} finally {
			setLocalLoading(LoadingEnum.success)
		}
	}

	const onCloseModalDelete = () => {
		setIsDeleteModal(false)
	}
	const onGalleryHandler = async () => {
		const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

		if (permissionResult.granted === false) {
			alert('Permission to access camera roll is required!')
			return
		}
		try {
			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [4, 3],
				quality: 1,
			})
			setIsOpenCamera(false)

			if (!result.canceled) {
				const selectedAsset = result.assets[0]
				const selectedImageUri = selectedAsset.uri
				await OrdersStoreService.saveOrderPhoto(selectedImageUri)
			}
		} catch (error) {
			console.log('Error selecting image from gallery:', error)
		}
	}


	const renderItem = ({ item }: { item: PhotoType }) => {
		const onPressDeletePhoto = () => {
			setDeletedPhotoId(item.id)
			setIsDeleteModal(true)
		}
		const imageUrl = `${BASE_URL}${item.filename}`
		return item.id === 'add_photo_button' ? (
			<TouchableOpacity style={styles.addPhotoButton} onPress={() => {
				if (!cameraPermission) {
					getCameraPermission()
				}
				setIsOpenCamera(true)
			}}>
				<Image style={{ width: 64, height: 64 }} source={addPhotoImage} alt={'add_photo'} />
			</TouchableOpacity>
		) : (
			<ImageBackground source={{ uri: imageUrl }} borderRadius={16} style={styles.image}>
				<TouchableOpacity onPress={onPressDeletePhoto}>
					<Image style={styles.deleteImg} source={deleteImg} alt={'delete'} />
				</TouchableOpacity>
			</ImageBackground>
		)
	}
	const [flashMode, setFlashMode] = React.useState<FlashMode>(FlashMode.off)

	const flashModeHandler = () => {
		if (flashMode === FlashMode.torch) {
			setFlashMode(FlashMode.off)
		} else if (flashMode === FlashMode.off) {
			setFlashMode(FlashMode.torch)
		}
	}
	return (
		<View style={styles.container}>
			<FlatList
				horizontal
				data={orderDetail.photos ? [{
					filename: '',
					id: 'add_photo_button',
				}, ...orderDetail.photos] : [{ id: 'add_photo_button', filename: '' }]}
				renderItem={renderItem}
				contentContainerStyle={{
					flexGrow: 1,
					alignItems: 'flex-start',
					paddingBottom: 15,
				}}
				style={{ width: '100%' }}
				showsHorizontalScrollIndicator={true}
				/*	persistentScrollbar={true}*/
				keyExtractor={(item) => item.id}
			/>
			{cameraPermission && isOpenCamera && (
				<Modal visible={isOpenCamera}>
					<Camera type={CameraType.back} flashMode={flashMode} style={styles.camera} ref={cameraRef}>
						<Box position={'absolute'} top={5} left={5}>
							<TouchableOpacity onPress={() => setIsOpenCamera(false)}>
								<Image source={closeCameraImg} alt={'delete'} />
							</TouchableOpacity>
						</Box>
						<Box borderRadius={50} w={50} h={50} alignItems={'center'} justifyContent={'center'}
								 position={'absolute'}
								 top={5}
								 right={5}
								 backgroundColor={flashMode === FlashMode.off ? '#000' : '#fff'}>
							<TouchableOpacity
								onPress={flashModeHandler}
							>
								<Ionicons name='ios-flashlight' size={30} color={colors.blue} />

							</TouchableOpacity>
						</Box>
						<Box position={'absolute'} bottom={5}>
							<TouchableOpacity onPress={takePicture}>
								<Image source={btnCamera} />
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
			<DeletePhotoModal deleteOrderPhoto={() => OrdersStoreService.deleteOrderPhoto(deletedPhotoId)}
												visible={isDeleteModal}
												onClose={onCloseModalDelete} />
		</View>
	)
})

const styles = StyleSheet.create({
	btnGallery: { backgroundColor: colors.gray, opacity: 0.8, width: 80, height: 80, borderRadius: 16 },
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

export default AddPhotoComponent
