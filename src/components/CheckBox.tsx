import { Checkbox } from 'native-base'
import { StyleProp, ViewStyle } from 'react-native'
import { ICheckboxComponentType } from 'native-base/lib/typescript/components/primitives/Checkbox/types'


type CheckBoxsProps = ICheckboxComponentType & {
	onPress: (value: boolean) => void
	value: boolean
	borderRadius?: number
}
export const CheckBoxs = ({ value, onPress, borderRadius }: CheckBoxsProps) => {
	return <Checkbox borderRadius={borderRadius} accessibilityLabel='This is a dummy checkbox' size={'md'}
									 onChange={onPress}
									 colorScheme={'blue'} value={'test'} />
}
