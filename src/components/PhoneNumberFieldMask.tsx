import React, {useState} from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity, Text} from 'react-native';
import CountryPicker, {Country} from 'react-native-country-picker-modal';
import {TextInputMask} from 'react-native-masked-text';
import {CountryType} from "../api/Client/type";
import {Box, FormControl, WarningOutlineIcon, Image} from "native-base";
import {colors} from "../assets/colors/colors";
import arrow from '../assets/Images/arrow-bottom.png'

type PhoneNumberInputProps = {
    countries: CountryType[];
    errorMessage?: string
    isRequired: boolean
    isInvalid: boolean
    onValidNumber?: (isValid: boolean) => void
    onChangeTextPhone: (text: string, isValid: boolean) => void
    setCountry: any
    country: any
    placeholder: string
    phoneValue: string
};

export const PhoneNumberInput = ({
                                     isRequired,
                                     onChangeTextPhone,
                                     isInvalid,
                                     onValidNumber,
                                     errorMessage,
                                     countries,
                                     setCountry,
                                     country,
                                     placeholder,
                                     phoneValue,
                                     ...rest
                                 }: PhoneNumberInputProps) => {

    const [isCountryPickerVisible, setCountryPickerVisible] = useState(false);
    const selectedCountry = countries.find((c) => c.country === country?.cca2);
    const handleCountrySelect = (selectedCountry: Country) => {
        setCountry(selectedCountry);
    };
    const handlePhoneInputChange = (text: string) => {
        let isValid = selectedCountry?.tel_mask.length
        onChangeTextPhone(text,isValid ? text.length === isValid : true);
    };

    const convertMask = (mask: string) => {
        return mask.replace(/Х/g, '9');
    };


    return (
        <Box w={'100%'}>
            <FormControl isInvalid={isInvalid} isRequired={isRequired}>
                <Box style={styles.container}>
                    <TouchableOpacity
                        onPress={() => {
                            setCountryPickerVisible(true);
                        }}
                        style={styles.countryPickerButton}
                    >
                        <CountryPicker
                            onClose={() => setCountryPickerVisible(false)}
                            onOpen={() => setCountryPickerVisible(true)}
                            countryCode={country?.cca2 ?? 'PL'}
                            withFlag
                            withFilter
                            withAlphaFilter
                            withCallingCode
                            onSelect={handleCountrySelect}
                            visible={isCountryPickerVisible}
                        />
                        <Text>+{country?.callingCode} </Text>
                        <Image alt={'img'} source={arrow}
                               style={{width: 24, height: 24}}/>
                    </TouchableOpacity>
                    <TextInputMask
                        style={{color: colors.black, fontSize: 16, fontFamily: 'regular', width: '100%'}}
                        type={selectedCountry ? 'custom' : 'only-numbers'}
                        options={{
                            mask: selectedCountry ? convertMask(selectedCountry?.tel_mask) : null,
                        }}
                        value={phoneValue}
                        onChangeText={handlePhoneInputChange}
                        keyboardType="numeric"
                        placeholder={placeholder}
                    />
                </Box>
                <FormControl.ErrorMessage fontFamily={'regular'} leftIcon={<WarningOutlineIcon size='xs'/>}>
                    {errorMessage ? errorMessage : 'Field is required'}
                </FormControl.ErrorMessage>
            </FormControl>
        </Box>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        width: '100%',
        height: 56,
        borderWidth: 1,
        borderColor: colors.grayBright,
        backgroundColor: 'rgba(245,245,246,0)',
        borderRadius: 16,
        alignItems: 'center',
        flexDirection: 'row',
    },
    countryPickerButton: {
        marginRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
});
