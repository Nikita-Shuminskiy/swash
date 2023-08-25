import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, StyleSheet } from 'react-native'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { BaseWrapperComponent } from '../../components/baseWrapperComponent'
import AuthStore from '../../store/AuthStore/auth-store'
import imgLogo from '../../assets/Images/logoSwash.png'
import imgGoogle from '../../assets/Images/google.png'
import imgFacebook from '../../assets/Images/fasebook.png'
import { Box, Text } from 'native-base'
import { colors } from '../../assets/colors/colors'
import Button from '../../components/Button'
import rootStore from '../../store/RootStore/root-store'
import WebView from 'react-native-webview'
import { routerConstants } from '../../constants/routerConstants'

function containsSpecialCharacters(inputString) {
	try {
		JSON.parse(inputString) // Попытка парсинга JSON
		return false // Если успешно, значит, нет ошибки "Unexpected end of input"
	} catch (error) {
		// Обработка ошибки парсинга JSON
		if (error instanceof SyntaxError && error.message.includes('Unexpected end of input')) {
			return true // Возвращаем true, если ошибка "Unexpected end of input" обнаружена
		}
		return true // Возвращаем false в случае другой ошибки
	}
}

const uriGoogleAuth = {
	uri:
		'https://s-wash.com/washapi.php/auth_client_by_google?status=client&country=PL&language=PL',
}
const jsCode = 'window.ReactNativeWebView.postMessage(document.documentElement.innerHTML)'
type LoginSProps = {
	navigation: NavigationProp<ParamListBase>
}

export type  UserAuthGoogleData = {
	email: string;
	first_name: string;
	last_name: string;
	clients_id: string;
	message: string;
	name: string;
	pic: string;
	status: string;
	token: string;
}
const LoginS = ({ navigation }: LoginSProps) => {
	const { setUserAuthData } = AuthStore
	const { AuthStoreService } = rootStore

	const [webViewVisible, setWebViewVisible] = useState(false)
	const onPressExitAuthGoogle = () => {
		setWebViewVisible(false)
	}
	const onPressSingUpGoogle = () => {
		setWebViewVisible(true)
	}
	const onPressSingFacebook = () => {
	}
	const onPressAboutUs = () => {

	}

	const extractJSONFromBody = (body) => {
		const startTag = '<body>'
		const endTag = '</body>'
		const startIndex = body.indexOf(startTag)
		const endIndex = body.indexOf(endTag)

		if (startIndex !== -1 && endIndex !== -1) {
			return body.substring(startIndex + startTag.length, endIndex)
		}

		return null
	}
	const onMessageWebView = (event) => {
		const body = event.nativeEvent.data
		const jsonData = extractJSONFromBody(body)

		if (!containsSpecialCharacters(jsonData)) {
			try {
				const parsedData: UserAuthGoogleData = JSON.parse(jsonData)
				if (parsedData.token) {
					setWebViewVisible(false)
					setUserAuthData(parsedData).then(r => {
						// @ts-ignore
						navigation.navigate(routerConstants.PHONE_VERIFY)
					})

				}
			} catch (error) {
				console.error('Error parsing JSON:', error)
			}
		}
	}
	const LoadingIndicatorView = () => {
		return (
			<Box alignItems={'center'} flex={1} w={'100%'} justifyContent={'flex-start'}>
				<ActivityIndicator
					color={colors.blue}
					size='large'
				/>
			</Box>
		)
	}


	return (
		<BaseWrapperComponent isKeyboardAwareScrollView={false}>
			{
				!webViewVisible ? (<Box paddingX={5} flex={1} alignItems={'center'} justifyContent={'space-evenly'}>
					<Box alignItems={'center'}>
						<Image alt={'logo'} style={styles.imgLogo} source={imgLogo} />

						<Box w={'100%'} alignItems={'center'}>
							<Text fontSize={28} fontWeight={'600'}>Welcome to Swash!</Text>
							<Text fontSize={15} color={colors.grayLight}>Choose the login method that is convenient for you</Text>
						</Box>
					</Box>
					<Box w={'100%'}>
						<Button styleContainer={styles.styleContainerBtn} backgroundColor={colors.blue}
										onPress={onPressSingFacebook}
						>

							<Box flexDirection={'row'} alignItems={'center'}>
								<Image style={styles.imgIco} alt={'img-face'} source={imgFacebook} />
								<Text color={colors.white}>
									Continue with Facebook
								</Text>
							</Box>
						</Button>
						<Button colorText={colors.white} styleContainer={{ ...styles.styleContainerBtn, ...styles.shadow }}
										onPress={onPressSingUpGoogle}>
							<Box flexDirection={'row'} alignItems={'center'}>
								<Image style={styles.imgIco} alt={'img-google'} source={imgGoogle} />
								<Text>
									Continue with Google
								</Text>
							</Box>
						</Button>

					</Box>
					<Button onPress={onPressAboutUs} styleContainer={[styles.styleContainerBtn]} title={'About us'}
									colorText={colors.blue} backgroundColor={colors.blueLight} />
				</Box>) : (
					<Box flex={1} w={'100%'}>
						<WebView
							javaScriptEnabled={true}
							mediaCapturePermissionGrantType={'grant'}
							injectedJavaScript={jsCode}
							source={uriGoogleAuth}
							renderLoading={LoadingIndicatorView}
							startInLoadingState={true}
							userAgent='Chrome'
							onMessage={onMessageWebView}
						/>
						<Box paddingX={10}>
							<Button backgroundColor={colors.blue} colorText={colors.white} onPress={onPressExitAuthGoogle}
											title={'Exit'} />
						</Box>
					</Box>
				)
			}

		</BaseWrapperComponent>
	)
}
const styles = StyleSheet.create({
	imgIco: {
		width: 24,
		height: 24,
		marginRight: 10,
	},
	imgLogo: {
		width: 162,
		height: 72.5,
	},
	styleContainerBtn: {
		marginTop: 10,
		marginBottom: 10,
	},
	shadow: {
		backgroundColor: colors.white,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 6,
		},
		shadowOpacity: 0.37,
		shadowRadius: 7.49,

		elevation: 7,
	},
})


export default LoginS
