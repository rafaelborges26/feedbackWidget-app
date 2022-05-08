import React, { FC, useRef } from 'react';
import { View, TextInput, Image, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles'
import { theme } from '../../theme';
import { ArrowLeft } from 'phosphor-react-native';
import { FeedbackType } from '../Widget';

import { feedbackTypes } from '../../utils/feedbackTypes'

interface Props {
    feedbackType: FeedbackType
    }

const Form = ({ feedbackType }: Props) => {
    const feedbackTypeInfo = feedbackTypes[feedbackType]

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity>
                    <ArrowLeft size={24} weight={'bold'} color={theme.colors.text_secondary} />
                </TouchableOpacity>

                <View style={styles.titleContainer}>
                    <Image style={styles.image} source={feedbackTypeInfo.image} />

                    <Text style={styles.titleText} >
                        {feedbackTypeInfo.title}
                    </Text>

                </View>

            </View>
        </View>
    )
}

export default Form