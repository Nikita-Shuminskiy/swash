import React from 'react'
import { Alert, Image, Text } from 'native-base'
import heartBlueImg from '../assets/Images/heartBlue.png'
import { colors } from '../assets/colors/colors'

const AlertFeedBack = () => {
	return (
		<Alert position={'absolute'} top={0}
					 left={5}
					 h={75}
					 alignItems={'center'}
					 justifyContent={'space-evenly'}
					 flexDirection={'row'}
					 shadow={2}
					 zIndex={10}
					 borderRadius={16}
					 backgroundColor={colors.blue}
					 w='90%'>
			<Image alt={'heart'} source={heartBlueImg} />
			<Text fontSize={17} color={colors.white} fontFamily={'regular'}>Thank you for your feedback</Text>
		</Alert>
	)
}

export default AlertFeedBack
