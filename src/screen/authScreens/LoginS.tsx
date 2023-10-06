import React, {useState} from 'react'
import {Image, StyleSheet} from 'react-native'
import {NavigationProp, ParamListBase} from '@react-navigation/native'
import {BaseWrapperComponent} from '../../components/baseWrapperComponent'
import AuthStore from '../../store/AuthStore/auth-store'
import imgLogo from '../../assets/Images/logoSwash.png'
import imgGoogle from '../../assets/Images/google.png'
import imgFacebook from '../../assets/Images/fasebook.png'
import {Box, Text} from 'native-base'
import {colors} from '../../assets/colors/colors'
import Button from '../../components/Button'
import rootStore from '../../store/RootStore/root-store'
import WebView from 'react-native-webview'
import {LoadingEnum} from '../../store/types/types'
import NotificationStore from '../../store/NotificationStore/notification-store'
import {observer} from 'mobx-react-lite'
import {routerConstants} from '../../constants/routerConstants'
import {LoadingIndicatorView} from "../../components/LoadingIndicatorView";
import DictionaryStore from "../../store/DictionaryStore/dictionary-store";
import {DictionaryEnum} from "../../store/DictionaryStore/type";

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
const LoginS = observer(({ navigation }: LoginSProps) => {
	const { setUserAuthData } = AuthStore
	const { setIsLoading } = NotificationStore
	const { OrdersStoreService } = rootStore
	const {dictionary, selectedLanguage} = DictionaryStore

	const [webViewVisible, setWebViewVisible] = useState(false)
	const onPressSingUpGoogle = () => {
		setWebViewVisible(true)
	}
	const onPressSingFacebook = () => {
	}
	const onPressAboutUs = () => {
		navigation.navigate(routerConstants.ABOUT_US)
	}
	const containsSpecialCharacters = (inputString) => {
		try {
			JSON.parse(inputString) // Попытка парсинга JSON
			setIsLoading(LoadingEnum.fetching)
			return false // Если успешно, значит, нет ошибки "Unexpected end of input"
		} catch (error) {
			return true
		}
	}
	const onMessageWebView = (event) => {
		const body = event.nativeEvent.data
		const jsonData = extractJSONFromBody(body)
		if (containsSpecialCharacters(jsonData)) return
		//setIsLoading(LoadingEnum.fetching)
		try {
			const parsedData: UserAuthGoogleData = JSON.parse(jsonData)
			if (parsedData.token) {
				setWebViewVisible(false)
				setUserAuthData(parsedData).then(r => {
					OrdersStoreService.getSettingClient(navigation.navigate)
				})
			}
		} catch (error) {
			console.error('Error parsing JSON:', error)
		} finally {
			setTimeout(() => {
				setIsLoading(LoadingEnum.success)
			}, 4000)
		}
	}

	return (
		<BaseWrapperComponent isKeyboardAwareScrollView={false}>
			{
				!webViewVisible ? (<Box paddingX={5} flex={1} alignItems={'center'} justifyContent={'space-evenly'}>
					<Box alignItems={'center'}>
						<Image alt={'logo'} style={styles.imgLogo} source={imgLogo} />

						<Box w={'100%'} alignItems={'center'}>
							<Text fontSize={28} fontWeight={'600'}>{dictionary[DictionaryEnum.WelcomeToSwash]}</Text>
							<Text fontSize={15} color={colors.grayLight}>{dictionary[DictionaryEnum.ChooseLoginMethod]}</Text>
						</Box>
					</Box>
					<Box alignItems={'center'} w={'100%'}>
						<Button styleContainer={styles.styleContainerBtn} backgroundColor={colors.blue}
										onPress={onPressSingFacebook}
						>

							<Box flexDirection={'row'} alignItems={'center'}>
								<Image style={styles.imgIco} alt={'img-face'} source={imgFacebook} />
								<Text color={colors.white}>
									{dictionary[DictionaryEnum.ContinueWithFacebook]}
								</Text>
							</Box>
						</Button>
						<Button colorText={colors.white} styleContainer={{ ...styles.styleContainerBtn, ...styles.shadow }}
										onPress={onPressSingUpGoogle}>
							<Box flexDirection={'row'} alignItems={'center'}>
								<Image style={styles.imgIco} alt={'img-google'} source={imgGoogle} />
								<Text>
									{dictionary[DictionaryEnum.ContinueWithGoogle]}
								</Text>
							</Box>
						</Button>

					</Box>
					<Button onPress={onPressAboutUs} styleContainer={styles.styleContainerBtn} title={dictionary[DictionaryEnum.AboutSwash]}
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
						{/*	<Box paddingX={10}>
							<Button backgroundColor={colors.blue} colorText={colors.white} onPress={() => setWebViewVisible(false)}
											title={'Exit'} />
						</Box>*/}
					</Box>
				)
			}

		</BaseWrapperComponent>
	)
})
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
		maxWidth: 343,
		width: '100%',
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
