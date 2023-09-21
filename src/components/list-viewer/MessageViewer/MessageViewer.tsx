import React, { memo, useEffect, useState } from 'react'
import { Box, Text } from 'native-base'
import mockImg from '../../../assets/Images/google.png'
import { BackHandler, Image, Pressable, StyleSheet, TouchableOpacity } from 'react-native'
import { colors } from '../../../assets/colors/colors'
import { DialogType } from '../../../api/ChatApi/type'
import { dateStringFormat } from '../../../utils/commonUtils'
import { BASE_URL } from '../../../api/config'
import AuthStore from '../../../store/AuthStore/auth-store'
import ShowImagesModal from '../../modal/ShowImagesModal'

type MessageViewerProps = {
	message: DialogType
}
const MessageViewer = memo(({ message }: MessageViewerProps) => {
	const [openImg, setOpenImg] = useState(false)
	const isClientMessage = !message.admins_id
	const { clientSettings } = AuthStore

	const imageUrl = `${BASE_URL}${message.image}`
	const clientAvatar = `${BASE_URL}${clientSettings.client.pic}`
	const adminAvatar = `${BASE_URL}${message.admins_pic}`


	return (
		<>
			<Box flexDirection={'row'} mb={4} alignItems={'flex-end'}
					 justifyContent={isClientMessage ? 'flex-end' : 'flex-start'}>
				{!isClientMessage &&
					<Image source={message.admins_pic ? { uri: adminAvatar } : mockImg}
								 style={{ ...styles.imgAvatar, marginRight: 4 }} />
				}

				<Box backgroundColor={isClientMessage ? colors.blue : colors.grayBright} borderRadius={16} p={2}
						 borderBottomLeftRadius={isClientMessage ? 16 : 0}
						 borderBottomRightRadius={!isClientMessage ? 16 : 0} flex={message?.image ? 1 : 0}>
					<Text color={colors.grayLight} mb={message?.image ? 2 : 0} textAlign={isClientMessage ? 'right' : 'left'}
								fontFamily={'regular'}
								fontSize={13}>{isClientMessage ? clientSettings.client.first_name : message.admins_name ?? 'Admin'}</Text>
					{message?.image &&
						<TouchableOpacity onPress={() => setOpenImg(true)}>
							<Image style={styles.imgPhoto} resizeMethod={'resize'} source={{ uri: imageUrl }} />
						</TouchableOpacity>
					}
					<Box maxWidth={'90%'} minWidth={120} mt={message?.image ? 3 : 0}>
						<Text fontFamily={'regular'} color={isClientMessage ? colors.white : colors.black}
									fontSize={15}>{message.text}</Text>
					</Box>
					<Text color={colors.grayLight} textAlign={'right'} fontFamily={'regular'}
								fontSize={13}>{dateStringFormat('hh:mm', message.datetime_create)}</Text>
				</Box>
				{isClientMessage &&
					<Image source={{ uri: clientAvatar }} style={{ ...styles.imgAvatar, marginLeft: 4 }} />}
			</Box>
			<ShowImagesModal image={imageUrl} visible={openImg} onClose={() => setOpenImg(false)} />
		</>
	)
})
const styles = StyleSheet.create({
	imgPhoto: { width: '100%', height: 160, borderRadius: 16 },
	imgAvatar: { width: 32, height: 32, borderRadius: 16 },
})
export default MessageViewer
