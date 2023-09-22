import React from 'react'
import { ImageBackground, Modal, StyleSheet } from 'react-native'
import loadingGif from '../assets/Gif/loadingGif.gif'
import logoImg from '../assets/Images/logoSwash.png'
import backgroundImg from '../assets/Images/backgroundImgLoading.png'
import { Box, Image } from 'native-base'
import { colors } from '../assets/colors/colors'
import { StatusBar } from 'expo-status-bar'

const LoadingGlobal = ({ visible }) => {
	return (
		<Modal visible={visible}>
			<StatusBar hidden={false} style={'auto'} animated={true} translucent={true} />
			<Box backgroundColor={'red'} background={colors.blueLight} flex={1} width={'100%'} alignItems={'center'}
					 justifyContent={'space-evenly'}>
				<ImageBackground alt={'logo'} style={styles.imgBack} source={backgroundImg}>
					<Image alt={'logo'} source={loadingGif} />
				</ImageBackground>
				<Box>
					<Image w={128} h={57.5} alt={'img'} source={logoImg} />
				</Box>
			</Box>

		</Modal>
	)
}
const styles = StyleSheet.create({
	imgBack: {
		maxWidth: 300,
		maxHeight: 357,
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
})
export default LoadingGlobal
