import React from 'react'
import { observer } from 'mobx-react-lite'
import { Box, Text } from 'native-base'
import { Linking, Modal, Platform, StyleSheet } from 'react-native'
import Button from '../Button'
import { colors } from '../../assets/colors/colors'

const PLAY_STORE_URL = ''
const IOS_STORE_URL = ''
type UpdateAppModalProps = {
	visible: boolean
}
const UpdateAppModal = observer(({ visible }: UpdateAppModalProps) => {
	const onPressGoMarket = async () => {
		await Linking.openURL(Platform.OS === 'ios' ? IOS_STORE_URL : PLAY_STORE_URL)
	}
	return (
		<Modal transparent={true} visible={visible}>
			<Box
				backgroundColor={`rgba(0, 0, 0, 0.3)`}
				opacity={0.7}
				position={'absolute'}
				w={'100%'}
				top={0}
				height={'100%'}
			/>
			<Box w={'100%'} paddingX={3} justifyContent={'center'} height={'100%'}>
				<Box
					style={{ paddingHorizontal: 16 }}
					borderRadius={16}
					justifyContent={'space-evenly'}
					flex={1}
					backgroundColor={colors.white}
					maxHeight={300}
				>
					<Box>
						<Text fontSize={22} textAlign={'center'} fontFamily={'semiBold'}>
							An important update has been released, you need to update the application
						</Text>
					</Box>
					<Box w={'100%'}>
						<Button
							styleContainer={styles.styleContainerBtn}
							backgroundColor={colors.blue}
							colorText={colors.white}
							onPress={onPressGoMarket}
							title={'Update'}
						/>
					</Box>
				</Box>
			</Box>
		</Modal>
	)
})
const styles = StyleSheet.create({
	styleContainerBtn: {
		borderRadius: 28,
		height: 56,
	},
	btnYes: {
		borderWidth: 1,
		borderColor: colors.blue,
	},
})
export default UpdateAppModal
