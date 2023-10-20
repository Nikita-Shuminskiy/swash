import * as Localization from 'expo-localization'
import NetInfo from '@react-native-community/netinfo'
import { enUS } from 'date-fns/locale'
import { format, isBefore, subYears } from 'date-fns';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {deviceStorage} from "./storage/storage";
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

export const checkToken = async () => {
	const savedToken = await deviceStorage.getItem('token');
	const tokenDate = await deviceStorage.getItem('tokenDate');

	if (savedToken && tokenDate) {
		const currentDate = new Date();
		const oneYearAgo = subYears(currentDate, 1);

		const tokenDateObject = new Date(tokenDate);

		if (isBefore(tokenDateObject, currentDate) && !isBefore(tokenDateObject, oneYearAgo)) {
			//The token is valid and stored for less than a year
			return true
		}
		await deviceStorage.removeItem('token');
		await deviceStorage.removeItem('tokenDate');
		await deviceStorage.removeItem('clients_id')
		return false
	}
}