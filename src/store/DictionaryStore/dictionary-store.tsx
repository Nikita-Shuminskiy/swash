import {action, makeAutoObservable, makeObservable, observable} from 'mobx'
import {clientApi} from '../../api/Client/clientApi'
import {deviceStorage} from "../../utils/storage/storage";
import {DictionaryEnum} from "./type";
import {language} from "../../utils/commonUtils";

export type DictionaryType = {
    [key: string]: string
}

export class DictionaryStore {
    dictionary: DictionaryType | null = null
    selectedLanguage: string = 'en'

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }
    setDictionary = (dictionary: DictionaryType) => {
        //console.log(dictionary)
        this.dictionary = dictionary
    }
    setSelectedLanguage = (lan: string) => {
        console.log(lan)
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
    getDictionaryLocal = async (languages = 'en') => {
        try {
            await this.sendDictionary(languages)
        } catch (e) {
            const dictionary = await deviceStorage.getItem('dictionary')
            const selectedLanguage = await deviceStorage.getItem('selectedLanguage')
            const convertDictionary: DictionaryType = JSON.parse(dictionary)
            if (!!dictionary) {
                this.setDictionary(convertDictionary)
                this.setSelectedLanguage(selectedLanguage)
            }
            console.log(e.response, 'convertDictionary')
        }
    }
}

export default new DictionaryStore()
