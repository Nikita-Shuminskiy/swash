import React from 'react';
import {Image, ImageSourcePropType, TouchableOpacity} from "react-native";
import arrowLeftBlackImg from "../assets/Images/arrowBackBlue.png";
type ArrowBackProps = {
    goBackPress: any,
    img?: ImageSourcePropType
    styleTouchable?: any
}
const ArrowBack = ({goBackPress, img, styleTouchable}: ArrowBackProps) => {
    return (
        <TouchableOpacity style={{marginTop: 10, ...styleTouchable}} onPress={goBackPress}>
            <Image style={{width: 20, height: 14}} source={img ?? arrowLeftBlackImg}/>
        </TouchableOpacity>
    );
};

export default ArrowBack;
