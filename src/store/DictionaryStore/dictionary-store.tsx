import {action, makeAutoObservable, makeObservable, observable} from 'mobx'
import {clientApi} from '../../api/Client/clientApi'
import {deviceStorage} from "../../utils/storage/storage";
import {DictionaryEnum} from "./type";

export type LaundryService = {
    [key: string]: string
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
            await this.sendDictionary(language)
        } catch (e) {
            const dictionary = await deviceStorage.getItem('dictionary')
            const selectedLanguage = await deviceStorage.getItem('selectedLanguage')
            const convertDictionary: LaundryService = JSON.parse(dictionary)
            if (!!dictionary) {
                this.setDictionary(convertDictionary)
                this.setSelectedLanguage(selectedLanguage)
            }
            console.log(e.response, 'convertDictionary')
        }
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default new DictionaryStore()
