import React, {useState} from 'react'
import {BaseWrapperComponent} from '../../../components/baseWrapperComponent'
import {observer} from 'mobx-react-lite'
import {NavigationProp, ParamListBase} from '@react-navigation/native'
import {Box, Text} from 'native-base'
import {colors} from '../../../assets/colors/colors'
import {TouchableOpacity} from 'react-native'
import InputCustom from '../../../components/TextInput'
import Button from '../../../components/Button'
import BtnDelete from '../../../components/btnDelete'
import AuthStore from '../../../store/AuthStore/auth-store'
import BaseBottomPopUp from '../../../components/pop-up/BaseBottomPopUp'
import rootStore from '../../../store/RootStore/root-store'
import {routerConstants} from '../../../constants/routerConstants'
import AvatarProfile from './AvatarProfile'
import {useBurgerMenu} from '../../../components/BurgerMenu/BurgerMenuContext'
import HeaderGoBackTitle from '../../../components/HeaderGoBackTitle'
import InputChange from "./InputChange";
import DictionaryStore from "../../../store/DictionaryStore/dictionary-store";
import {DictionaryEnum} from "../../../store/DictionaryStore/type";
import loginS from "../../authScreens/LoginS";

type ProfileUserSProps = {
    navigation: NavigationProp<ParamListBase>
}
const ProfileUserS = observer(({navigation}: ProfileUserSProps) => {
    const {isMenuOpen, setIsMenuOpen} = useBurgerMenu()
    const {dictionary} = DictionaryStore
    const {clientSettings} = AuthStore
    const {AuthStoreService} = rootStore
    const [isDeleteAccount, setIsDeleteAccount] = useState<boolean>(false)

    const [dataInfo, setDataInfo] = useState({
        first_name: clientSettings?.client?.first_name,
        last_name: clientSettings?.client?.last_name,
        email: clientSettings?.client?.email,
    })

    const goBackPress = () => {
        navigation.goBack()
    }
    const onPressChangePhone = () => {
        navigation.navigate(routerConstants.PHONE_VERIFY, {from: 'update'})
    }
    const onPressSave = () => {
        const {last_name, first_name, email} = dataInfo
        if (last_name === clientSettings?.client?.last_name
            && first_name === clientSettings?.client?.first_name
            && email === clientSettings?.client?.email) {
            return
        }
        AuthStoreService.updateUserInfo(dataInfo).then((data) => {
            if (data) {
                setIsMenuOpen(true)
            }
        })
    }
    const onPressDeleteAccount = () => {
        setIsDeleteAccount(true)
    }
    const deleteAccountHandler = () => {
        AuthStoreService.forgotAboutDevice().then((data) => {
            navigation.navigate(routerConstants.LOGIN)
            setIsMenuOpen(false)
        })
    }
    const onChangeTextFields = (key: string, value: string) => {
        setDataInfo(prevState => {
            return {
                ...prevState,
                [key]: value,
            }
        })
    }
    const onPressChangeLang = () => {
        navigation.navigate(routerConstants.CHANGE_LANGUAGE)
    }
    return (
        <BaseWrapperComponent isKeyboardAwareScrollView={false}>
            <Box paddingX={4} mb={6} mt={3} flex={1} justifyContent={'space-between'}>
                <Box>
                    <HeaderGoBackTitle title={dictionary[DictionaryEnum.Account]} goBackPress={goBackPress}/>
                    <Box alignItems={'center'} mt={4}>
                        <AvatarProfile photo={clientSettings.client?.pic}/>
                    </Box>
                    <Box>
                        <Box flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                            <Box flex={1}>
                                <InputCustom value={dataInfo?.first_name}
                                             onChangeText={(e) => onChangeTextFields('first_name', e)}
                                             borderRadius={16}
                                             heightInput={12} label={dictionary[DictionaryEnum.FirstName]}/>
                            </Box>
                            <Box ml={2} flex={1}>
                                <InputCustom value={dataInfo?.last_name}
                                             onChangeText={(e) => onChangeTextFields('last_name', e)}
                                             borderRadius={16}
                                             heightInput={12} label={dictionary[DictionaryEnum.LastName]}/>
                            </Box>
                        </Box>
                        <InputCustom value={dataInfo?.email} isReadOnly={true}
                                     onChangeText={(e) => onChangeTextFields('email', e)}
                                     backgroundColor={colors.grayBright}
                                     borderRadius={16}
                                     heightInput={12} label={dictionary[DictionaryEnum.Email]}/>
                        <InputChange btnTitle={dictionary[DictionaryEnum.ChangePhoneNumber]}
                                     label={dictionary[DictionaryEnum.Phone]} onPress={onPressChangePhone}
                                     value={`+${clientSettings.client?.phone}`}/>
                        <InputChange btnTitle={dictionary[DictionaryEnum.ChangeLanguage]}
                                     label={dictionary[DictionaryEnum.Language]} onPress={onPressChangeLang}
                                     value={clientSettings.client?.language}/>
                    </Box>
                    <Box mt={4}>
                        <Button onPress={onPressSave}
                                styleContainer={{borderRadius: 50}}
                                backgroundColor={colors.blue}
                                colorText={colors.white}
                                title={dictionary[DictionaryEnum.Save]}/>
                    </Box>
                </Box>


                <TouchableOpacity onPress={onPressDeleteAccount}>
                    <Box flexDirection={'row'} alignItems={'center'} justifyContent={'center'}>
                        <BtnDelete onPress={onPressDeleteAccount}/>
                        <Text ml={2} fontSize={15} fontFamily={'regular'}
                              color={colors.red}>{dictionary[DictionaryEnum.DeleteForgetProfile]}</Text>
                    </Box>
                </TouchableOpacity>

            </Box>
            {
                isDeleteAccount &&
                <BaseBottomPopUp dictionary={dictionary} text={dictionary[DictionaryEnum.DeleteForgetProfile]}
                                 onDelete={deleteAccountHandler}
                                 visible={isDeleteAccount}
                                 onClose={() => setIsDeleteAccount(false)}/>
            }
        </BaseWrapperComponent>
    )
})

export default ProfileUserS
