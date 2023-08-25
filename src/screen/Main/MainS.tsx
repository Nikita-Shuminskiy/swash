import React, { useState } from 'react'
import { BaseWrapperComponent } from '../../components/baseWrapperComponent'
import { Box, Text } from 'native-base'
import BtnDelete from '../../components/btnDelete'
import Button from '../../components/Button'
import ironImg from '../../assets/Images/order/iron.png'
import ironBlueImg from '../../assets/Images/order/Iron-blue.png'
import hypoallergenicBlueImg from '../../assets/Images/order/quill-blue.png'
import hypoallergenicImg from '../../assets/Images/order/quil-gray.png'
import { colors } from '../../assets/colors/colors'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { CheckBoxs } from '../../components/CheckBox'
import PaymentMethodPopUp from '../../components/pop-up/PaymentMethod/PaymentMethodPopUp'
import arrowBlue from '../../assets/Images/order/arrowRightBlue.png'

const MainS = ({navigation}) => {
	const [isHypoallergenic, setIsHypoallergenic] = useState(false)
	const [isShowModalPayment, setIsShowModalPayment] = useState<boolean>(false)
	const [isIron, setIsIron] = useState(false)
	const onPressDeleteOrder = () => {

	}
	const onPressWithIron = () => {
		setIsIron(prevState => !prevState)
	}
	const onPressHypoallergenic = () => {
		setIsHypoallergenic(prevState => !prevState)
	}
	const onPressPachkomat = () => {

	}
	const onPressChosePaczkomat = () => {

	}
	const onPressChangePayment = () => {
		setIsShowModalPayment(prevState => !prevState)
	}
	return (
		<>
			<BaseWrapperComponent isKeyboardAwareScrollView={true}>
				<Box paddingX={3}>
					<BtnDelete onPress={onPressDeleteOrder} />
					<Text fontSize={28} mt={3} fontWeight={'600'} color={colors.black}>Swash #221</Text>
					<Text fontSize={22} mt={3} fontWeight={'600'}>Services</Text>
					<Box flexDirection={'row'} alignItems={'center'}
							 justifyContent={'center'}>
						<Box>
							<Button onPress={onPressWithIron}>
								<Box backgroundColor={isIron ? '#E8F5FE' : null} w={169} h={50} borderWidth={1}
										 borderRadius={16}
										 borderColor={isIron ? colors.blue : colors.grayLight} flexDirection={'row'} alignItems={'center'}
										 justifyContent={'center'}>
									<Image alt={'iron'} source={isIron ? ironBlueImg : ironImg} />
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
									<Image alt={'iron'} source={isHypoallergenic ? hypoallergenicBlueImg : hypoallergenicImg} />
									<Text ml={2} color={isHypoallergenic ? colors.blue : colors.grayLight}>Hypoallergenic</Text>
								</Box>
							</Button>
						</Box>
					</Box>
					<Box mt={2}>
						<Text fontSize={22} fontWeight={'600'}>Photo</Text>
					</Box>

					<Box mt={2}>
						<Text mb={2} fontSize={22} fontWeight={'600'}>Paczkomat</Text>

						<Box paddingY={18} backgroundColor={colors.grayBright} borderRadius={16} flexDirection={'row'}
								 alignItems={'center'}
								 justifyContent={'flex-start'}>
							<Box ml={4}>
								<CheckBoxs borderRadius={16} onPress={onPressPachkomat} value={true} />
							</Box>
							<Text ml={2} fontSize={15}>Paczkomat 1</Text>
						</Box>
					</Box>
					<Box mt={4} alignItems={'center'}>
						<Button backgroundColor={colors.blue} styleText={styles.btnText} colorText={colors.white}
										styleContainer={styles.styleContainerBtn}
										onPress={onPressChosePaczkomat} title={'Choose new Paczkomat'} />
					</Box>
					<Box mt={3} borderBottomWidth={1} borderColor={colors.grayBright} />
					<Box mt={4}>
						<Text mb={3} fontSize={22} fontWeight={'600'}>Payment method</Text>
						<TouchableOpacity onPress={onPressChangePayment}>
							<Box paddingY={18} borderRadius={16} paddingX={5} flexDirection={'row'} alignItems={'center'}
									 justifyContent={'space-between'}
									 backgroundColor={colors.grayBright}>
								<Text fontSize={15} fontWeight={'500'}>Google Pay</Text>
								<Image source={arrowBlue} alt={'arrow'} />
							</Box>
						</TouchableOpacity>
					</Box>
				</Box>
			</BaseWrapperComponent>
			{
				isShowModalPayment &&
				<PaymentMethodPopUp navigation={navigation} visible={isShowModalPayment} onClose={() => setIsShowModalPayment(false)} />
			}

		</>
	)
}
const styles = StyleSheet.create({
	btnText: {
		fontWeight: '500',
	},
	styleContainerBtn: {
		borderRadius: 50,
		height: 56,
		maxWidth: 238,
	},
	checkBox: {
		borderRadius: 40,
	},
})
export default MainS
