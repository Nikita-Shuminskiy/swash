import React from 'react'
import { Image, Modal } from 'react-native'
import { Box } from 'native-base'
import HeaderGoBackTitle from '../HeaderGoBackTitle'
import { BaseWrapperComponent } from '../baseWrapperComponent'

type BaseModalProps = {
	visible: boolean
	image: string
	onClose: () => void
}
const ShowImagesModal = ({ visible, onClose, image }: BaseModalProps) => {
	return (
		<Modal transparent={false} visible={visible}>
			<BaseWrapperComponent isKeyboardAwareScrollView={false}>
				<Box ml={4} flex={1}>
					<HeaderGoBackTitle goBackPress={onClose} title={''} />
				</Box>
				<Box paddingY={4}>
					<Box mt={2}>
						<Image style={{ width: '100%', height: '100%' }} resizeMode={'contain'} source={{ uri: image }} />
					</Box>
				</Box>
			</BaseWrapperComponent>
		</Modal>
	)
}
export default ShowImagesModal
