import React from 'react'
import { Image, Modal } from 'react-native'
import { Box } from 'native-base'
import HeaderGoBackTitle from '../HeaderGoBackTitle'

type BaseModalProps = {
	visible: boolean
	image: string
	onClose: () => void
}
const ShowImagesModal = ({ visible, onClose, image }: BaseModalProps) => {
	return (
		<Modal transparent={false} visible={visible}>
			<Box paddingY={4} flex={1}>
				<Box ml={4}>
					<HeaderGoBackTitle goBackPress={onClose} title={''} />
				</Box>
				<Box mt={2}>
					<Image style={{ width: '100%', height: '100%' }} resizeMode={'contain'} source={{ uri: image }} />
				</Box>
			</Box>
		</Modal>
	)
}
export default ShowImagesModal
