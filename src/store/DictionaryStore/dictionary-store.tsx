import {makeAutoObservable} from 'mobx'
import {clientApi} from '../../api/Client/clientApi'
import {deviceStorage} from "../../utils/storage/storage";

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
        }
    }
    getDictionaryLocal = async (languages = 'en') => {
        try {
            const selectedLanguage = await deviceStorage.getItem('selectedLanguage')
            await this.sendDictionary(languages ?? selectedLanguage )
        } catch (e) {
        }
    }
}

export default new DictionaryStore()
