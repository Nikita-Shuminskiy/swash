import React from 'react'
import { Box, Text } from 'native-base'
import Link from '../../../components/Link'
import Button from '../../../components/Button'
import { colors } from '../../../assets/colors/colors'
import { routerConstants } from '../../../constants/routerConstants'
import { OrderReportDetailType } from '../../../api/Client/type'

type FooterProps = {
	onSave: () => void
	navigate: (val: any) => void

	orderDetail: OrderReportDetailType
}
const Footer = ({ onSave, navigate, orderDetail }: FooterProps) => {
	const onPressPrises = () => {
		navigate(routerConstants.PRICE)
	}
	const isDisableBtn = !orderDetail.client_logistic_partners_points_id || !orderDetail.photos.length || !orderDetail.executors_id
	return (
		<Box alignItems={'center'}>
			<Text fontSize={22} fontWeight={'500'}>We will ask you to pay later</Text>
			<Text textAlign={'center'} fontSize={17} fontWeight={'400'}>Our executor will count your clothes and
				put up a payment for you after that
				You will get push-notification</Text>
			<Box mb={3} w={'100%'}>
				<Link styleText={{ color: colors.blue, fontSize: 24, fontWeight: '400' }} onPress={onPressPrises}
							text={'Prices'} />
				<Box mt={2} alignItems={'center'}>
					<Button backgroundColor={isDisableBtn ? colors.bluePale : colors.blue} colorText={colors.white}
									styleContainer={{
										borderRadius: 28,
										maxWidth: 280,
										width: '100%',
									}} onPress={isDisableBtn ? null : onSave} title={'OK'} />
				</Box>
			</Box>
		</Box>
	)
}

export default Footer
