import React from 'react'
import { Box, Image, Text } from 'native-base'
import arrowImg from '../../assets/Images/BurgerMenu/arrowGray.png'
import { colors } from '../../assets/colors/colors'
import { ImageSourcePropType, TouchableOpacity } from 'react-native'

type BurgerLinkProps = {
	img: ImageSourcePropType
	text: string
	countryName?: string
	onPress?: () => void
}
const BurgerLink = ({ img, text, onPress, countryName }: BurgerLinkProps) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<Box justifyContent={'space-between'}
					 alignItems={'center'}
					 flexDirection={'row'}
					 marginY={2}

					 borderRadius={16}
					 p={4}
					 borderWidth={1}
					 borderColor={colors.grayBright}>
				<Box flexDirection={'row'} alignItems={'center'}>
					<Image w={6} h={6} alt={'img'} source={img} />
					<Text fontSize={15} maxWidth={'90%'} fontWeight={'regular'} ml={2}>{text}</Text>
				</Box>
				<Box alignItems={'center'}
						 flexDirection={'row'}>
					{
						countryName && <Text fontSize={15} fontWeight={'regular'} color={colors.grayLight}>{countryName}</Text>
					}
					<Image w={6} h={6} alt={'img'} source={arrowImg} />
				</Box>
			</Box>
		</TouchableOpacity>
	)
}

export default BurgerLink
