import {StatusBar} from 'expo-status-bar'
import RootNavigation from './src/navigation/RootNavigation'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import {NativeBaseProvider} from 'native-base'
import {LogBox} from 'react-native'
import {useFonts} from '@expo-google-fonts/inter/useFonts'
import {NavigationContainer} from '@react-navigation/native'
import messaging from "@react-native-firebase/messaging";
import {onDisplayNotification} from "./src/utils/hook/useNotification";
import NavigationStore from "./src/store/NavigationStore/navigation-store";

LogBox.ignoreLogs([
	'In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.',
])
// Temporary solution until the problem is officially fixed
// https://github.com/GeekyAnts/NativeBase/issues/5758
/*spy((ev) => {
	if(ev.type === 'action') {
		console.log(ev, 'ev action')
	}
})*/
messaging().setBackgroundMessageHandler(onDisplayNotification)
export default function App() {
	const {setNavigation} = NavigationStore
	let [fontsLoaded] = useFonts({
		'regular': require('./assets/font/MyriadPro-Regular.ttf'), //font weight 400
		'bold': require('./assets/font/MyriadPro-Bold.ttf'), // 700
		'semiBold': require('./assets/font/MyriadPro-Semibold.ttf'),// 600
	})

	if (!fontsLoaded) {
		return null
	}
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<NativeBaseProvider>
				<StatusBar hidden={false} style={'auto'} animated={true} translucent={true} />
				<NavigationContainer ref={(navigationRef) => {
					setNavigation(navigationRef);
				}}>
					<RootNavigation />
				</NavigationContainer>
			</NativeBaseProvider>
		</GestureHandlerRootView>
	)
}

