import {useEffect} from "react";
import messaging from "@react-native-firebase/messaging";
import {authApi} from "../../api/authApi";
import notifee, {AndroidColor, AndroidImportance, AndroidVisibility, EventType} from "@notifee/react-native";
import * as Notifications from 'expo-notifications';
import {NotificationResponse} from "../../api/Client/type";
import rootStore from "../../store/RootStore/root-store";
const setCategories = async () => {
    await notifee.setNotificationCategories([
        {
            id: 'iosDefault',
            actions: [
                {
                    id: 'ok',
                    title: 'MAP',
                    foreground: true,
                },
                {
                    id: 'delete-chat',
                    title: 'Cansel',
                    destructive: true,
                    foreground: true,
                    // Only show if device is unlocked
                    authenticationRequired: true,
                },
            ],
        },
    ]);
}
const createChannel = async () => {
    return await notifee.createChannel({
        id: 'id-def',
        name: 'Default channel',
        vibration: true,
        visibility: AndroidVisibility.PUBLIC,
        sound: 'default',
        lights: true,
        badge: true,
        lightColor: AndroidColor.BLUE,
        importance: AndroidImportance.HIGH,
    }) // return channelId
}
export const onDisplayNotification = async (data) => {
    await setCategories() // for ios
    const dataAndroid = JSON.parse(data.data.android)
    const dataIos = JSON.parse(data.data.ios)
    const channelId = await createChannel()
    await notifee.displayNotification({
        title: data.data.title,
        body: data.data.body,
        data: {
            route: data.data.route,
        },
        ios: {
            categoryId: 'iosDefault',
            threadId: "iosDefault",
            targetContentId: "iosDefault",
            interruptionLevel: "active",
            badgeCount: 0,
            sound: "default",
            foregroundPresentationOptions: {
                banner: true,
                sound: true,
                badge: true,
                list: true,
                alert: true
            },
            launchImageName: "notification_icon",
            attachments: [{
                url: "https://cdn.vox-cdn.com/thumbor/MbYxeyxG82sFlibdnv9Br1aCLg8=/1400x1400/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/24395697/bkq6gtrpcnw43vsm5zm62q3z.png"
            }],
            ...dataIos
        },
        android: {
            channelId,
            lightUpScreen: true,
            smallIcon: 'notification_icon',
            ...dataAndroid
        }
    })
}
export const useNotification = (isAuth: boolean) => {
    const {AuthStoreService} = rootStore
    useEffect(() => {
        if (isAuth) {
            requestUserPermission().then((data) => {
                if (data) {
                    messaging()
                        .getToken()
                        .then((token) => {
                            console.log(token)
                            sendToken(token);
                        });
                }
            })
        }
        ;(async () => {
            //for ios
            await notifee.requestPermission({
                sound: true,
                announcement: true,
                alert: true,
                // provisional: true, // тихие увед
                criticalAlert: true,
            });
        })()
    }, [isAuth]);
    useEffect(() => {
        // дергается при открытом приложении
        const unsubscribeForegroundEvent = notifee.onForegroundEvent(async (event) => {
            const {
                type,
                detail: {notification},
            } = event
            const dataPush: NotificationResponse = JSON.parse(<string>notification.data.route)
            if (dataPush?.type === 'message') {
                await notifee.cancelNotification(notification.id)
            }
            if (type === EventType.PRESS || event?.detail?.pressAction?.id) {
                await AuthStoreService.processingNotificationResponse(JSON.parse(<string>notification.data.route))
                await notifee.cancelNotification(notification.id)
            }
        })
        // дергается при фоновом и убитом стейте
        notifee.onBackgroundEvent(async (event) => {
            const {
                type,
                detail: {notification},
            } = event
            if (type === EventType.PRESS || event?.detail?.pressAction?.id) {
                await AuthStoreService.processingNotificationResponse(JSON.parse(<string>notification.data.route))
                await notifee.cancelNotification(notification.id)
            }
        })
        let unsubscribeOnMessage: () => void = () => {
            }
        ;(async () => {
            unsubscribeOnMessage = messaging().onMessage(onDisplayNotification)
        })()
        return () => {
            unsubscribeForegroundEvent()
            unsubscribeOnMessage()
        }
    }, [])
};


const requestUserPermission = async () => {
    try {
        const authStatus = await messaging().requestPermission();
        // await messaging().registerDeviceForRemoteMessages();
        return authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    } catch (e) {
        return false
    }
}
const sendToken = async (token: string) => {
    try {
        await authApi.sendDeviceToken(token);
    } catch (e) {
        console.log(e, 'sendDeviceToken');
    }
}