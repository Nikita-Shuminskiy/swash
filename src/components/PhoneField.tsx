import React, {useRef} from 'react'
import PhoneInput, {PhoneInputProps} from 'react-native-phone-number-input'
import {colors} from '../assets/colors/colors'
import {Box, FormControl, WarningOutlineIcon} from 'native-base'
import {Image} from 'react-native'
import arrow from '../assets/Images/arrow-bottom.png'

type PhoneNumberFieldProps = PhoneInputProps & {
    isRequired: boolean
    isInvalid: boolean
    errorMessage?: string
    onValidNumber?: (isValid: boolean) => void
    onChangeTextPhone: (text: string, isValid: boolean) => void
}

export const PhoneNumberField: React.FC<PhoneNumberFieldProps> = ({
                                                                      isRequired,
                                                                      onChangeTextPhone,
                                                                      isInvalid,
                                                                      onValidNumber,
                                                                      errorMessage,
                                                                      ...rest
                                                                  }) => {
    const phoneInput = useRef<PhoneInput>(null)

    return (
        <Box w={'100%'}>
            <FormControl isInvalid={isInvalid} isRequired={isRequired}>
                <PhoneInput
                    ref={phoneInput}
                    textInputProps={{
                        keyboardType: 'numeric',
                    }}
                    renderDropdownImage={<Image source={arrow}
                                                style={{width: 24, height: 24, position: 'absolute', right: 0}}/>}
                    containerStyle={{
                        width: '100%',
                        height: 56,
                        borderWidth: 1,
                        borderColor: colors.grayBright,
                        backgroundColor: 'rgba(245,245,246,0)',
                        borderRadius: 16,
                        alignItems: 'center',
                    }}
                    textContainerStyle={{borderRadius: 16, backgroundColor: 'transparent', height: 56}}
                    codeTextStyle={{color: colors.black, height: 23, fontWeight: '400', fontSize: 16}}
                    textInputStyle={{color: colors.black, fontSize: 16, fontFamily: 'regular'}}
                    layout='first'
                    onChangeText={(text) => {
                        onChangeTextPhone(text, phoneInput.current?.isValidNumber(text))
                    }}
                    {...rest}
                />
                <FormControl.ErrorMessage fontFamily={'regular'} leftIcon={<WarningOutlineIcon size='xs'/>}>
                    {errorMessage ? errorMessage : 'Field is required'}
                </FormControl.ErrorMessage>
            </FormControl>
        </Box>
    )
}

