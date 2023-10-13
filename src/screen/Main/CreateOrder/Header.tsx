import React from 'react'
import BtnDelete from '../../../components/btnDelete'
import { Box, Text } from 'native-base'
import { colors } from '../../../assets/colors/colors'
import Button from '../../../components/Button'
import { Image, StyleSheet } from 'react-native'
import ironBlueImg from '../../../assets/Images/order/iron-blue.png'
import ironImg from '../../../assets/Images/order/iron.png'
import hypoallergenicBlueImg from '../../../assets/Images/order/quill-blue.png'
import hypoallergenicImg from '../../../assets/Images/order/quil-gray.png'
import { OrderReportDetailType, payloadUpdOrderType } from '../../../api/Client/type'
import BergerMenuImg from '../../../components/BurgerMenu/BurgerMenuBtn'
import {observer} from "mobx-react-lite";
import {DictionaryType} from "../../../store/DictionaryStore/dictionary-store";
import {DictionaryEnum} from "../../../store/DictionaryStore/type";

type HeaderProps = {
	orderDetail: OrderReportDetailType
	dictionary: DictionaryType
	onPressDeleteOrder: () => void
	updateOrder: (payload: payloadUpdOrderType) => void
}

const Header = observer(({ orderDetail, onPressDeleteOrder, updateOrder, dictionary }: HeaderProps) => {
	const onPressWithIron = () => {
		updateOrder({
			orders_id: orderDetail.orders_id,
			services: {
				hypo: +orderDetail.add_hypo,
				iron: orderDetail.add_iron === '1' ? 0 : 1,
			},
		})
	}
	const onPressHypoallergenic = () => {
		updateOrder({
			orders_id: orderDetail.orders_id,
			services: {
				iron: +orderDetail.add_iron,
				hypo: orderDetail.add_hypo === '1' ? 0 : 1,
			},
		})
	}
	const isIron = orderDetail.add_iron === '1'
	const isHypoallergenic = orderDetail.add_hypo === '1'
	return (
		<>
			<Box flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
				<BergerMenuImg />
				<BtnDelete onPress={onPressDeleteOrder} />
			</Box>
			<Text fontSize={28} mt={3} fontFamily={'semiBold'} color={colors.black}>Swash #{orderDetail?.orders_id}</Text>
			<Text fontSize={22} mt={3} fontFamily={'semiBold'} fontWeight={'600'}>{dictionary[DictionaryEnum.Services]}</Text>
			<Box mt={2} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
				<Box flex={1}>
					<Button
						styleContainer={{
							...styles.styleContainerBtn,
							borderColor: isIron ? colors.blue : colors.grayLight,
							backgroundColor: isIron ? '#E8F5FE' : null,
						}}
						onPress={onPressWithIron}
					>
						<Image
							style={{ width: 32, height: 32 }}
							alt={'iron'}
							source={isIron ? ironBlueImg : ironImg}
						/>
						<Text fontFamily={'regular'} ml={2} color={isIron ? colors.blue : colors.grayLight}>
							{dictionary[DictionaryEnum.WithIroning]}
						</Text>
					</Button>
				</Box>
				<Box ml={2} flex={1}>
					<Button
						styleContainer={{
							...styles.styleContainerBtn,
							borderColor: isHypoallergenic ? colors.blue : colors.grayLight,
							backgroundColor: isHypoallergenic ? '#E8F5FE' : null,
						}}
						onPress={onPressHypoallergenic}
					>
						<Image
							style={{ width: 29, height: 29 }}
							alt={'iron'}
							source={isHypoallergenic ? hypoallergenicBlueImg : hypoallergenicImg}
						/>
						<Text fontFamily={'regular'} ml={2} color={isHypoallergenic ? colors.blue : colors.grayLight}>
							{dictionary[DictionaryEnum.Hypoallergenic]}
						</Text>
					</Button>
				</Box>
			</Box>
		</>
	)
})
const styles = StyleSheet.create({
	styleContainerBtn: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 16,
		borderWidth: 1,
	},
})
export default Header
