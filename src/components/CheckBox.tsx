import { Checkbox } from 'native-base'
import { colors } from '../assets/colors/colors'



type CheckBoxsProps = {
	onPress: (value: boolean) => void
	value: boolean
}
export const CheckBoxs = ({value, onPress}:CheckBoxsProps) => {
	return <Checkbox accessibilityLabel="This is a dummy checkbox" size={'md'}  onChange={onPress} colorScheme={'blue'} value={'test'} />
};
