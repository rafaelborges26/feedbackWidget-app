import React, { FC, useRef } from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles'
import { feedbackTypes } from '../../utils/feedbackTypes'
import { FeedbackType } from '../Widget'
import Option from '../Option';

interface Props {
    onFeedbackTypeChanged: (feedbackType: FeedbackType) => void
}

const Options = ({onFeedbackTypeChanged}: Props) => {
    
    return (
    <View style={styles.container} >
        <Text style={styles.title}>Deixe seu feedback</Text>
        <View style={styles.options} >
            {
                Object.entries(feedbackTypes).map(([key, value]) => (
                    <Option
                        key={key}
                        title={value.title}
                        image={value.image}
                        onPress={() => onFeedbackTypeChanged(key as FeedbackType)}
                    />
                ))
            }
        </View>

    </View>
)

}

export default Options