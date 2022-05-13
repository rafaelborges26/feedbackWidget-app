import { useState } from 'react';
import { View, TextInput, Image, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { captureScreen } from 'react-native-view-shot'
import { api } from '../../libs/api'
import * as FileSystem from 'expo-file-system'

import { styles } from './styles'
import { theme } from '../../theme';
import { ArrowLeft } from 'phosphor-react-native';
import { FeedbackType } from '../Widget';
import ScreenshotButton from '../ScreenshotButton'
import Button from '../Button'

import { feedbackTypes } from '../../utils/feedbackTypes'
import { Keyboard } from 'react-native';

    interface Props {
        feedbackType: FeedbackType
        onFeedbackCanceled: () => void
        onFeedbackSent: () => void
        changeSizeBottomSheet: (value: 280 | 480) => void
    }

const Form = ({ feedbackType, onFeedbackCanceled, onFeedbackSent, changeSizeBottomSheet}: Props) => {

    const [isSendingFeedback, setIsSendingFeedback] = useState(false)
    const [screenshot, setScreenshot] = useState<string | null>(null)
    const [comment, setComment] = useState('')

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

    async function handleSendFeedback() {
        changeSizeBottomSheet(280);
        Keyboard.dismiss();
        
        if(isSendingFeedback){
            return;
        }
            setIsSendingFeedback(true)

            const screenshotBase64 = screenshot && FileSystem.readAsStringAsync(screenshot, { encoding: 'base64' })


            try {
                await api.post('feedbacks', {
                    type: feedbackType,
                    screenshot: `data:image/png;base64, ${screenshotBase64}`,
                    comment,
                })

                onFeedbackSent()
            } catch (error) {
                console.log(error)
                setIsSendingFeedback(false)
            }
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
                style={styles.input} 
                placeholder="Algo não está funcionando bem? Conte tudo."
                placeholderTextColor={theme.colors.text_secondary}
                autoCorrect={false}
                keyboardAppearance="dark"
                onChangeText={setComment}
                onFocus={() => changeSizeBottomSheet(480)}
                onSubmitEditing={() => changeSizeBottomSheet(280)}
            />

            <View style={styles.footer}>
                <View style={styles.imageFooter}>
                <ScreenshotButton onTakeShot={handleScreenshot} onRemoveShot={handleScreenshotRemove} screenshot={screenshot} />     
                </View>
                <Button onPress={handleSendFeedback} isLoading={isSendingFeedback} />
            </View>

        </View>
    )
}

export default Form