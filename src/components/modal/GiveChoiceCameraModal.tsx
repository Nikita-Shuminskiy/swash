import React from 'react'
import { Image, Modal, StyleSheet, TouchableOpacity } from 'react-native'
import { Box, Text } from 'native-base'
import closeImage from '../../assets/Images/order/closeCircleGray.png'
import Button from '../Button'
import { colors } from '../../assets/colors/colors'

type BaseModalProps = {
	visible: boolean
	onClose: () => void
	onCamera: () => void
	onGallery: () => void
}
const GiveChoiceCameraModal = ({ visible, onClose, onCamera, onGallery }: BaseModalProps) => {

	return (
		<Modal transparent={true} visible={visible}>
			<Box backgroundColor={`rgba(0, 0, 0, 0.3)`} opacity={0.7} position={'absolute'} w={'100%'} top={0}
					 height={'100%'} />
			<Box w={'100%'} paddingX={3} justifyContent={'center'} height={'100%'}>
				<Box paddingX={3} borderRadius={16} justifyContent={'space-evenly'} flex={1} backgroundColor={colors.white}
						 maxHeight={186}>
					<Box flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
						<Text fontSize={22} fontWeight={'600'}>Selection</Text>
						<TouchableOpacity onPress={onClose}>
							<Image source={closeImage} />
						</TouchableOpacity>
					</Box>

					<Box flexDirection={'row'} justifyContent={'space-between'}>
						<Button styleContainer={styles.styleContainerBtn} backgroundColor={colors.blue} colorText={colors.white}
										onPress={() => {
											onGallery()
											onClose()
										}} title={'Open Gallery'} />
						<Button styleContainer={{ ...styles.styleContainerBtn, ...styles.btnYes }} colorText={colors.blue}
										onPress={() => {
											onCamera()
											onClose()
										}}
										styleText={colors.blue}
										title={'Open Camera'} />
					</Box>

				</Box>
			</Box>
		</Modal>
	)
}
const styles = StyleSheet.create({
	styleContainerBtn: {
		maxWidth: 168,
		minWidth: 0,
		height: 56,
	},
	btnYes: {
		borderWidth: 1,
		borderColor: colors.blue,
	},
})
export default GiveChoiceCameraModal
