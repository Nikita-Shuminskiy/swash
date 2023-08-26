import React, { useEffect, useRef, useState } from 'react'
import { FlatList, Image, ImageBackground, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Camera } from 'expo-camera'
import addPhotoImage from '../assets/Images/order/add_photo.png'
import { observer } from 'mobx-react-lite'
import OrdersStore from '../store/OrdersStore/orders-store'
import rootStore from '../store/RootStore/root-store'
import deleteImg from '../assets/Images/order/closeCircleGray.png'
import { Box } from 'native-base'
import DeleteModal from './modal/DeleteModal'

const AddPhotoComponent = observer(() => {
	const { orders, saveOrderPhoto } = OrdersStore
	const { OrdersStoreService } = rootStore
	const [images, setImages] = useState([])
	const [cameraPermission, setCameraPermission] = useState(null)
	const [isOpenCamera, setIsOpenCamera] = useState(false)
	const [isDeleteModal, setIsDeleteModal] = useState(false)

	const cameraRef = useRef(null)

	useEffect(() => {
		getPermission()
	}, [])

	const getPermission = async () => {
		const { status } = await Camera.requestCameraPermissionsAsync()
		setCameraPermission(status === 'granted')
	}
	const openCameraHandler = () => {
		setIsOpenCamera(true)
	}
	const takePicture = async () => {
		if (!cameraPermission) {
			getPermission()
		}
		if (cameraRef.current) {
			const photo = await cameraRef.current.takePictureAsync()
			// Используем uri из фотографии напрямую

			const formData = new FormData()
			// @ts-ignore
			formData.append('image', { uri: photo.uri,
				name: 'image.jpg',
				type: 'image/jpeg',
			})

			// @ts-ignore
			await saveOrderPhoto(formData._parts[0][1].uri)
			setImages([{ uri: photo.uri, key: String(images.length) }, ...images])
			setIsOpenCamera(false)
		}
	}
	const onPressDeletePhoto = () => {
		setIsDeleteModal(true)
	}
	const onCloseModalDelete = () => {
		setIsDeleteModal(false)
	}
	return (
		<View style={styles.container}>
			<FlatList
				horizontal
				data={[{ key: 'add_photo_button' }, ...images]}
				renderItem={({ item }) => (
					item.key === 'add_photo_button' ? (
						<TouchableOpacity style={styles.addPhotoButton} onPress={openCameraHandler}>
							<Image source={addPhotoImage} alt={'add_photo'} />
						</TouchableOpacity>
					) : (
						<ImageBackground source={{ uri: item.uri }} borderRadius={16} style={styles.image}>
							<TouchableOpacity onPress={onPressDeletePhoto}>
								<Image style={styles.deleteImg} source={deleteImg} alt={'delete'} />
							</TouchableOpacity>
						</ImageBackground>
					)
				)}
				keyExtractor={(item) => item.key}
			/>
			{cameraPermission && isOpenCamera && (
				<Modal visible={isOpenCamera}>
					<Camera style={styles.camera} ref={cameraRef}>
						<TouchableOpacity style={styles.cameraButton} onPress={takePicture}>
							<Text style={styles.cameraButtonText}>Сфотографировать</Text>
						</TouchableOpacity>
					</Camera>
				</Modal>
			)}
			<DeleteModal visible={isDeleteModal} onClose={onCloseModalDelete}/>
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
