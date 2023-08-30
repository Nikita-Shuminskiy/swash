import React from 'react'
import { BaseWrapperComponent } from '../../components/baseWrapperComponent'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { FlatList, Image, StyleSheet } from 'react-native'
import tShirtTop from '../../assets/Images/Сlothing/T-shirts-tops.png' // 3
import Bedding from '../../assets/Images/Сlothing/Bedding.png' // 9
import AddNewItem from '../../assets/Images/Сlothing/AddNewItem.png'
import ChildrenClothing from '../../assets/Images/Сlothing/ChildrensСlothing.png' // 8
import Outerwear from '../../assets/Images/Сlothing/Outerwear.png' // 1
import PantsShorts from '../../assets/Images/Сlothing/PantsShorts.png' //5
import PulloversSweaters from '../../assets/Images/Сlothing/PulloversSweaters.png' // 4
import ShirtsJackets from '../../assets/Images/Сlothing/ShirtsJackets.png' //2
import SkirtsDresses from '../../assets/Images/Сlothing/SkirtsDresses.png' //6
import UnderWearSocks from '../../assets/Images/Сlothing/UnderwearSocks.png' //7
import { Box, Text } from 'native-base'
import ArrowBack from '../../components/ArrowBack'
import AuthStore from '../../store/AuthStore/auth-store'
import { UnitType } from '../../api/Client/type'
import { colors } from '../../assets/colors/colors' // 7
import hypoallergenicBlueImg from '../../assets/Images/order/quill-blue.png'
import ironBlueImg from '../../assets/Images/order/iron-blue.png'
import Button from '../../components/Button'

type PriceSProps = {
	navigation: NavigationProp<ParamListBase>
}
/*{
	detailed_description: "Coats, jackets, and Outerwear",
		name: "Outerwear",
	price_add_hypo: "0.20",
	price_add_iron: "0.30",
	price_basic: "2.00",
	type_of_units_id: "1"
},*/
const DATA_IMG = {
	'1': {
		img: Outerwear,
	},
	'2': {
		img: ShirtsJackets,
	},
	'3': {
		img: tShirtTop,
	},
	'4': {
		img: PulloversSweaters,
	},
	'5': {
		img: PantsShorts,
	},
	'6': {
		img: SkirtsDresses,
	},
	'7': {
		img: UnderWearSocks,
	},
	'8': {
		img: ChildrenClothing,
	},
	'9': {
		img: Bedding,
	},
}
const PriceS = ({ navigation }: PriceSProps) => {
	const { clientSettings } = AuthStore

	const goBackPress = () => {
		navigation.goBack()
	}
	const renderItem = ({ item }: { item: UnitType }) => {
		return <Box mb={2} borderWidth={1} minH={104} paddingX={2} flexDirection={'row'} alignItems={'center'}
								borderColor={colors.grayBright}
								borderRadius={16}>
			<Image style={styles.img} source={DATA_IMG[item.type_of_units_id]?.img} />
			<Box ml={2} alignItems={'flex-start'}>
				<Text fontSize={17}  fontFamily={'semiBold'}>{item.name}</Text>
				<Text fontSize={17}  fontFamily={'semiBold'} color={colors.blue}>{item.price_basic} zł</Text>
			</Box>
			<Box flexDirection={'row'} position={'absolute'} bottom={2} right={2}>
				<Box mr={2} style={{ width: 75, height: 24 }} flexDirection={'row'} alignItems={'center'}
						 justifyContent={'center'} borderWidth={1} borderColor={colors.grayBright} borderRadius={16}>
					<Image style={{ width: 16, height: 16 }} source={hypoallergenicBlueImg} />
					<Text fontSize={13} color={colors.blue}  fontFamily={'regular'}> +{item.price_add_hypo} zł</Text>
				</Box>
				<Box style={{ width: 75, height: 24 }} flexDirection={'row'} alignItems={'center'} justifyContent={'center'}
						 borderWidth={1} borderColor={colors.grayBright} borderRadius={16}>
					<Image style={{ width: 16, height: 16 }} source={ironBlueImg} />
					<Text fontSize={13} color={colors.blue}  fontFamily={'regular'}> +{item.price_add_iron} zł</Text>
				</Box>
			</Box>
		</Box>
	}
	return (
		<BaseWrapperComponent isKeyboardAwareScrollView={true}>
			<Box paddingX={3}>
				<Box alignItems={'center'} justifyContent={'center'}>
					<Box position={'absolute'} left={2} top={0}>
						<ArrowBack goBackPress={goBackPress} />
					</Box>
					<Box>
						<Text fontSize={17}  fontFamily={'semiBold'}>Prices</Text>
					</Box>
				</Box>
				<Box mt={5}>
					<FlatList scrollEnabled={false} data={clientSettings.units} renderItem={renderItem} />
				</Box>
				<Box mt={2} mb={5} justifyContent={'center'} alignItems={'center'}>
					<Button backgroundColor={colors.blue} colorText={colors.white} styleContainer={{
						width: 280,
						borderRadius: 28,
					}} onPress={goBackPress} title={'OK'} />
				</Box>
			</Box>


		</BaseWrapperComponent>
	)
}
const styles = StyleSheet.create({
	img: {
		width: 80,
		height: 80,
	},
})

export default PriceS
