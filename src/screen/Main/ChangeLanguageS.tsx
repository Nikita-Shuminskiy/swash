import React, {useState} from 'react';
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import {observer} from "mobx-react-lite";
import {NavigationProp, ParamListBase} from "@react-navigation/native";
import AuthStore from "../../store/AuthStore/auth-store";
import {Box, Text} from "native-base";
import {colors} from "../../assets/colors/colors";
import CustomCheckbox from "../../components/CustomCheckbox";
import Button from "../../components/Button";
import HeaderGoBackTitle from "../../components/HeaderGoBackTitle";
import {LanguageEnum} from "../../api/Client/type";
import rootStore from "../../store/RootStore/root-store";
import {useBurgerMenu} from "../../components/BurgerMenu/BurgerMenuContext";

type ChangeLanguageSProps = {
    navigation: NavigationProp<ParamListBase>
}
const ChangeLanguageS = observer(({navigation}: ChangeLanguageSProps) => {
    const {clientSettings} = AuthStore
    const {AuthStoreService} = rootStore
    const [chosenLang, setChosenLang] = useState<LanguageEnum | ''>('')
    const onChangeLang = (key: LanguageEnum) => {
        setChosenLang(key)
    }
    const {setIsMenuOpen} = useBurgerMenu()
    const onPressSave = () => {
        AuthStoreService.updateUserInfo({language: chosenLang}).then((data) => {
            if (data) {
                setIsMenuOpen(true)
            }
        })
    }
    const goBackPress = () => {
        navigation.goBack()
    }
    return (
        <BaseWrapperComponent>
            <Box paddingX={4} mt={3}>
                <HeaderGoBackTitle title={'Language'} goBackPress={goBackPress}/>
            </Box>
            <Box paddingX={4} mb={6} mt={5} flex={1} justifyContent={'space-between'}>
                <Box mt={5}>
                    {
                        clientSettings?.languages.map((lang: LanguageEnum, index) => {

                            return <Box key={`${lang}-${index}`} mb={4} paddingY={18} borderRadius={16} paddingX={5}
                                        flexDirection={'row'} alignItems={'center'}
                                        justifyContent={'flex-start'}
                                        backgroundColor={colors.grayBright}>
                                <CustomCheckbox
                                    checked={chosenLang ? chosenLang === lang : lang === clientSettings.client.language}
                                    onPress={() => onChangeLang(lang)}/>
                                <Text ml={2} fontSize={15} fontFamily={'regular'}>{lang}</Text>
                            </Box>
                        })
                    }
                </Box>
                <Box>
                    <Button onPress={onPressSave}
                            styleContainer={{borderRadius: 50}}
                            backgroundColor={colors.blue}
                            colorText={colors.white}
                            title={'Save'}/>
                </Box>
            </Box>
        </BaseWrapperComponent>
    );
});

export default ChangeLanguageS;