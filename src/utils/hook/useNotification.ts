import {useEffect} from "react";
import messaging from "@react-native-firebase/messaging";
import * as Notifications from 'expo-notifications';
import {AndroidNotificationPriority} from 'expo-notifications';
import {authApi} from "../../api/authApi";
import AuthStore from "../../store/AuthStore/auth-store";

const sendToken = async (token: string) => {
    try {
        const {data} = await authApi.sendDeviceToken(token)
    } catch (e) {
        console.log(e)
    }
}
const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    return authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL
}
export const useNotification = () => {
    const {isAuth} = AuthStore

    useEffect(() => {
        if (isAuth) {
            if (requestUserPermission()) {
                messaging()
                    .getToken()
                    .then((token) => {
                        sendToken(token)
                    });
            }

            // Handle user clicking on a notification and open the screen
            const handleNotificationClick = () => { // response
                //if (user.role === 'volunteer') return setRedirectFromNotification(routerConstants.DASHBOARD)

            };

            // Listen for user clicking on a notification
            const notificationClickSubscription =
                Notifications.addNotificationResponseReceivedListener(
                    handleNotificationClick
                );

            // Handle user opening the app from a notification (when the app is in the background)
            messaging().onNotificationOpenedApp((remoteMessage) => {
            });

            // Check if the app was opened from a notification (when the app was completely quit)
            messaging()
                .getInitialNotification()
                .then((remoteMessage) => {
                    // console.log(remoteMessage, 'getInitialNotification')
                });

            // Handle push notifications when the app is in the background
            messaging().setBackgroundMessageHandler(async (remoteMessage) => {
                console.log(remoteMessage)
                console.log("Message handled in the background!");
            });

            // Handle push notifications when the app is in the foreground
            const handlePushNotification = async (remoteMessage) => {
                console.log('Handle push notifications when the app is in the foreground')
                const notification = {
                    title: remoteMessage.notification.title,
                    body: remoteMessage.notification.body,
                    data: remoteMessage.data, // optional data payload
                    sound: true,
                    vibrate: [12, 44, 11, 33, 11],
                    priority: AndroidNotificationPriority.MAX
                };
                // Schedule the notification with a null trigger to show immediately
                await Notifications.scheduleNotificationAsync({
                    content: notification,
                    trigger: null,
                });
            };

            const unsubscribe = messaging().onMessage(handlePushNotification);

            return () => {
                unsubscribe();
                notificationClickSubscription.remove();
            };
        }
    }, [isAuth]);
}
