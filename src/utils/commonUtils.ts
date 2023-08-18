import * as Localization from 'expo-localization';
import NetInfo from '@react-native-community/netinfo'

export const country = Localization.region;
export const language = Localization.locale;
const checkInternet = async () => {
	const netInfoState = await NetInfo.fetch()
	return netInfoState.isConnected
}
