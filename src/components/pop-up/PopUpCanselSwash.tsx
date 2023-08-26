import React from 'react'
import ModalPopup from '../pop-up'
import { Box, Image, Text } from 'native-base'
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import closeImage from '../../assets/Images/order/closeCircleGray.png'
import Button from '../Button'
import { colors } from '../../assets/colors/colors'

type PopUpCanselSwashProps = {
	visible: boolean
	onClose: () => void
}
const PopUpCanselSwash = ({ visible, onClose }: PopUpCanselSwashProps) => {
	const onPressDelete = () => {

	}
	return (
		<ModalPopup modalHeight={Math.round(Dimensions.get('window').height *  0.2)} style={{}} visible={visible} onClose={onClose}>
			<Box>
				<Box flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
					<Text fontSize={22} fontWeight={'600'}>Cancel Swash ?</Text>
					<TouchableOpacity onPress={onClose}>
						<Image alt={'close-img'} source={closeImage} />
					</TouchableOpacity>
				</Box>
				<Box flexDirection={'row'} mt={3} justifyContent={'space-between'}>
					<Button styleContainer={styles.styleContainerBtn} backgroundColor={colors.blue} colorText={colors.white}
									onPress={onClose} title={'No'} />
					<Button styleContainer={{ ...styles.styleContainerBtn, ...styles.btnYes }} colorText={colors.blue}
									onPress={onPressDelete}
									styleText={colors.blue}
									title={'Yes'} />
				</Box>
			</Box>
		</ModalPopup>
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
export default PopUpCanselSwash
