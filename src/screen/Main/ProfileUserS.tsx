import React from 'react'
import { BaseWrapperComponent } from '../../components/baseWrapperComponent'
import { observer } from 'mobx-react-lite'
import ArrowBack from '../../components/ArrowBack'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { Avatar, Box, Image, Text } from 'native-base'
import photoImg from '../../assets/Images/photoWhite.png'
import { colors } from '../../assets/colors/colors'
import { TouchableOpacity } from 'react-native'
import InputCustom from '../../components/TextInput'
import Button from '../../components/Button'
import BtnDelete from '../../components/btnDelete'

type ProfileUserSProps = {
	navigation: NavigationProp<ParamListBase>
}
const ProfileUserS = observer(({ navigation }: ProfileUserSProps) => {
	const goBackPress = () => {
		navigation.goBack()
	}
	const onPressChangePhone = () => {

	}
	const onPressSave = () => {

	}
	const onPressDeleteAccount = () => {

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
						<TouchableOpacity>
							<Box alignItems={'center'}>
								<Image alt={'photo'} w={6} h={6} position={'absolute'} zIndex={2} top={8} source={photoImg} />
								<Box position={'absolute'} w={24} borderRadius={50} zIndex={1} top={0} opacity={0.3} h={24}
										 backgroundColor={colors.black} />
							</Box>
							<Avatar bg='green.500' alignSelf='center' w={24} h={24} source={{
								uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
							}} />
						</TouchableOpacity>
					</Box>
					<Box>
						<InputCustom borderRadius={16} heightInput={12} label={'Name'} />
						<InputCustom borderRadius={16} heightInput={12} label={'E-mail'} />
						<Box>
							<InputCustom value={'1231'} borderRadius={16} heightInput={12} label={'Phone'} />
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
		</BaseWrapperComponent>
	)
})

export default ProfileUserS
