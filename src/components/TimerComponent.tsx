import React, { useState, useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { Box, Container, Text } from 'native-base'
import { colors } from '../assets/colors/colors'

type TimerComponentProps = {
	onPressSendCodeAgain: () => void
}
const TimerComponent = ({ onPressSendCodeAgain }: TimerComponentProps) => {
	const [seconds, setSeconds] = useState(40)
	const [isRunning, setIsRunning] = useState(true)

	useEffect(() => {
		if (isRunning && seconds > 0) {
			const interval = setInterval(() => {
				setSeconds((prevSeconds) => prevSeconds - 1)
			}, 1000)

			return () => {
				clearInterval(interval)
			}
		} else if (seconds === 0) {
			setIsRunning(false)
		}
	}, [isRunning, seconds])

	const onPress = () => {
		setSeconds(40)
		setIsRunning(true)
		onPressSendCodeAgain()
	}
	return (
		<Container>
			<Box contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Box>
					{isRunning ? (
						<Box>
							<Text fontSize={15} fontFamily={'regular'} color={colors.grayLight}>Send the code again after <Text
								fontSize={15} fontFamily={'regular'} color={colors.black}>{seconds} seconds</Text></Text>
						</Box>
					) : (
						<TouchableOpacity onPress={onPress}>
							<Text fontSize={15} fontFamily={'regular'} color={colors.blue}>Send the code again</Text>
						</TouchableOpacity>
					)}
				</Box>
			</Box>
		</Container>
	)
}

export default TimerComponent
