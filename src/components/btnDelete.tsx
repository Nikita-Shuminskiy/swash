import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Image } from 'native-base'
import deleteImg from '../assets/Images/order/delete.png'
type BtnDeleteProps =   {
	onPress: () => void
}
const BtnDelete = ({onPress}: BtnDeleteProps) => {
	return (
		<TouchableOpacity  onPress={onPress}>
			<Image style={{ width: 28, height: 28 }} source={deleteImg} alt={'delete'}/>
		</TouchableOpacity>
	)
}

export default BtnDelete
