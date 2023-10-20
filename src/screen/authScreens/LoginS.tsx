import React from 'react'
import {Image, StyleSheet} from 'react-native'
import {BaseWrapperComponent} from '../../components/baseWrapperComponent'
import imgLogo from '../../assets/Images/logoSwash.png'
import imgGoogle from '../../assets/Images/google.png'
import imgFacebook from '../../assets/Images/fasebook.png'
import {Box, Text} from 'native-base'
import {colors} from '../../assets/colors/colors'
import Button from '../../components/Button'
import {observer} from 'mobx-react-lite'
import {GoogleSignin, statusCodes} from '@react-native-google-signin/google-signin';
import NotificationStore from "../../store/NotificationStore/notification-store";
import rootStore from "../../store/RootStore/root-store";
import DictionaryStore from "../../store/DictionaryStore/dictionary-store";
import {DictionaryEnum} from "../../store/DictionaryStore/type";
import {routerConstants} from "../../constants/routerConstants";
import {useNotification} from "../../utils/hook/useNotification";

GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    webClientId: '298228729066-qtmrfm78vfcs6nmhsup9q5hhp3ilbasu.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    hostedDomain: '', // specifies a hosted domain restriction
    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    accountName: '', // [Android] specifies an account name on the device that should be used
    iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
    openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
    profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
});
/*androidClientId: '298228729066-qtmrfm78vfcs6nmhsup9q5hhp3ilbasu.apps.googleusercontent.com',
    expoClientId: '298228729066-qtmrfm78vfcs6nmhsup9q5hhp3ilbasu.apps.googleusercontent.com',*/
export const LoginS = observer(({navigation}: any) => {
    const {setIsLoading} = NotificationStore
    const {OrdersStoreService, AuthStoreService} = rootStore
    const {dictionary, selectedLanguage} = DictionaryStore

    const loginGoogle = async () => {
        try {
            const data = await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const token = await AuthStoreService.authWithGoogle({
                server_auth_code: userInfo.serverAuthCode,
                id_token: userInfo.idToken,
                language: selectedLanguage ?? 'en'
            })
            if (token) {
                await OrdersStoreService.getSettingClient(navigation.navigate, true)
            }
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                console.log('SIGN_IN_CANCELLED')
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
                console.log('IN_PROGRESS')
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
                console.log('PLAY_SERVICES_NOT_AVAILABLE')
            } else {
                // some other error happened
            }
        } finally {
        }
    }
    const onPressAboutUs = () => {
        navigation.navigate(routerConstants.ABOUT_US)
    }
    return (
        <BaseWrapperComponent isKeyboardAwareScrollView={false}>
            <Box paddingX={5} flex={1} alignItems={'center'} justifyContent={'space-evenly'}>
                <Box alignItems={'center'}>
                    <Image alt={'logo'} style={styles.imgLogo} source={imgLogo}/>

                    <Box w={'100%'} alignItems={'center'}>
                        <Text fontSize={28} fontWeight={'600'}>{dictionary[DictionaryEnum.WelcomeToSwash]}</Text>
                        <Text fontSize={15}
                              color={colors.grayLight}>{dictionary[DictionaryEnum.ChooseLoginMethod]}</Text>
                    </Box>
                </Box>
                <Box alignItems={'center'} w={'100%'}>
                    <Button styleContainer={styles.styleContainerBtn} backgroundColor={colors.blue}
                            onPress={loginGoogle}
                    >

                        <Box flexDirection={'row'} alignItems={'center'}>
                            <Image style={styles.imgIco} alt={'img-face'} source={imgFacebook}/>
                            <Text color={colors.white}>
                                {dictionary[DictionaryEnum.ContinueWithFacebook]}
                            </Text>
                        </Box>
                    </Button>
                    <Button colorText={colors.white} styleContainer={{...styles.styleContainerBtn, ...styles.shadow}}
                            onPress={loginGoogle}>
                        <Box flexDirection={'row'} alignItems={'center'}>
                            <Image style={styles.imgIco} alt={'img-google'} source={imgGoogle}/>
                            <Text>
                                {dictionary[DictionaryEnum.ContinueWithGoogle]}
                            </Text>
                        </Box>
                    </Button>

                </Box>
                <Button onPress={onPressAboutUs} styleContainer={styles.styleContainerBtn}
                        title={dictionary[DictionaryEnum.AboutSwash]}
                        colorText={colors.blue} backgroundColor={colors.blueLight}/>
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
