import {action, makeAutoObservable, makeObservable, observable} from 'mobx'
import {clientApi} from '../../api/Client/clientApi'
import {deviceStorage} from "../../utils/storage/storage";

export type LaundryService = {
    [key: string]: {
        EN: string;
        en: string;
    };
}

export class DictionaryStore {
    dictionary: LaundryService | null = null
    selectedLanguage: string = 'en'
    setDictionary = (dictionary: LaundryService) => {
        //console.log(dictionary)
        this.dictionary = dictionary
    }
    setSelectedLanguage = (lan: string) => {
        this.selectedLanguage = lan
    }
    sendDictionary = async (language = 'en') => {
        try {
            const {data} = await clientApi.getDictionary({language: language})
            await deviceStorage.saveItem('dictionary', JSON.stringify(data))
            await deviceStorage.saveItem('selectedLanguage', language)

            this.setDictionary(data)
            this.setSelectedLanguage(language)
        } catch (e) {
            console.log(e.response)
        }
    }
    getDictionaryLocal = async (language = 'en') => {
        try {
            const dictionary = await deviceStorage.getItem('dictionary')
            const selectedLanguage = await deviceStorage.getItem('selectedLanguage')
            const convertDictionary: LaundryService = JSON.parse(dictionary)
            await this.sendDictionary(language)
            /* if (!dictionary) {

                 return
             }*/
            this.setDictionary(convertDictionary)
            this.setSelectedLanguage(selectedLanguage)
        } catch (e) {
            console.log(e.response, 'convertDictionary')
            console.log(e.response)
        }
    }
    constructor() {
        makeAutoObservable(this)
    }
}

export default new DictionaryStore()
