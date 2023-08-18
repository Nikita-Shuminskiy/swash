import React from 'react'
import { BaseWrapperComponent } from '../../components/baseWrapperComponent'
import imgBack from '../../assets/Images/backWave.png'
import imgLook from '../../assets/Images/wifiRed.png'
import { Box, Text } from 'native-base'
import { Image, Modal, StyleSheet } from 'react-native'
import { colors } from '../../assets/colors/colors'
import Button from '../../components/Button'
import { StatusBar } from 'expo-status-bar'

type WifiReconnectProps = {
	visible?: boolean
	checkInternet?: () => void
}
const WifiReconnectS = ({ visible, checkInternet }: WifiReconnectProps) => {
	const onPressReconnect = () => {
		checkInternet()
	}

	return (
		<Modal visible={visible}>
			<BaseWrapperComponent styleSafeArea={{ backgroundColor: colors.redLight }}>
				<StatusBar backgroundColor={colors.redLight} />
				<Box flex={1} w={'100%'} justifyContent={'space-between'} alignItems={'center'}
						 backgroundColor={colors.redLight}>
					<Image style={styles.imgLogo} source={imgLook} />
					<Box justifyContent={'space-between'} w={'100%'}>
						<Box alignItems={'center'}>
							<Image style={{ width: '100%' }} source={imgBack} />
						</Box>
						<Box paddingX={10} h={375} w={'100%'} alignItems={'center'} justifyContent={'space-evenly'}
								 backgroundColor={colors.white}>
							<Box flex={1} alignItems={'center'}>
								<Text fontSize={28} fontWeight={'700'}>Bad connection</Text>
								<Text textAlign={'center'} color={colors.grayLight}>
									Check your internet connection and try again
								</Text>
							</Box>
							<Box flex={1} w={'100%'}>
								<Button onPress={onPressReconnect} styleContainer={styles.styleContainerBtn} title={'Reconnect'}
												colorText={colors.white} backgroundColor={colors.red} />
							</Box>

						</Box>
					</Box>
				</Box>
			</BaseWrapperComponent>
		</Modal>
	)
}
const styles = StyleSheet.create({
	imgLogo: {
		width: 300,
		height: 300,
	},
	styleContainerBtn: {
		marginTop: 10,
		marginBottom: 10,
	},
})

export default WifiReconnectS
