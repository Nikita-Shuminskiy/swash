import React, { useEffect, useState } from 'react'
import { BaseWrapperComponent } from './baseWrapperComponent'
import imgBack from '../assets/Images/backWave.png'
import imgLook from '../assets/Images/lockBlue.png'
import imgLookRed from '../assets/Images/imgLookRed.png'
import { Box, Text } from 'native-base'
import {Image, Modal, StyleSheet} from 'react-native'
import { colors } from '../assets/colors/colors'
import Button from './Button'
import { StatusBar } from 'expo-status-bar'
import * as Notifications from 'expo-notifications'
import {DictionaryEnum} from "../store/DictionaryStore/type";

const GivePermissions = ({ visible, askLocationPermissionHandler, askNotificationPermissionHandler, dictionary }) => {
	const [errorPermission, setErrorPermission] = useState<boolean>(false)
	const onPressGivePermission = () => {
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
		<Modal visible={visible} >

			<BaseWrapperComponent isKeyboardAwareScrollView={true}
								  styleSafeArea={{ backgroundColor: errorPermission ? colors.redLight : colors.white, paddingTop: 0  }}>
				<StatusBar backgroundColor={errorPermission ? colors.redLight : colors.blueLight} />
				<Box justifyContent={'space-between'} alignItems={'center'}
						 backgroundColor={errorPermission ? colors.redLight : colors.blueLight}>
					<Image style={styles.imgLogo} source={errorPermission ? imgLookRed : imgLook} />
					<Box justifyContent={'space-between'} w={'100%'}>
						<Box alignItems={'center'}>
							<Image style={{ width: '100%' }} source={imgBack} />
							{
								errorPermission &&
								<Text fontSize={15} fontFamily={'regular'} color={colors.red} position={'absolute'} bottom={32}>{dictionary[DictionaryEnum.ErrorGettingPermissions]}</Text>
							}
						</Box>
						<Box paddingX={10} h={375} w={'100%'} alignItems={'center'} justifyContent={'space-evenly'}
								 backgroundColor={colors.white}>
							<Box flex={1} alignItems={'center'}>
								<Text fontSize={28} fontFamily={'semiBold'}>{dictionary[DictionaryEnum.GivePermissions]}</Text>
								<Text textAlign={'center'} fontSize={15} fontFamily={'regular'} color={colors.grayLight}>
									{dictionary[DictionaryEnum.WeNeedAskPushGeo]}
								</Text>
							</Box>
							<Box flex={1} w={'100%'}>
								<Button onPress={onPressGivePermission} styleContainer={styles.styleContainerBtn} title={dictionary[DictionaryEnum.GivePermissions]}
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
