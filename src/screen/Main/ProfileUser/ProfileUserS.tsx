import React, { useState } from 'react'
import { BaseWrapperComponent } from '../../../components/baseWrapperComponent'
import { observer } from 'mobx-react-lite'
import ArrowBack from '../../../components/ArrowBack'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { Avatar, Box, Image, Text } from 'native-base'
import photoImg from '../../../assets/Images/photoWhite.png'
import { colors } from '../../../assets/colors/colors'
import { TouchableOpacity } from 'react-native'
import InputCustom from '../../../components/TextInput'
import Button from '../../../components/Button'
import BtnDelete from '../../../components/btnDelete'
import AuthStore from '../../../store/AuthStore/auth-store'
import BaseBottomPopUp from '../../../components/pop-up/BaseBottomPopUp'
import rootStore from '../../../store/RootStore/root-store'
import { routerConstants } from '../../../constants/routerConstants'
import AvatarProfile from './AvatarProfile'

type ProfileUserSProps = {
	navigation: NavigationProp<ParamListBase>
}
const ProfileUserS = observer(({ navigation }: ProfileUserSProps) => {
	const { clientSettings } = AuthStore
	const { AuthStoreService } = rootStore
	const [isDeleteAccount, setIsDeleteAccount] = useState<boolean>(false)

	const [dataInfo, setDataInfo] = useState({
		first_name: clientSettings.client.first_name,
		last_name: clientSettings.client.last_name,
		email: clientSettings.client.email,
	})

	const goBackPress = () => {
		navigation.goBack()
	}
	const onPressChangePhone = () => {
		navigation.navigate(routerConstants.PHONE_VERIFY, {from: 'update'})
	}
	const onPressSave = () => {
		AuthStoreService.updateUserInfo(dataInfo).then((data) => {
			if(data) {
				navigation.navigate(routerConstants.ORDERS, {from: 'open_menu'})
			}
		})
	}
	const onPressDeleteAccount = () => {
		setIsDeleteAccount(true)
	}
	const deleteAccountHandler = () => {
		AuthStoreService.forgotAboutDevice()
	}
	const onChangeTextFields = (key: string, value: string) => {
		setDataInfo(prevState => {
			return {
				...prevState,
				[key]: value,
			}
		})
	}


	return (
		<BaseWrapperComponent isKeyboardAwareScrollView={false}>
			<Box paddingX={4} mb={6} mt={3} flex={1} justifyContent={'space-between'}>
				<Box>
					<Box flexDirection={'row'} alignItems={'center'} justifyContent={'center'}>
						<Box flex={1} position={'relative'} bottom={1}>
							<ArrowBack goBackPress={goBackPress} />
						</Box>
						<Box flex={2} alignItems={'center'}>
							<Text fontSize={17} fontFamily={'semiBold'}>Account</Text>
						</Box>
						<Box flex={1} />
					</Box>
					<Box alignItems={'center'} mt={4}>
						<AvatarProfile/>
					</Box>
					<Box>
						<Box flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
							<Box flex={1}>
								<InputCustom value={dataInfo.first_name} onChangeText={(e) => onChangeTextFields('first_name', e)}
														 borderRadius={16}
														 heightInput={12} label={'First name'} />
							</Box>
							<Box ml={2} flex={1}>
								<InputCustom value={dataInfo.last_name} onChangeText={(e) => onChangeTextFields('last_name', e)}
														 borderRadius={16}
														 heightInput={12} label={'Last name'} />
							</Box>
						</Box>
						<InputCustom value={dataInfo.email} onChangeText={(e) => onChangeTextFields('email', e)} borderRadius={16}
												 heightInput={12} label={'E-mail'} />
						<Box>
							<InputCustom value={`+${clientSettings.client.phone}`} borderRadius={16} heightInput={12}
													 label={'Phone'} />
							<Box style={{ width: 130 }} h={19} position={'absolute'} right={0} top={10}>
								<Button styleText={{ fontSize: 10 }} styleContainer={{ minHeight: 10, height: 48 }}
												onPress={onPressChangePhone}
												backgroundColor={colors.blue}
												colorText={colors.white}
												title={'Change phone number'} />
							</Box>
						</Box>
					</Box>
					<Box mt={4}>
						<Button onPress={onPressSave}
										styleContainer={{ borderRadius: 50 }}
										backgroundColor={colors.blue}
										colorText={colors.white}
										title={'Save'} />
					</Box>
				</Box>


				<TouchableOpacity onPress={onPressDeleteAccount}>
					<Box flexDirection={'row'} alignItems={'center'} justifyContent={'center'}>
						<BtnDelete onPress={onPressDeleteAccount} />
						<Text ml={2} fontSize={15} fontFamily={'regular'} color={colors.red}>Delete and forget my profile</Text>
					</Box>
				</TouchableOpacity>

			</Box>
			{
				isDeleteAccount &&
				<BaseBottomPopUp text={'Delete and forget your profile?'} onDelete={deleteAccountHandler}
												 visible={isDeleteAccount}
												 onClose={() => setIsDeleteAccount(false)} />
			}
		</BaseWrapperComponent>
	)
})

export default ProfileUserS
