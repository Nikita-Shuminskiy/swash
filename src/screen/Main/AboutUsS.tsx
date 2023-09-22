import React from 'react'
import { BaseWrapperComponent } from '../../components/baseWrapperComponent'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import HeaderGoBackTitle from '../../components/HeaderGoBackTitle'
import logoImg from '../../assets/Images/logoSwash.png'
import { Box, Image, Text } from 'native-base'
import Button from '../../components/Button'
import { colors } from '../../assets/colors/colors'
import { StyleSheet } from 'react-native'

type AboutUsSProps = {
	navigation: NavigationProp<ParamListBase>
}
const AboutUsS = ({ navigation }: AboutUsSProps) => {
	const goBack = () => {
		navigation.goBack()
	}
	return (
		<BaseWrapperComponent isKeyboardAwareScrollView={true}>
			<Box paddingX={4} mb={6} mt={3} flex={1} justifyContent={'space-between'}>
				<Box>
					<HeaderGoBackTitle title={'About us'} goBackPress={goBack} />
				</Box>
				<Box mt={8} mb={6} alignItems={'center'}>
					<Image source={logoImg} alt={'logo'} style={{ width: 128, height: 57 }} />
				</Box>
				<Box>
					<Text mb={4} fontFamily={'regular'} fontSize={15}>Our goal is to make the process of washing and ironing
						clothes as simple and affordable as
						possible.</Text>

					<Text mb={4} fontFamily={'regular'} fontSize={15}>We understand that modern life is very busy, and many people
						do not have time to do everyday household
						chores, such as washing and ironing. That's why we developed this app to help you optimize your time and
						make this process easier.</Text>

					<Text mb={4} fontFamily={'regular'} fontSize={15}>With our app, you can order laundry services in a few
						clicks. Just select the date and time when it is
						convenient for you to transfer the laundry, and our experienced workers will pick it up from you. After your
						laundry is thoroughly washed and neatly ironed, it will be delivered back to you at the specified time and
						place.</Text>

					<Text mb={6} fontFamily={'regular'} fontSize={15}>We have thought through every detail to provide you with
						high quality washing and ironing.</Text>
				</Box>
				<Box mt={6} alignItems={'center'}>
					<Button backgroundColor={colors.aliceBlue} colorText={colors.blue}
									styleContainer={styles.styleContainerBtn} styleText={{ fontFamily: 'regular' }} onPress={() => {}} title={'Legal link 1'} />
				</Box>
				<Box mt={2} alignItems={'center'}>
					<Button backgroundColor={colors.aliceBlue} colorText={colors.blue}
									styleContainer={styles.styleContainerBtn} styleText={{ fontFamily: 'regular' }} onPress={() => {}} title={'Legal link 2'} />
				</Box>
				<Box mt={6} alignItems={'center'}>
					<Text color={colors.grayLight} fontFamily={'regular'} fontSize={15}>v 1.45.234</Text>
				</Box>
			</Box>
		</BaseWrapperComponent>
	)
}
const styles = StyleSheet.create({
	styleContainerBtn: {
		borderRadius: 28,
		maxWidth: 280,
		width: '100%',
	}
})
export default AboutUsS
