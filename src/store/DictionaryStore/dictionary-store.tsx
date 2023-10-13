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
        this.dictionary = dictionary
    }
    setSelectedLanguage = (lan: string) => {
        this.selectedLanguage = lan
    }
    sendDictionary = async (language) => {
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
            const selectedLanguage = await deviceStorage.getItem('selectedLanguage')
            await this.sendDictionary(selectedLanguage ?? languages)
        } catch (e) {
        }
    }
}

export default new DictionaryStore()
