import React from 'react'
import BtnDelete from '../../../components/btnDelete'
import { Box, Text } from 'native-base'
import { colors } from '../../../assets/colors/colors'
import Button from '../../../components/Button'
import { Image } from 'react-native'
import ironBlueImg from '../../../assets/Images/order/iron-blue.png'
import ironImg from '../../../assets/Images/order/iron.png'
import hypoallergenicBlueImg from '../../../assets/Images/order/quill-blue.png'
import hypoallergenicImg from '../../../assets/Images/order/quil-gray.png'
import { OrderReportDetailType } from '../../../api/Client/type'
import { payloadUpdOrderType } from '../../../api/Client/clientApi'
import BergerMenuImg from '../../../components/burgerMenuImg'

type HeaderProps = {
	orderDetail: OrderReportDetailType
	onPressDeleteOrder: () => void
	updateOrder: (payload: payloadUpdOrderType) => void
}

const Header = ({orderDetail, onPressDeleteOrder, updateOrder}:HeaderProps) => {
	const onPressWithIron = () => {
		updateOrder({
			orders_id: orderDetail.id,
			services: {
				hypo: +orderDetail.add_hypo,
				iron: orderDetail.add_iron === '1' ? 0 : 1,
			}
		})
	}
	const onPressHypoallergenic = () => {
		updateOrder({
			orders_id: orderDetail.id,
			services: {
				iron: +orderDetail.add_iron,
				hypo: orderDetail.add_hypo === '1' ? 0 : 1,
			}
		})
	}
	const isIron = orderDetail.add_iron === '1'
	const isHypoallergenic = orderDetail.add_hypo === '1'
	return (
		<>
			<Box flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
				<BergerMenuImg/>
				<BtnDelete onPress={onPressDeleteOrder} />
			</Box>
			<Text fontSize={28} mt={3} fontWeight={'600'} color={colors.black}>Swash #{orderDetail?.id}</Text>
			<Text fontSize={22} mt={3} fontWeight={'600'}>Services</Text>
			<Box flexDirection={'row'} alignItems={'center'}
					 justifyContent={'center'}>
				<Box>
					<Button onPress={onPressWithIron}>
						<Box backgroundColor={isIron ? '#E8F5FE' : null} w={169} h={50} borderWidth={1}
								 borderRadius={16}
								 borderColor={isIron ? colors.blue : colors.grayLight} flexDirection={'row'} alignItems={'center'}
								 justifyContent={'center'}>
							<Image style={{ width: 32, height: 32 }} alt={'iron'} source={isIron ? ironBlueImg : ironImg} />
							<Text ml={2} color={isIron ? colors.blue : colors.grayLight}>With iron</Text>
						</Box>
					</Button>
				</Box>
				<Box>
					<Button onPress={onPressHypoallergenic}>
						<Box backgroundColor={isHypoallergenic ? '#E8F5FE' : null} w={169} h={50} borderWidth={1}
								 borderRadius={16}
								 borderColor={isHypoallergenic ? colors.blue : colors.grayLight} flexDirection={'row'}
								 alignItems={'center'}
								 justifyContent={'center'}>
							<Image  style={{ width: 29, height: 29 }} alt={'iron'} source={isHypoallergenic ? hypoallergenicBlueImg : hypoallergenicImg} />
							<Text ml={2} color={isHypoallergenic ? colors.blue : colors.grayLight}>Hypoallergenic</Text>
						</Box>
					</Button>
				</Box>
			</Box>
		</>
	)
}

export default Header
