import React, { useEffect } from 'react'
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, {
	Easing,
	withSpring,
	useSharedValue,
	useAnimatedStyle,
	useAnimatedGestureHandler,
	withTiming,
	runOnJS,
} from 'react-native-reanimated'
import heartBlueImg from '../assets/Images/heartBlue.png'
import { colors } from '../assets/colors/colors'

const { width } = Dimensions.get('window')

const AlertFeedback = () => {
	const translateX = useSharedValue(-width) // Начальное значение за пределами экрана слева

	const gestureHandler = useAnimatedGestureHandler<any, { startX: number }>({
		onStart: (_, context) => {
			context.startX = translateX.value
		},
		onActive: (event, context) => {
			translateX.value = context.startX + event.translationX
		},
		onEnd: (event) => {
			if (Math.abs(event.translationX) > width / 3) {
				translateX.value = withTiming(
					event.translationX > 0 ? width : -width,
					{
						duration: 500,
						easing: Easing.inOut(Easing.ease),
					}
				);
			} else {
				translateX.value = withTiming(0, {
					duration: 500,
					easing: Easing.inOut(Easing.ease),
				})
			}
		},
	})

	useEffect(() => {
		setTimeout(() => {
			translateX.value = withTiming(0, {
				duration: 500,
				easing: Easing.inOut(Easing.ease),
			})
		}, 1000)
		setTimeout(() => {
			translateX.value = withTiming(1000, {
				duration: 500,
				easing: Easing.inOut(Easing.ease),
			})
		}, 5000)
	}, [])

	const hideAlert = () => {

	}

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
		top: 5,
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
