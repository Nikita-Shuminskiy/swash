import React, { useEffect, useState } from 'react'
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, {
	Easing,
	withSpring,
	useSharedValue,
	useAnimatedStyle,
	useAnimatedGestureHandler,
	withTiming, runOnJS,
} from 'react-native-reanimated'
import heartBlueImg from '../assets/Images/heartBlue.png'
import { colors } from '../assets/colors/colors'
import { NavigationProp, ParamListBase } from '@react-navigation/native'

const { width } = Dimensions.get('window')
type AlertFeedbackProps = {
	navigation: NavigationProp<ParamListBase>
	route: any
}
const AlertFeedback = ({ route, navigation }: AlertFeedbackProps) => {
	const [showFeedback, setShowAlertFeedback] = useState(false)
	const START_WIDTH = -width - 20
	const translateX = useSharedValue(START_WIDTH) // Начальное значение за пределами экрана слева

	const showAlertHandler = (value) => {
		translateX.value = withTiming(value, {
			duration: 500,
		})
	}
	const gestureHandler = useAnimatedGestureHandler<any, { startX: number }>({
		onStart: (_, context) => {
			context.startX = translateX.value
		},
		onActive: (event, context) => {
			translateX.value = context.startX + event.translationX
		},
		onEnd: (event) => {
			if (Math.abs(event.translationX) > width / 4) {
				translateX.value = withTiming(event.translationX > 0 ? width + 20 : START_WIDTH, {
					duration: 500,
				}, () => {
					runOnJS(setShowAlertFeedback)(false)
					translateX.value = START_WIDTH
				})
			} else {
				translateX.value = withTiming(0, {
					duration: 200,
				})
			}
		},
	})
	useEffect(() => {
		if (route.params?.showFeedback) {
			setShowAlertFeedback(true)
			navigation.setParams({ showFeedback: false })
		}
	}, [route.params])
	useEffect(() => {
		if (showFeedback) {
			setTimeout(() => {
				showAlertHandler(0)
			}, 1000)
		}
		setTimeout(() => {
			if (showFeedback && translateX.value === 0) {
				showAlertHandler(1000)
			}
			setTimeout(() => {
				setShowAlertFeedback(false)
				setTimeout(() => {
					translateX.value = START_WIDTH
				}, 100)
			}, 500)
		}, 5000)

	}, [showFeedback, translateX.value])

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: translateX.value }],
		}
	})

	return (
		<PanGestureHandler onGestureEvent={gestureHandler}>
			<Animated.View
				style={[
					styles.container,
					{
						backgroundColor: colors.blue,
					},
					animatedStyle,
				]}
			>
				<Image alt={'heart'} source={heartBlueImg} />
				<Text style={styles.text}>Thank you for your feedback</Text>
			</Animated.View>
		</PanGestureHandler>
	)
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: '5%',
		width: '92%',
		left: '5%',
		height: 75,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		borderRadius: 16,
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		zIndex: 10,
	},
	text: {
		fontSize: 17,
		color: colors.white,
		fontFamily: 'regular',
	},
})

export default AlertFeedback
