import {makeAutoObservable} from 'mobx'
import {NavigationContainerRef} from "@react-navigation/native";
import {NotificationResponse} from "../../api/Client/type";

export class NavigationStore {
    navigation: NavigationContainerRef<any> | null = null
    notification: NotificationResponse | null = null
    setNavigation = (navigation: NavigationContainerRef<ReactNavigation.RootParamList>) => {
        this.navigation = navigation
    }
    setNotification = (notificationResponse: NotificationResponse | null) => {
        this.notification = notificationResponse
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default new NavigationStore()
