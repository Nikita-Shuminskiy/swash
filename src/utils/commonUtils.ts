import * as Localization from 'expo-localization'
import NetInfo from '@react-native-community/netinfo'
import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'

export const country = Localization.region;
export const language = Localization.locale;

const checkInternet = async () => {
	const netInfoState = await NetInfo.fetch()
	return netInfoState.isConnected
}

export const dateStringFormat = (formatDate: string, date: string) => {
	if(!date) return ''
	const inputDate = new Date(date);
	return format(inputDate, formatDate, { locale: enUS })
}
