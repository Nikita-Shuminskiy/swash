import React, { useState } from 'react'
import { BaseWrapperComponent } from '../../components/baseWrapperComponent'
import ArrowBack from '../../components/ArrowBack'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { Box, Text } from 'native-base'
import { colors } from '../../assets/colors/colors'
import Rating from '../../components/Raiting'
import Button from '../../components/Button'
import InputMultiLine from '../../components/InputMultiLine'
import { routerConstants } from '../../constants/routerConstants'
import rootStore from '../../store/RootStore/root-store'

type FeedbackSProps = {
	navigation: NavigationProp<ParamListBase>
}
const FeedbackS = ({ navigation }: FeedbackSProps) => {
	const [stars, setStars] = useState<number>(0)
	const { OrdersStoreService } = rootStore
	const [comment, setComment] = useState<string>('')
	const goBackPress = () => {
		navigation.navigate(routerConstants.ORDERS)

	}
	const isDisableBtn = !comment.trim() || !stars
	const onPressSendFeedback = () => {
		if (isDisableBtn) return
		OrdersStoreService.reviewOrder({ comment, points: String(stars)}).then((data) => {
			navigation.navigate(routerConstants.ORDERS, { showFeedback: true })
		})
	}
	const onChangeTextComment = (text: string) => {
		setComment(text)
	}

	return (
		<BaseWrapperComponent isKeyboardAwareScrollView={true}>
			<Box style={{ paddingHorizontal: 16 }}>
				<ArrowBack goBackPress={goBackPress} />
				<Box mt={2} mb={2}>
					<Text fontSize={28} fontFamily={'semiBold'}>
						Swash #221
					</Text>
				</Box>
				<Box p={3} borderRadius={16} h={92} backgroundColor={colors.grayBright}>
					<Text mb={2} fontSize={15} fontFamily={'semiBold'}>Your rating</Text>
					<Rating
						onChangeRating={(newRating) => {
							setStars(newRating)
						}}
						initialValue={stars} />
				</Box>
				<Box>
					<Text mb={2} mt={3} fontSize={13} fontFamily={'semiBold'}>Review</Text>
					<InputMultiLine placeholder={'Write your review in more detail'}
													borderRadius={16}
													p={3}
													onChangeText={onChangeTextComment}
													value={comment}
													borderColor={colors.grayBright}
													fontFamily={'regular'}
													placeholderTextColor={colors.grayLight}
													fontSize={15} />
				</Box>
				<Box mt={2} alignItems={'center'}>
					<Button backgroundColor={isDisableBtn ? colors.bluePale : colors.blue} colorText={colors.white}
									styleContainer={{
										borderRadius: 28,
										maxWidth: 280,
										width: '100%',
									}} onPress={onPressSendFeedback} title={'Send feedback'} />
				</Box>
			</Box>
		</BaseWrapperComponent>
	)
}

export default FeedbackS
