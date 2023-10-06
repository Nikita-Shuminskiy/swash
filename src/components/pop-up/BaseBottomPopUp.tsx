import React from 'react'
import ModalPopup from '../pop-up'
import {Box, Image, Text} from 'native-base'
import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native'
import closeImage from '../../assets/Images/order/closeCircleGray.png'
import Button from '../Button'
import {colors} from '../../assets/colors/colors'
import {DictionaryType} from "../../store/DictionaryStore/dictionary-store";
import {DictionaryEnum} from "../../store/DictionaryStore/type";
import {observer} from "mobx-react-lite";

type PopUpCanselSwashProps = {
    visible: boolean
    text: string
    dictionary: DictionaryType
    onClose: () => void
    onDelete: () => void
}
const BaseBottomPopUp = observer(({visible, onClose, onDelete, text, dictionary}: PopUpCanselSwashProps) => {
    const onPressDelete = () => {
        onDelete()
        onClose()
    }
    return (
        <ModalPopup modalHeight={180} style={{}} visible={visible}
                    onClose={onClose}>
            <Box>
                <Box flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Text fontSize={22} maxWidth={'95%'} fontFamily={'semiBold'}>{text}</Text>
                    <TouchableOpacity onPress={onClose}>
                        <Image alt={'close-img'} source={closeImage}/>
                    </TouchableOpacity>
                </Box>
                <Box flexDirection={'row'} mt={3} justifyContent={'space-between'}>
                    <Box mr={2} flex={1}>
                        <Button styleContainer={styles.styleContainerBtn} backgroundColor={colors.blue}
                                colorText={colors.white}
                                onPress={onClose} title={dictionary[DictionaryEnum.No]}/>
                    </Box>
                    <Box flex={1}>
                        <Button styleContainer={{...styles.styleContainerBtn, ...styles.btnYes}} colorText={colors.blue}
                                onPress={onPressDelete}
                                styleText={colors.blue}
                                title={dictionary[DictionaryEnum.Yes]}/>
                    </Box>
                </Box>
            </Box>
        </ModalPopup>
    )
})
const styles = StyleSheet.create({
    styleContainerBtn: {
        maxWidth: 168,
        minWidth: 0,
        height: 56,
        borderRadius: 28,
    },
    btnYes: {
        borderWidth: 1,
        borderColor: colors.blue,
    },
})
export default BaseBottomPopUp
