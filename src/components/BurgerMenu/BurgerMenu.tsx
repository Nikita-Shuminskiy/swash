import React, { useEffect, useRef, useState } from 'react'
import { Animated, StyleSheet } from 'react-native'
import { Box, Pressable } from 'native-base'
import { colors } from '../../assets/colors/colors'
import { useBurgerMenu } from './BurgerMenuContext'
import BurgerLink from './BurgerLink'
import countryImg from '../../assets/Images/BurgerMenu/CountryBlue.png'
import exclamationMarkImg from '../../assets/Images/BurgerMenu/exclamationMarkBlue.png'
import questionMarkImg from '../../assets/Images/BurgerMenu/questionMarkBlue.png'
import repeatImg from '../../assets/Images/BurgerMenu/repeatBlue.png'
import walletImg from '../../assets/Images/BurgerMenu/walletBlue.png'
import Button from '../Button'
import Avatar from './Avatar'
import BaseBottomPopUp from '../pop-up/BaseBottomPopUp'
import rootStore from '../../store/RootStore/root-store'
import AuthStore from '../../store/AuthStore/auth-store'
import { observer } from 'mobx-react-lite'
import { useNavigation } from '@react-navigation/native'
import { routerConstants } from '../../constants/routerConstants'

const BurgerMenu = observer(() => {
	const { isMenuOpen, setIsMenuOpen } = useBurgerMenu()
	const [isOpenLogout, setIsLogout] = useState<boolean>(false)
	const toValue = isMenuOpen ? 0 : -1000
	const menuPosition = useRef(new Animated.Value(toValue)).current
	const { AuthStoreService } = rootStore
	const { clientSettings } = AuthStore
	const navigation = useNavigation<any>()
	const toggleMenu = () => {
		Animated.timing(menuPosition, {
			toValue,
			duration: 500,
			useNativeDriver: true,
		}).start()
	}

	useEffect(() => {
		toggleMenu()
	}, [isMenuOpen])
	const onPressLogOut = () => {
		setIsLogout(true)
	}
	const logOutHandler = () => {
		AuthStoreService.logout()
		navigation.navigate(routerConstants.LOGIN)
		setIsMenuOpen(false)
	}
	const onPressNavigateHandler = (routeName: any) => {
		navigation.navigate(routeName)
		setIsMenuOpen(false)
	}
	return (
		<>
			<Animated.View style={[
				styles.container,
				{
					transform: [
						{
							translateX: menuPosition,
						},
					],
				},
			]}>
				<Pressable
					onPress={() => setIsMenuOpen(false)}
					style={styles.background}
				/>

				<Animated.View
					style={[
						styles.menu,
						{
							transform: [
								{
									translateX: menuPosition,
								},
							],
						},
					]}
				>
					<Box pt={8}>
						<Avatar photo={clientSettings?.client?.pic}
										name={`${clientSettings.client?.first_name} ${clientSettings.client?.last_name}`}
										onClose={() => setIsMenuOpen(false)} />
						<BurgerLink onPress={() => onPressNavigateHandler(routerConstants.CHANGE_COUNTRY)} img={countryImg}
												countryName={clientSettings.client?.country} text={'Country'} />
						<BurgerLink onPress={() => onPressNavigateHandler(routerConstants.ORDER_HISTORY)} img={repeatImg}
												text={'Order history'} />
						<BurgerLink onPress={() => onPressNavigateHandler(routerConstants.CHAT_SUPPORT)} img={questionMarkImg}
												text={'Contact support'} />
						<BurgerLink onPress={() => onPressNavigateHandler(routerConstants.PAYMENT_METHOD)} img={walletImg}
												text={'Payment methods'} />
						<BurgerLink onPress={() => onPressNavigateHandler(routerConstants.ABOUT_US)} img={exclamationMarkImg}
												text={'About Swash'} />
					</Box>
					<Box mt={2} mb={5} alignItems={'center'}>
						<Button backgroundColor={colors.white} colorText={colors.black}
										styleContainer={{
											borderWidth: 1,
											borderColor: colors.blue,
											borderRadius: 28,
											maxWidth: 280,
											width: '100%',
										}} styleText={{ fontFamily: 'regular' }} onPress={onPressLogOut} title={'Log off'} />
					</Box>
				</Animated.View>
			</Animated.View>
			{
				isOpenLogout &&
				<BaseBottomPopUp text={'Do you really want to log off?'} onDelete={logOutHandler} visible={isOpenLogout}
												 onClose={() => setIsLogout(false)} />
			}

		</>
	)
})

const styles = StyleSheet.create({
	background: {
		position: 'absolute',
		top: 0,
		width: '100%',
		height: '100%',
		backgroundColor: colors.black,
		zIndex: 1,
		opacity: 0.2,
	},
	container: {
		position: 'absolute',
		top: 0,
		width: '100%',
		height: '100%',
		zIndex: 1,
	},
	menu: {
		position: 'absolute',
		top: 0,
		width: '80%',
		paddingHorizontal: 16,
		height: '100%',
		justifyContent: 'space-between',
		backgroundColor: 'rgba(255, 255, 255, 1)',
		zIndex: 2,
		shadowColor: 'black',
		shadowOpacity: 0.2,
		shadowOffset: { width: 5, height: 0 },
		elevation: 5,
	},
	menuButton: {
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: 'gray',
	},
})

export default BurgerMenu
