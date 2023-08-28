import React, { useEffect, useRef, useState } from 'react'
import { FlatList, Image, ImageBackground, Modal, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Camera } from 'expo-camera'
import addPhotoImage from '../assets/Images/order/add_photo.png'
import { observer } from 'mobx-react-lite'
import OrdersStore from '../store/OrdersStore/orders-store'
import rootStore from '../store/RootStore/root-store'
import deleteImg from '../assets/Images/order/closeCircleGray.png'
import btnCamera from '../assets/Images/order/button-camera.png'
import closeCameraImg from '../assets/Images/order/closeBlack.png'
import DeleteModal from './modal/DeleteModal'
import NotificationStore from '../store/NotificationStore/notification-store'
import { LoadingEnum } from '../store/types/types'
import * as ImagePicker from 'expo-image-picker'
import { Box } from 'native-base'
import { PhotoType } from '../api/Client/type'
import { BASE_URL } from '../api/config'

const AddPhotoComponent = observer(() => {
	const { orderDetail } = OrdersStore
	const { setIsLoading } = NotificationStore
	const { OrdersStoreService } = rootStore

	const [cameraPermission, setCameraPermission] = useState(null)
	const [isOpenCamera, setIsOpenCamera] = useState(false)
	const [isDeleteModal, setIsDeleteModal] = useState(false)
	const [deletedPhotoId, setDeletedPhotoId] = useState('')
	const [isGiveChoice, setIsGiveChoice] = useState(false)


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
		if (!cameraPermission) {
			const status = await getCameraPermission()
			if (status !== 'granted') return
		}
		setIsLoading(LoadingEnum.fetching)
		try {
			const photo = await cameraRef.current.takePictureAsync()
			await OrdersStoreService.saveOrderPhoto(photo.uri)
			setIsOpenCamera(false)
		} catch (e) {
			console.log(e)
		} finally {
			setIsLoading(LoadingEnum.success)
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

			if (!result.canceled) {
				const selectedAsset = result.assets[0]
				const selectedImageUri = selectedAsset.uri
				await OrdersStoreService.saveOrderPhoto(selectedImageUri)
				setIsOpenCamera(false)
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
			<TouchableOpacity style={styles.addPhotoButton} onPress={() => setIsOpenCamera(true)}>
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

	return (
		<View style={styles.container}>
			<FlatList
				horizontal
				data={orderDetail.photos ? [{
					filename: '',
					id: 'add_photo_button',
				}, ...orderDetail.photos] : [{ id: 'add_photo_button', filename: '' }]}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
			/>
			{cameraPermission && isOpenCamera && (
				<Modal visible={isOpenCamera}>
					<Camera style={styles.camera} ref={cameraRef}>
						<Box position={'absolute'} top={5} left={5}>
							<TouchableOpacity onPress={() => setIsOpenCamera(false)}>
								<Image source={closeCameraImg} alt={'delete'} />
							</TouchableOpacity>
						</Box>
						<Box position={'absolute'} bottom={5}>
							<TouchableOpacity style={styles.cameraButton} onPress={takePicture}>
								<Image source={btnCamera} />
							</TouchableOpacity>
						</Box>
					</Camera>
				</Modal>
			)}
			<DeleteModal deleteOrderPhoto={() => OrdersStoreService.deleteOrderPhoto(deletedPhotoId)} visible={isDeleteModal}
									 onClose={onCloseModalDelete} />
			{/*	<GiveChoiceCameraModal onCamera={() => setIsOpenCamera(true)}
														 onGallery={onGalleryHandler} visible={isGiveChoice}
														 onClose={() => setIsGiveChoice(false)} />*/}
		</View>
	)
})

const styles = StyleSheet.create({
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
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'black',
	},
	cameraButton: {
		marginBottom: 20,
	},
	cameraButtonText: {
		fontSize: 20,
		color: 'white',
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
