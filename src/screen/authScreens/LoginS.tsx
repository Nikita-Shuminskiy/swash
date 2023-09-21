import React, { useEffect } from 'react'
import { Image, Linking, StyleSheet } from 'react-native'
import { BaseWrapperComponent } from '../../components/baseWrapperComponent'
import AuthStore from '../../store/AuthStore/auth-store'
import imgLogo from '../../assets/Images/logoSwash.png'
import imgGoogle from '../../assets/Images/google.png'
import imgFacebook from '../../assets/Images/fasebook.png'
import { Box, Text } from 'native-base'
import { colors } from '../../assets/colors/colors'
import Button from '../../components/Button'
import rootStore from '../../store/RootStore/root-store'
import { LoadingEnum } from '../../store/types/types'
import LoadingGlobal from '../../components/LoadingGlobal'
import NotificationStore from '../../store/NotificationStore/notification-store'
import { observer } from 'mobx-react-lite'
import * as Application from 'expo-application'
import * as Google from 'expo-auth-session/providers/google'
import { createAlert } from '../../components/CreateAlert'
import * as WebBrowser from 'expo-web-browser';
import { Prompt } from 'expo-auth-session/src/AuthRequest.types'

WebBrowser.maybeCompleteAuthSession();
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
export const LoginS = observer(({ navigation }: any) => {

	const { authWithGoogle } = AuthStore
	const { setIsLoading, isLoading } = NotificationStore
	const { OrdersStoreService } = rootStore

	const [request, response, promptAsync] = Google.useAuthRequest({
		androidClientId: '764320596484-vn0nd80heq74i90gagss2nu4l7um1eer.apps.googleusercontent.com',
		iosClientId: '764320596484-7s862pjvgf6adrri2s3hdak9gkj0i8n2.apps.googleusercontent.com',
		expoClientId: '764320596484-54jjhrcgb9sft0hrclu8aq8oa848biqa.apps.googleusercontent.com',
		redirectUri: 'https://auth.expo.io/@nick_111122/swash',
		prompt: Prompt.SelectAccount
	})

	useEffect(() => {
		authWithGoogle(Application.androidId).then((data) => {
			OrdersStoreService.getSettingClient(navigation.navigate).then((data) => {
				if (typeof data === 'boolean') {
					!data && setIsLoading(LoadingEnum.success)
				}
			}).catch(() => {
				setIsLoading(LoadingEnum.success)
			})
		}).finally(() => {
			setIsLoading(LoadingEnum.success)
		})
	}, [])

	const loginGoogle = () => {
		promptAsync({  showInRecents: true }).then((data) => {
			if(data) {
				authWithGoogle(Application.androidId).then((data) => {
					OrdersStoreService.getSettingClient(navigation.navigate).then((data) => {
						if (typeof data === 'boolean') {
							!data && setIsLoading(LoadingEnum.success)
						}
					}).catch(() => {
						setIsLoading(LoadingEnum.success)
					})
				}).finally(() => {
					setIsLoading(LoadingEnum.success)
				})
			}
		})
	}
	return (
		<BaseWrapperComponent isKeyboardAwareScrollView={false}>
			<Box paddingX={5} flex={1} alignItems={'center'} justifyContent={'space-evenly'}>
				<Box alignItems={'center'}>
					<Image alt={'logo'} style={styles.imgLogo} source={imgLogo} />

					<Box w={'100%'} alignItems={'center'}>
						<Text fontSize={28} fontWeight={'600'}>Welcome to Swash!</Text>
						<Text fontSize={15} color={colors.grayLight}>Choose the login method that is convenient for you</Text>
					</Box>
				</Box>
				<Box alignItems={'center'} w={'100%'}>
					<Button styleContainer={styles.styleContainerBtn} backgroundColor={colors.blue}
									onPress={loginGoogle}
					>

						<Box flexDirection={'row'} alignItems={'center'}>
							<Image style={styles.imgIco} alt={'img-face'} source={imgFacebook} />
							<Text color={colors.white}>
								Continue with Facebook
							</Text>
						</Box>
					</Button>
					<Button colorText={colors.white} styleContainer={{ ...styles.styleContainerBtn, ...styles.shadow }}
									onPress={() => promptAsync({ showInRecents: true })}>
						<Box flexDirection={'row'} alignItems={'center'}>
							<Image style={styles.imgIco} alt={'img-google'} source={imgGoogle} />
							<Text>
								Continue with Google
							</Text>
						</Box>
					</Button>

				</Box>
				<Button onPress={() => {
				}} styleContainer={styles.styleContainerBtn} title={'About us'}
								colorText={colors.blue} backgroundColor={colors.blueLight} />
			</Box>

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
