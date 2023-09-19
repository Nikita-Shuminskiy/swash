import React from 'react'
import { Box, Text } from 'native-base'
import mockImg from '../../../assets/Images/google.png'
import { Image } from 'react-native'
import { colors } from '../../../assets/colors/colors'

type MessageViewerProps = {
	message: any
}
const MessageViewer = ({ message }: MessageViewerProps) => {
	return (
		<Box flexDirection={'row'} alignItems={'flex-end'}>
			<Image source={mockImg} style={{ width: 32, height: 32, marginRight: 4 }} />
			<Box backgroundColor={colors.grayBright} borderRadius={16} p={3} borderBottomLeftRadius={0}
					 borderBottomRightRadius={0}>
				<Text color={colors.grayLight} fontFamily={'regular'} fontSize={13}>Ameli</Text>
				<Text fontFamily={'regular'} maxWidth={'90%'} fontSize={15}>Hi, please choose topic or just write вы ава влорипамс риот льдб
					льтори пмнае ygvbhuinj okpl pkoijhyu пеак пнгр ijokpl[ koij  эждл ор олд жэ длщшог рнhyg hujiko lp;p lokij uhygt yhuj ikolp; l okijuhy пеап yhuj ikolphyugtfr gyuh ijokp kij hyugtfr gyuhijokp l </Text>
				<Text color={colors.grayLight} textAlign={'right'} fontFamily={'regular'} fontSize={13}>10:12</Text>
			</Box>
		</Box>
	)
}

export default MessageViewer
