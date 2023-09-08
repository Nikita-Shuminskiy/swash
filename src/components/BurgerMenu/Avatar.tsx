import React from 'react'
import { Box, Text } from 'native-base'
import { Image, TouchableOpacity } from 'react-native'
import arrowBlue from '../../assets/Images/order/arrowRightBlue.png'
import { colors } from '../../assets/colors/colors'

type AvatarProps = {
	img: string
	name: string
}
const Avatar = ({ img, name }: AvatarProps) => {
	return (
		<TouchableOpacity style={{ paddingTop: 10 }}>
			<Box justifyContent={'space-between'}
					 alignItems={'center'}
					 flexDirection={'row'} mb={9}>
				<Box alignItems={'center'}
						 flexDirection={'row'}>
					<Image style={{ width: 48, height: 48, borderRadius: 28 }} source={img} />
					<Box ml={3}>
						<Text fontSize={13} fontWeight={'regular'} color={colors.grayLight} >Welcome back,</Text>
						<Text fontSize={17} fontWeight={'semiBold'}>{name}</Text>
					</Box>
				</Box>

				<Image alt={'img'} source={arrowBlue} />
			</Box>
		</TouchableOpacity>
	)
}

export default Avatar
