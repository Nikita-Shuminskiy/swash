import React from 'react'
import { Box, Text } from 'native-base'
import { colors } from '../../assets/colors/colors'
import { Image, StyleSheet } from 'react-native'
import { DATA_IMG } from '../../utils/constants'
import hypoallergenicBlueImg from '../../assets/Images/order/quill-blue.png'
import ironBlueImg from '../../assets/Images/order/iron-blue.png'
import { UntilsOrderType } from '../../api/Client/type'
type UntilsItemViewerProps = {
	until: UntilsOrderType
}
const UntilsItemViewer = ({until}: UntilsItemViewerProps) => {
	return (
		<Box mb={2} borderWidth={1} minH={104} p={3}
				 alignItems={'flex-end'}
				 flexDirection={'row'}
				 justifyContent={'space-between'}
				 borderColor={colors.grayBright}
				 borderRadius={16}>
			<Box>
				<Box alignItems={'flex-start'} flexDirection={'row'}>
					<Image style={styles.img} source={DATA_IMG[until.type_of_units_id]?.img} />
					<Box ml={4}>
						<Text fontSize={17} fontFamily={'semiBold'}>{DATA_IMG[until.type_of_units_id].name}</Text>
						<Text fontSize={17} fontFamily={'regular'}>{until.count}{' '}pcs</Text>
					</Box>
				</Box>
				<Box mt={2} flexDirection={'row'}>
					<Box mr={2} style={{ width: 75, height: 24 }} flexDirection={'row'} alignItems={'center'}
							 justifyContent={'center'} borderWidth={1} borderColor={colors.grayBright} borderRadius={16}>
						<Image style={{ width: 16, height: 16 }} source={hypoallergenicBlueImg} />
						<Text fontSize={13} color={colors.blue} fontFamily={'regular'}> +11 zł</Text>
					</Box>


					<Box style={{ width: 75, height: 24 }} flexDirection={'row'} alignItems={'center'}
							 justifyContent={'center'}
							 borderWidth={1} borderColor={colors.grayBright} borderRadius={16}>
						<Image style={{ width: 16, height: 16 }} source={ironBlueImg} />
						<Text fontSize={13} color={colors.blue} fontFamily={'regular'}> +22 zł</Text>
					</Box>
				</Box>
			</Box>

			<Box>
				<Text fontSize={17} fontFamily={'semiBold'} color={colors.blue}>11 zł</Text>
			</Box>
		</Box>
	)
}
const styles = StyleSheet.create({
	img: {
		width: 80,
		height: 80,
	},
})
export default UntilsItemViewer
