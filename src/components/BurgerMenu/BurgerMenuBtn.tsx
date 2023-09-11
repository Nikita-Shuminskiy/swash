import React, { useEffect } from 'react'
import { Image, TouchableOpacity } from 'react-native'
import burgerImg from '../../assets/Images/burgerMenu.png'
import { useBurgerMenu } from './BurgerMenuContext'

const BergerMenuImg = ({ openingForced }) => {
	const { isMenuOpen, setIsMenuOpen } = useBurgerMenu()
	useEffect(() => {
		if (openingForced) {
			setIsMenuOpen(true)
		}
	}, [openingForced])
	const toggleMenu = () => {
		setIsMenuOpen(true)
	}
	return (
		<TouchableOpacity onPress={toggleMenu}>
			<Image style={{ width: 38, height: 38 }} source={burgerImg} />
		</TouchableOpacity>
	)
}

export default BergerMenuImg
