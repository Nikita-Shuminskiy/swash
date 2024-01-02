import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Box } from 'native-base'
import { colors } from '../../assets/colors/colors'

type DotsOnboardingProps = {
	active: 1 | 2 | 3 | 4 | 5
}

const DotsOnboarding = ({ active }: DotsOnboardingProps) => {
	return (
		<Box style={styles.container}>
			{[1, 2, 3, 4, 5].map((index) => (
				<Box key={index} style={[styles.dot, active === index ? styles.activeDot : null]} />
			))}
		</Box>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
	},
	dot: {
		marginRight: 8,
		width: 12,
		height: 12,
		borderRadius: 5,
		backgroundColor: colors.grayLight,
	},
	activeDot: {
		backgroundColor: colors.blue,
	},
})

export default DotsOnboarding
