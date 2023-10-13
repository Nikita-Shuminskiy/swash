import {Box} from "native-base";
import {ActivityIndicator} from "react-native";
import {colors} from "../assets/colors/colors";
import React from "react";

export const LoadingIndicatorView = () => {
    return (
        <Box alignItems={'center'} flex={1} w={'100%'} justifyContent={'flex-start'}>
            <ActivityIndicator
                color={colors.blue}
                size='large'
            />
        </Box>
    )
}