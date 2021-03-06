import React, { FC, useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native'
import { ChatTeardropDots } from 'phosphor-react-native'
import BottomSheet from '@gorhom/bottom-sheet'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { feedbackTypes } from '../../utils/feedbackTypes'

import { styles } from './styles'
import { theme } from '../../theme';
import Options from '../Options';
import Success from '../Success';
import Form from '../Form';

export type FeedbackType = keyof typeof feedbackTypes

const Widget = () => {
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
    const [feedbackSent, setFeedbackSent] = useState(false)
    const [snapPointBottomsheetHeight, setSnapPointBottomsheetHeight] = useState(280)

    const bottomSheetRef = useRef<BottomSheet>(null);

    function handleOpen(){
        bottomSheetRef.current?.expand() 
    }

    function handleRestartFeedback() {
        setFeedbackType(null)
        setFeedbackSent(false)
        setSnapPointBottomsheetHeight(280)
    }

    function handleFeedbackSent() {
        setFeedbackSent(true)
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
            snapPoints={[1, snapPointBottomsheetHeight]}
            backgroundStyle={styles.modal}
            handleIndicatorStyle={styles.indicator}
        >    
            {
                feedbackSent ?
                <Success onSendAnotherFeedback={handleRestartFeedback}
                     />
                :        
                    feedbackType ?
                        <Form feedbackType={feedbackType} onFeedbackCanceled={handleRestartFeedback} onFeedbackSent={handleFeedbackSent} changeSizeBottomSheet={setSnapPointBottomsheetHeight} />
                    :
                        <Options onFeedbackTypeChanged={setFeedbackType} />
            }
        </BottomSheet>

        </>
    )
}

export default gestureHandlerRootHOC(Widget) as FC ; //para funcionar o arrastar do modal