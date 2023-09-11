import React, { useState } from 'react'
import { Avatar, Box, Image } from 'native-base'
import photoImg from '../../../assets/Images/photoWhite.png'
import { colors } from '../../../assets/colors/colors'
import { TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import rootStore from '../../../store/RootStore/root-store'

const AvatarProfile = () => {
	const { AuthStoreService } = rootStore
	const [selectedImageUri, setSelectedImageUri] = useState<string>('https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')
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
				setSelectedImageUri(selectedImageUri)
				AuthStoreService.updateClientPhoto(selectedImageUri)
			}
		} catch (error) {
			console.log('Error selecting image from gallery:', error)
		}
	}
	return (
		<TouchableOpacity onPress={onGalleryHandler}>
			<Box alignItems={'center'}>
				<Image alt={'photo'} w={6} h={6} position={'absolute'} zIndex={2} top={8} source={photoImg} />
				<Box position={'absolute'} w={24} borderRadius={50} zIndex={1} top={0} opacity={0.3} h={24}
						 backgroundColor={colors.black} />
			</Box>
			<Avatar bg='green.500' alignSelf='center' w={24} h={24} source={{
				uri: selectedImageUri,
			}} />
		</TouchableOpacity>
	)
}

export default AvatarProfile
