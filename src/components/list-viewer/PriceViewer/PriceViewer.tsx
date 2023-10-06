import React from 'react';
import {observer} from "mobx-react-lite";
import {colors} from "../../../assets/colors/colors";
import {Image, StyleSheet} from "react-native";
import {DATA_IMG} from "../../../utils/constants";
import {Box, Text} from "native-base";
import hypoallergenicBlueImg from "../../../assets/Images/order/quill-blue.png";
import ironBlueImg from "../../../assets/Images/order/iron-blue.png";

const PriceViewer = observer(({price}: any) => {
    return (
        <Box mb={2} borderWidth={1} minH={104} paddingX={2} flexDirection={'row'} alignItems={'center'}
             borderColor={colors.grayBright}
             borderRadius={16}>
            <Image style={styles.img} source={DATA_IMG[price.type_of_units_id]?.img}/>
            <Box ml={2} alignItems={'flex-start'}>
                <Text fontSize={17} fontFamily={'semiBold'}>{price.name}</Text>
                <Text fontSize={17} fontFamily={'semiBold'} color={colors.blue}>{price.price_basic} zł</Text>
            </Box>
            <Box flexDirection={'row'} position={'absolute'} bottom={2} right={2}>
                <Box mr={2} style={{width: 75, height: 24}} flexDirection={'row'} alignItems={'center'}
                     justifyContent={'center'} borderWidth={1} borderColor={colors.grayBright} borderRadius={16}>
                    <Image style={{width: 16, height: 16}} source={hypoallergenicBlueImg}/>
                    <Text fontSize={13} color={colors.blue} fontFamily={'regular'}> +{price.price_add_hypo} zł</Text>
                </Box>
                <Box style={{width: 75, height: 24}} flexDirection={'row'} alignItems={'center'}
                     justifyContent={'center'}
                     borderWidth={1} borderColor={colors.grayBright} borderRadius={16}>
                    <Image style={{width: 16, height: 16}} source={ironBlueImg}/>
                    <Text fontSize={13} color={colors.blue} fontFamily={'regular'}> +{price.price_add_iron} zł</Text>
                </Box>
            </Box>
        </Box>
    );
})
const styles = StyleSheet.create({
    img: {
        width: 80,
        height: 80,
    },
})

export default PriceViewer;