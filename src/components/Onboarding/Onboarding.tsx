import React, { useState } from 'react'
import { Box, Text } from 'native-base'
import { observer } from 'mobx-react-lite'
import AuthStore from '../../store/AuthStore/auth-store'
import { colors } from '../../assets/colors/colors'
import Button from '../Button'
import { Image, Modal, StyleSheet } from 'react-native'
import Link from '../Link'
import { BaseWrapperComponent } from '../baseWrapperComponent'
import { StatusBar } from 'expo-status-bar'
import { deviceStorage } from '../../utils/storage/storage'
import DotsOnboarding from './DotsOnboarding'
import {ClientOnboardingType} from "../../api/Client/type";

type OnboardingModalProps = {
	visible: boolean
}

const Onboarding = observer(({ visible }: OnboardingModalProps) => {
	const { setGlobalSettings, globalSettings, setIsOnboarding } = AuthStore
	const [page, setPage] = useState<1 | 2 | 3 | 4 | 5>(1)
	const onPressNext = () => {
		if (page === 5) {
			setIsOnboarding(false)
			return deviceStorage.saveItem('onboarding', 'true')
		}
		// @ts-ignore
		setPage(page + 1)
	}
	const onPressSkip = () => {
		setIsOnboarding(false)
		return deviceStorage.saveItem('onboarding', 'true')
	}

	return (
		<Modal visible={visible}>
			<StatusBar
				hidden={false}
				backgroundColor={colors.white}
				style={'auto'}
				animated={true}
				translucent={true}
			/>
			<BaseWrapperComponent styleSafeArea={{ paddingTop: 0 }}>
				<Image
					resizeMode="contain"
					resizeMethod="resize"
					style={styles.img}
					source={{ uri: getStepData(page, globalSettings.client_app_onboarding).img }}
				/>
				<Box w={'100%'} paddingX={4}>
					<Box alignItems={'center'} position={'relative'} bottom={10}>
						<DotsOnboarding active={page} />
					</Box>
					<Text fontSize={20} textAlign={'center'} fontFamily={'semiBold'}>
						{getStepData(page, globalSettings.client_app_onboarding).text}
					</Text>
					<Button
						onPress={onPressNext}
						styleContainer={styles.styleContainerBtn}
						title={'Next'}
						colorText={colors.white}
						backgroundColor={colors.blue}
					/>
					<Box mt={3}>
						<Link styleText={styles.textLink} text={'Skip'} onPress={onPressSkip} />
					</Box>
				</Box>
			</BaseWrapperComponent>
		</Modal>
	)
})

const styles = StyleSheet.create({
	img: {
		width: '100%',
		flex: 1,
	},
	textLink: {
		fontSize: 16,
		color: colors.gray,
		fontFamily: 'regular',
	},
	styleContainerBtn: {
		width: '100%',
		borderRadius: 50,
		marginTop: 10,
		marginBottom: 10,
	},
})

export default Onboarding
const getStepData = (step: 1 | 2 | 3 | 4 | 5, data: ClientOnboardingType) => {
	switch (step) {
		case 1:
			return { img: data.client_app_onboarding_1, text: data.client_app_onboarding_text_1 }
		case 2:
			return { img: data.client_app_onboarding_2, text: data.client_app_onboarding_text_2 }
		case 3:
			return { img: data.client_app_onboarding_3, text: data.client_app_onboarding_text_3 }
		case 4:
			return { img: data.client_app_onboarding_4, text: data.client_app_onboarding_text_4 }
		case 5:
			return { img: data.client_app_onboarding_5, text: data.client_app_onboarding_text_5 }
		default:
			return { img: data.client_app_onboarding_1, text: data.client_app_onboarding_text_1 }
	}
}
