import React, { FC, useRef } from 'react';
import { TouchableOpacity } from 'react-native'
import { ChatTeardropDots } from 'phosphor-react-native'
import BottomSheet from '@gorhom/bottom-sheet'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { feedbackTypes } from '../../utils/feedbackTypes'

import { styles } from './styles'
import { theme } from '../../theme';
import Options from '../Options';
import Form from '../Form';

export type FeedbackType = keyof typeof feedbackTypes

const Widget = () => {
    const bottomSheetRef = useRef<BottomSheet>(null);

    function handleOpen(){
        bottomSheetRef.current?.expand() 
    }

    return (
        <>
        <TouchableOpacity 
            style={styles.button} 
            onPress={handleOpen}
        >
            <ChatTeardropDots 
                size={24}
                weight={'bold'}
                color={theme.colors.text_on_brand_color} 
            />
        </TouchableOpacity>

        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={[1, 280]}
            backgroundStyle={styles.modal}
            handleIndicatorStyle={styles.indicator}
        >
            {/*<Options />*/}
            <Form feedbackType="BUG" />
            
            
        </BottomSheet>

        </>
    )
}

export default gestureHandlerRootHOC(Widget) as FC ; //para funcionar o arrastar do modal