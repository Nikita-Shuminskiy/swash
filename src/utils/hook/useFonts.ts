import * as Font from 'expo-font';

export const useFonts = async () => {
    try {
        await Font.loadAsync({
            'Onest-medium': require('../../assets/font/MYRIADPRO-BOLD.OTF'),
        });
    } catch (e) {
    }
}
