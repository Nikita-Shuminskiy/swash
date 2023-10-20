import React, {useEffect} from 'react'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {GestureResponderEvent, Platform, SafeAreaView, StyleProp, ViewStyle} from 'react-native'
import {colors} from '../assets/colors/colors'
import {StatusBar} from 'expo-status-bar'

type BaseWrapperComponentType = {
    children: JSX.Element | JSX.Element[]
    onTouchStart?: (event: GestureResponderEvent) => void
    onTouchEnd?: (event: GestureResponderEvent) => void
    isKeyboardAwareScrollView?: boolean
    styleSafeArea?: any
    styleKeyboardAwareScrollView?: any
    isBackdrop?: boolean
}
export const BaseWrapperComponent = ({
                                         children,
                                         onTouchEnd,
                                         onTouchStart,
                                         isKeyboardAwareScrollView = false,
                                         styleSafeArea,
                                         isBackdrop = false,
                                         styleKeyboardAwareScrollView,

                                     }: BaseWrapperComponentType) => {
    const ref = React.useRef(null)

    return (
        <SafeAreaView
            style={{
                flex: 1,
                paddingTop: Platform.OS === 'ios' ? 10 : 40,
                backgroundColor: colors.white,
                ...styleSafeArea
            }}>
            {isKeyboardAwareScrollView ? (
                <KeyboardAwareScrollView
                    ref={ref}
                    enableOnAndroid={true}
                    keyboardShouldPersistTaps={'handled'}
                    contentContainerStyle={{
                        backgroundColor: colors.white,
                        marginBottom: 10,
                        width: '100%',
                        ...styleKeyboardAwareScrollView
                    }}
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                >
                    {children}
                </KeyboardAwareScrollView>
            ) : (
                children
            )}
        </SafeAreaView>
    )
}
