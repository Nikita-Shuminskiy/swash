import {useEffect} from "react";
import messaging from "@react-native-firebase/messaging";
import * as Notifications from 'expo-notifications';
import {Platform} from "react-native";
import {authApi} from "../../api/authApi";
import AuthStore from "../../store/AuthStore/auth-store";

const sendToken = async (token: string) => {
    try {
      await authApi.sendDeviceToken(token)
    } catch (e) {
    }
}


const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    return authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL
}
export const useNotification = () => {
    const { isAuth} = AuthStore

    useEffect(() => {
        if(isAuth) {
            if (requestUserPermission()) {
                messaging()
                    .getToken()
                    .then((token) => {
                        sendToken(token)
                    });
            }
            // Set up the notification handler for the app
            Notifications.setNotificationHandler({
                handleNotification: async () => ({
                    shouldShowAlert: true,
                    shouldPlaySound: true,
                    shouldSetBadge: false,
                }),
            });

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
                handleNotificationClick()
            });

            // Check if the app was opened from a notification (when the app was completely quit)
            messaging()
                .getInitialNotification()
                .then((remoteMessage) => {
                });

            // Handle push notifications when the app is in the background
            messaging().setBackgroundMessageHandler(async (remoteMessage) => {
                console.log("Message handled in the background!");
            });

            // Handle push notifications when the app is in the foreground
            const handlePushNotification = async (remoteMessage) => {
                console.log('Handle push notifications when the app is in the foreground')
                const notification = {
                    title: remoteMessage.notification.title,
                    body: remoteMessage.notification.body,
                    data: remoteMessage.data, // optional data payload
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
