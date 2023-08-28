import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import burgerImg from '../assets/Images/burgerMenu.png'

const BergerMenuImg = () => {
	return (
		<TouchableOpacity>
			<Image style={{ width: 48, height: 48 }} source={burgerImg} />
		</TouchableOpacity>
	)
}

export default BergerMenuImg
