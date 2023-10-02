import React from 'react';
import InputCustom from "../../../components/TextInput";
import {Box} from "native-base";
import Button from "../../../components/Button";
import {colors} from "../../../assets/colors/colors";

const InputChange = ({value, onPress, label, btnTitle}) => {
    return (
        <Box>
            <InputCustom value={value} isReadOnly={true} editable={false}
                         borderRadius={16} heightInput={12}
                         label={label} />
            <Box style={{ width: 130 }} h={19} position={'absolute'} right={0} top={10}>
                <Button styleText={{ fontSize: 10 }} styleContainer={{ minHeight: 10, height: 48 }}
                        onPress={onPress}
                        backgroundColor={colors.blue}
                        colorText={colors.white}
                        title={btnTitle} />
            </Box>
        </Box>
    );
};

export default InputChange;