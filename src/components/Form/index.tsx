import React, { FC, useState } from 'react';
import { View, TextInput, Image, Text, TouchableOpacity } from 'react-native';
import { captureScreen } from 'react-native-view-shot'

import { styles } from './styles'
import { theme } from '../../theme';
import { ArrowLeft } from 'phosphor-react-native';
import { FeedbackType } from '../Widget';
import ScreenshotButton from '../ScreenshotButton'
import Button from '../Button'

import { feedbackTypes } from '../../utils/feedbackTypes'

    interface Props {
        feedbackType: FeedbackType
        onFeedbackCanceled: () => void
        onFeedbackSent: () => void
    }

const Form = ({ feedbackType, onFeedbackCanceled, onFeedbackSent}: Props) => {
    const [screenshot, setScreenshot] = useState<string | null>(null)
    
    const feedbackTypeInfo = feedbackTypes[feedbackType]

    function handleScreenshot() {
        captureScreen({
            format: 'jpg',
            quality: 0.8
        }).then(uri => setScreenshot(uri))
        .catch(error => console.log(error))
    }

    function handleScreenshotRemove() {
        setScreenshot(null)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onFeedbackCanceled}>
                    <ArrowLeft size={24} weight={'bold'} color={theme.colors.text_secondary} />
                </TouchableOpacity>

                <View style={styles.titleContainer}>
                    <Image style={styles.image} source={feedbackTypeInfo.image} />

                    <Text style={styles.titleText} >
                        {feedbackTypeInfo.title}
                    </Text>

                </View>

            </View>

            <TextInput 
                multiline 
                style={styles.input} 
                placeholder="Algo não está funcionando bem? Queremos corrigir, conte com detalhes o que está acontecendo."
                placeholderTextColor={theme.colors.text_secondary}
                autoCorrect={false}
                
            />

            <View style={styles.footer}>
                <View style={styles.imageFooter}>
                <ScreenshotButton onTakeShot={handleScreenshot} onRemoveShot={handleScreenshotRemove} screenshot={screenshot} />     
                </View>
                <Button isLoading={false } />
            </View>

        </View>
    )
}

export default Form