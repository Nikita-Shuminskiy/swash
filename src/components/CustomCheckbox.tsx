import { TouchableOpacity, StyleSheet, Image } from 'react-native'
import active from '../assets/Images/order/blue-circle.png'
import unActive from '../assets/Images/circle-outline-gray.png'
const CustomCheckbox = ({ checked, onPress }) => {
	return (
		<TouchableOpacity style={styles.checkboxContainer} onPress={onPress}>
			<Image
				source={checked ? active : unActive}
				style={styles.checkboxImage}
			/>
		</TouchableOpacity>
	);
};
export default CustomCheckbox
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	checkboxContainer: {
		width: 20,
		height: 20,
	},
	checkboxImage: {
		width: '100%',
		height: '100%',
		resizeMode: 'contain',
	},
});
