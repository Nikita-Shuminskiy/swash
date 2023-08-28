import React from 'react'
import { Box, Text } from 'native-base'
import Link from '../../../components/Link'
import Button from '../../../components/Button'
import { colors } from '../../../assets/colors/colors'
import { routerConstants } from '../../../constants/routerConstants'

type FooterProps = {
	onSave: () => void
	navigate: (val: any) => void
}
const Footer = ({onSave, navigate}:FooterProps) => {
	const onPressPrises = () => {
		navigate(routerConstants.PRICE)
	}

	return (
		<Box alignItems={'center'}>
			<Text fontSize={22} fontWeight={'500'}>We will ask you to pay later</Text>
			<Text textAlign={'center'} fontSize={17} fontWeight={'400'}>Our executor will count your clothes and
				put up a payment for you after that
				You will get push-notification</Text>
			<Box mb={3}>
				<Link styleText={{ color: colors.blue, fontSize: 22, fontWeight: '400' }} onPress={onPressPrises}
							text={'Prises'} />
				<Box mt={2}>
					<Button backgroundColor={colors.blue} colorText={colors.white} styleContainer={{
						borderRadius: 28,
					}} onPress={onSave} title={'OK'} />
				</Box>
			</Box>
		</Box>
	)
}

export default Footer
