import React, { useState } from 'react'
import { BaseWrapperComponent } from '../../components/baseWrapperComponent'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { colors } from '../../assets/colors/colors'
import { StatusBar } from 'expo-status-bar'
import { Box, Text } from 'native-base'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import listImg from '../../assets/Images/listTermUse.png'
import imgBack from '../../assets/Images/backWave.png'
import Button from '../../components/Button'
import { CheckBoxs } from '../../components/CheckBox'

type TermsOfUseSProps = {
	navigation: NavigationProp<ParamListBase>
}
const TermsOfUseS = ({ navigation }: TermsOfUseSProps) => {
	const [checkToc, setCheckToc] = useState(false)
	const [checkLegal, setCheckLegal] = useState(false)
	const [disBtn, setDisBtn] = useState(false)
	const onPressContinue = () => {
		if (!checkLegal || !checkToc) {
			setDisBtn(true)
		}
	}
	const onPressTocHandler = (value) => {
		setCheckToc(value)
		setDisBtn(false)
	}
	const onPressLegalHandler = (value) => {
		setCheckLegal(value)
		setDisBtn(false)
	}
	const styleDisBtn = !checkLegal || !checkToc ? 'rgba(0,148,255,0.45)' : colors.blue
	return (
		<BaseWrapperComponent styleSafeArea={{ backgroundColor: colors.blueLight }}>
			<StatusBar backgroundColor={colors.blueLight} />
			<Box flex={1} w={'100%'} justifyContent={'space-between'} alignItems={'center'}
					 backgroundColor={colors.blueLight}>
				<Image style={styles.imgLogo} source={listImg} />
				<Box justifyContent={'space-between'} w={'100%'}>
					<Box alignItems={'center'}>
						<Image style={{ width: '100%' }} source={imgBack} />
					</Box>
					<Box paddingX={2} h={375} w={'100%'} alignItems={'center'} justifyContent={'space-evenly'}
							 backgroundColor={colors.white}>
						<Box flex={1} w={'100%'} alignItems={'center'}>
							<Text fontSize={28} fontWeight={'700'}>Terms of Use</Text>
							<Box mt={3} w={'100%'}>
								<Box borderRadius={16} flexDirection={'row'} justifyContent={'flex-start'} alignItems={'center'}
										 p={3} backgroundColor={colors.blueLight}>
									<CheckBoxs value={false} onPress={onPressTocHandler} />

									<Box flexDirection={'row'} justifyContent={'flex-start'}
											 alignItems={'center'}>
										<Text ml={2} fontSize={15}>I agree with{' '}</Text>
										<TouchableOpacity style={styles.link}>
											<Text color={colors.blue}>TOS</Text>
										</TouchableOpacity>
									</Box>
								</Box>
								<Box borderRadius={16} mt={3} flexDirection={'row'} justifyContent={'flex-start'}
										 alignItems={'center'}
										 p={3} backgroundColor={colors.blueLight}>
									<CheckBoxs value={false} onPress={onPressLegalHandler} />
									<Box flexDirection={'row'} justifyContent={'flex-start'}
											 alignItems={'center'}>
										<Text ml={2} fontSize={15}>I agree with{' '}</Text>
										<TouchableOpacity style={styles.link}>
											<Text color={colors.blue}>Legal Notice</Text>
										</TouchableOpacity>
									</Box>
								</Box>
							</Box>
						</Box>
						<Box flex={1} alignItems={'center'} w={'100%'} justifyContent={'center'}>
							<Button disabled={disBtn} onPress={onPressContinue} styleContainer={{ ...styles.styleContainerBtn }}
											title={'Continue'}
											colorText={colors.white} backgroundColor={styleDisBtn} />
						</Box>

					</Box>
				</Box>
			</Box>
		</BaseWrapperComponent>
	)
}
const styles = StyleSheet.create({
	disBtn: {
		opacity: 0.1,
	},
	link: { borderBottomWidth: 1, borderBottomColor: colors.blue },
	imgLogo: {},
	styleContainerBtn: {
		maxWidth: 280,
		borderRadius: 50,
		marginBottom: 20,
	},
})

export default TermsOfUseS
