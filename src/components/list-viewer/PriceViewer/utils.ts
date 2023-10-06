import {DictionaryType} from "../../../store/DictionaryStore/dictionary-store";
import Outerwear from "../../../assets/Images/Сlothing/Outerwear.png";
import ShirtsJackets from "../../../assets/Images/Сlothing/ShirtsJackets.png";
import tShirtTop from "../../../assets/Images/Сlothing/T-shirts-tops.png";
import PulloversSweaters from "../../../assets/Images/Сlothing/PulloversSweaters.png";
import PantsShorts from "../../../assets/Images/Сlothing/PantsShorts.png";
import SkirtsDresses from "../../../assets/Images/Сlothing/SkirtsDresses.png";
import UnderWearSocks from "../../../assets/Images/Сlothing/UnderwearSocks.png";
import ChildrenClothing from "../../../assets/Images/Сlothing/ChildrensСlothing.png";
import Bedding from "../../../assets/Images/Сlothing/Bedding.png";
import {DictionaryEnum} from "../../../store/DictionaryStore/type";

export const getInfoPriceElement = (id: string, dictionary: DictionaryType) => {
    let DATA_PRICES = {
        '1': {
            img: Outerwear,
            name: dictionary[DictionaryEnum.Outerwear]
        },
        '2': {
            img: ShirtsJackets,
            name: dictionary[DictionaryEnum.ShirtsJackets]
        },
        '3': {
            img: tShirtTop,
            name: dictionary[DictionaryEnum.TShirtsTops]
        },
        '4': {
            img: PulloversSweaters,
            name: dictionary[DictionaryEnum.PulloversSweaters]
        },
        '5': {
            img: PantsShorts,
            name: dictionary[DictionaryEnum.PantsShorts]
        },
        '6': {
            img: SkirtsDresses,
            name: dictionary[DictionaryEnum.SkirtsDresses]
        },
        '7': {
            img: UnderWearSocks,
            name: dictionary[DictionaryEnum.UnderwearSocks]
        },
        '8': {
            img: ChildrenClothing,
            name: dictionary[DictionaryEnum.ChildrensClothing]
        },
        '9': {
            img: Bedding,
            name: dictionary[DictionaryEnum.Bedding]
        },
    }
    return DATA_PRICES[id]
}