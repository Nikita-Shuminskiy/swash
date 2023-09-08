import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import burgerImg from '../../assets/Images/burgerMenu.png'
import { useBurgerMenu } from './BurgerMenuContext'

const BergerMenuImg = () => {
	const { isMenuOpen, setIsMenuOpen } = useBurgerMenu();

	const toggleMenu = () => {
		setIsMenuOpen(true);
	};
	return (
		<TouchableOpacity onPress={toggleMenu}>
			<Image style={{ width: 38, height: 38 }} source={burgerImg} />
		</TouchableOpacity>
	)
}

export default BergerMenuImg
