import { Checkbox } from 'native-base'


type CheckBoxsProps = {
	onPress: (value: boolean) => void
	value: boolean
	borderRadius?: number
}
export const CheckBoxs = ({ value, onPress, borderRadius }: CheckBoxsProps) => {
	return <Checkbox borderRadius={borderRadius} accessibilityLabel='This is a dummy checkbox' size={'md'}
									 onChange={onPress}
									 colorScheme={'blue'} value={'test'} />
}
