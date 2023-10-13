import React from 'react'
import { Box, Text } from 'native-base'
import Link from '../../../components/Link'
import Button from '../../../components/Button'
import { colors } from '../../../assets/colors/colors'
import { routerConstants } from '../../../constants/routerConstants'
import { OrderReportDetailType } from '../../../api/Client/type'
import {observer} from "mobx-react-lite";
import {DictionaryType} from "../../../store/DictionaryStore/dictionary-store";
import {DictionaryEnum} from "../../../store/DictionaryStore/type";

type FooterProps = {
	onSave: () => void
	navigate: (val: any) => void
	dictionary: DictionaryType
	orderDetail: OrderReportDetailType
}
const Footer = observer(({ onSave, navigate, orderDetail, dictionary }: FooterProps) => {
	const onPressPrises = () => {
		navigate(routerConstants.PRICE)
	}
	const isDisableBtn = !orderDetail.client_logistic_partners_points_id || !orderDetail.photos.length // || !orderDetail.executors_id
	return (
		<Box alignItems={'center'}>
			<Text fontSize={22} fontFamily={'semiBold'}>{dictionary[DictionaryEnum.WillAskYouToPayLater]}</Text>
			<Text textAlign={'center'} fontSize={17} fontFamily={'regular'}>{dictionary[DictionaryEnum.OurExecutorWillCountClothes]}</Text>
			<Box mb={3} w={'100%'}>
				<Link styleText={{ color: colors.blue, fontSize: 24, fontFamily: 'regular' }} onPress={onPressPrises}
					  text={dictionary[DictionaryEnum.Prices]} />
				<Box mt={2} alignItems={'center'}>
					<Button backgroundColor={isDisableBtn ? colors.bluePale : colors.blue} colorText={colors.white}
							styleContainer={{
								borderRadius: 28,
								maxWidth: 280,
								width: '100%',
							}} onPress={isDisableBtn ? null : onSave} title={dictionary[DictionaryEnum.OK]} />
				</Box>
			</Box>
		</Box>
	)
})

export default Footer
