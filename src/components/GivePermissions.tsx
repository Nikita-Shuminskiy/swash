import React, { useState } from 'react'
import { BaseWrapperComponent } from './baseWrapperComponent'
import imgBack from '../assets/Images/backWave.png'
import imgLook from '../assets/Images/lockBlue.png'
import imgLookRed from '../assets/Images/imgLookRed.png'
import { Box, Modal, Text } from 'native-base'
import { Image, StyleSheet } from 'react-native'
import { colors } from '../assets/colors/colors'
import Button from './Button'
import { StatusBar } from 'expo-status-bar'

const GivePermissions = ({visible, askLocationPermissionHandler, askNotificationPermissionHandler}) => {
	const [errorPermission, setErrorPermission] = useState<boolean>(false)

	const onPressAboutUs = () => {
		Promise.all([
			askNotificationPermissionHandler(),
			askLocationPermissionHandler(),
		]).then(([notificationStatus, locationStatus]) => {
			if (notificationStatus !== 'granted' || locationStatus !== 'granted') {
				return setErrorPermission(true)
			} else {
				setErrorPermission(false)
			}
		}).catch(error => {
			console.log('Promise all')
		})
	}
	return (
		<Modal isOpen={visible}>
		<BaseWrapperComponent styleSafeArea={{ backgroundColor: errorPermission ? colors.redLight : colors.blueLight }}>
			<StatusBar backgroundColor={errorPermission ? colors.redLight : colors.blueLight} />
			<Box flex={1} w={'100%'} justifyContent={'space-between'} alignItems={'center'}
					 backgroundColor={errorPermission ? colors.redLight : colors.blueLight}>
				<Image style={styles.imgLogo} source={errorPermission ? imgLookRed : imgLook} />
				<Box justifyContent={'space-between'} w={'100%'}>
					<Box alignItems={'center'}>
						<Image style={{ width: '100%' }} source={imgBack} />
						{
							errorPermission &&
							<Text fontSize={15} color={colors.red} position={'absolute'} bottom={32}>Error in getting
								permissions</Text>
						}
					</Box>
					<Box paddingX={10} h={375} w={'100%'} alignItems={'center'} justifyContent={'space-evenly'}
							 backgroundColor={colors.white}>
						<Box flex={1} alignItems={'center'}>
							<Text fontSize={28} fontWeight={'700'}>Give permissions</Text>
							<Text textAlign={'center'} color={colors.grayLight}>
								We need to ask you for camera, geo, push permissions. Without them application wouldn’t work properly
							</Text>
						</Box>
						<Box flex={1} w={'100%'}>
							<Button onPress={onPressAboutUs} styleContainer={styles.styleContainerBtn} title={'Give permissions'}
											colorText={colors.white} backgroundColor={errorPermission ? colors.red : colors.blue} />
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
		width: 316,
		height: 357,
	},
	styleContainerBtn: {
		width: '100%',
		marginTop: 10,
		marginBottom: 10,
	},
})

export default GivePermissions