import React, { useState } from 'react';
import { Box, Text } from 'native-base';
import { TouchableOpacity, Image } from 'react-native';
import starGrayImg from '../assets/Images/starGray.png';
import starBlueImg from '../assets/Images/starBlue.png';
import { colors } from '../assets/colors/colors'

type RatingProps = {
	onChangeRating: (rating: number) => void;
	initialValue: number;
};

const Rating = ({ onChangeRating, initialValue }: RatingProps) => {
	const handleRatingPress = (newRating: number) => {
		onChangeRating(newRating);
	};

	return (
		<Box flexDirection="row" alignItems="center" justifyContent={'space-between'}>
			<Box flexDirection={'row'}>
				{[1, 2, 3, 4, 5].map((value) => (
					<TouchableOpacity
						key={value}
						onPress={() => handleRatingPress(value)}
						style={{ marginRight: 11 }}
					>
						<Image
							alt="star"
							source={value <= initialValue ? starBlueImg : starGrayImg}
							style={{ width: 32, height: 32 }}
						/>
					</TouchableOpacity>
				))}
			</Box>
			<Text fontSize={17} fontFamily="semiBold" color={colors.blue}>
				{initialValue} of 5
			</Text>
		</Box>
	);
};


export default Rating;
