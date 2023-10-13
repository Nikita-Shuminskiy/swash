import React, {useEffect} from 'react'
import {Image, Linking, StyleSheet} from 'react-native'
import {BaseWrapperComponent} from '../../components/baseWrapperComponent'
import imgLogo from '../../assets/Images/logoSwash.png'
import imgGoogle from '../../assets/Images/google.png'
import imgFacebook from '../../assets/Images/fasebook.png'
import {Box, Text} from 'native-base'
import {colors} from '../../assets/colors/colors'
import Button from '../../components/Button'
import {observer} from 'mobx-react-lite'
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import {useNotification} from "../../utils/hook/useNotification";
/*import * as Google from 'expo-auth-session/providers/google'
import {makeRedirectUri, Prompt} from "expo-auth-session";
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import {createAlert} from "../../components/CreateAlert";
import {useNotification} from "../../utils/hook/useNotification";

WebBrowser.maybeCompleteAuthSession()

// "originalFullName": "@nick_111122/swash",
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
}*/
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

    useNotification()
    const loginGoogle = async () => {
        try {
            const data = await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(userInfo.idToken)
            console.log(data)
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
        }
    }

    return (
        <BaseWrapperComponent isKeyboardAwareScrollView={false}>
            <Box paddingX={5} flex={1} alignItems={'center'} justifyContent={'space-evenly'}>
                <Box alignItems={'center'}>
                    <Image alt={'logo'} style={styles.imgLogo} source={imgLogo}/>

                    <Box w={'100%'} alignItems={'center'}>
                        <Text fontSize={28} fontWeight={'600'}>Welcome to Swash!</Text>
                        <Text fontSize={15} color={colors.grayLight}>Choose the login method that is convenient for
                            you</Text>
                    </Box>
                </Box>
                <Box alignItems={'center'} w={'100%'}>
                    <Button styleContainer={styles.styleContainerBtn} backgroundColor={colors.blue}
                            onPress={loginGoogle}
                    >

                        <Box flexDirection={'row'} alignItems={'center'}>
                            <Image style={styles.imgIco} alt={'img-face'} source={imgFacebook}/>
                            <Text color={colors.white}>
                                Continue with Facebook
                            </Text>
                        </Box>
                    </Button>
                    <Button colorText={colors.white} styleContainer={{...styles.styleContainerBtn, ...styles.shadow}}
                            onPress={loginGoogle}>

                        <Box flexDirection={'row'} alignItems={'center'}>
                            <Image style={styles.imgIco} alt={'img-google'} source={imgGoogle}/>
                            <Text>
                                Continue with Google
                            </Text>
                        </Box>
                    </Button>

                </Box>
                <Button onPress={() => {
                }} styleContainer={styles.styleContainerBtn} title={'About us'}
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
