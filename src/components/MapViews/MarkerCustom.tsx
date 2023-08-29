import React from 'react'
import { Box, Text, Image } from 'native-base'
import { LogisticsPointType } from '../../api/Client/type'
import { Marker } from 'react-native-maps'
import paczkomatLogo from '../../assets/Images/Map/PaczkomatLogo.png'
import { ImageBackground } from 'react-native'
import { colors } from '../../assets/colors/colors'

type MarkerCustomProps = {
	point: LogisticsPointType
}
const MarkerCustom = ({ point }: MarkerCustomProps) => {
	console.log(point.lat)
	console.log(point.lon)
	return (
		<Marker title={point.point_name} description={point.address} coordinate={{
			latitude: +point.lat,
			longitude: +point.lon,
		}}>
			<ImageBackground source={paczkomatLogo} style={{ width: 40, height: 40, justifyContent: 'flex-end', alignItems: 'center' }} >
				<Box>
					<Text fontWeight={'500'} fontSize={7} color={colors.white}>{point.hours}</Text>
				</Box>

			</ImageBackground>

		</Marker>
	)
}

export default MarkerCustom
