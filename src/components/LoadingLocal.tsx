import React from 'react'
import {Modal, StyleSheet, View} from "react-native";
import Loaders from 'react-native-pure-loaders';
import { colors } from '../assets/colors/colors'

const LoadingLocal = ({visible}) => {
    return (
        <Modal transparent={true} visible={visible}>
            <View style={styles.container}>
                <Loaders.Ellipses color={colors.blue}/>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    container: {flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(230,245,255,0.37)'}
})
export default LoadingLocal
