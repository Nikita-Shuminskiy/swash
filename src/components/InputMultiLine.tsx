import React from 'react'
import { TextArea } from 'native-base'
import { InterfaceInputProps } from 'native-base/src/components/primitives/Input/types'

type  InputMultiLineProps = InterfaceInputProps & {}
const InputMultiLine = ({ ...rest }: InputMultiLineProps) => {
	return (
		<TextArea autoCompleteType={false} {...rest} />
	)
}

export default InputMultiLine
