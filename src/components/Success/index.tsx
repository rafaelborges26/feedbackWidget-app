import React, { FC, useRef } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles'
import { theme } from '../../theme';
import successImg from '../../assets/success.png'
import CopyRight from '../Copyright';

interface Props {
    onSendAnotherFeedback: () => void
}

const Success = ({ onSendAnotherFeedback }:Props) => {
    
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={successImg}  />

            <Text style={styles.title} >
            Agradecemos o feedback!
            </Text>

            <TouchableOpacity style={styles.button} onPress={onSendAnotherFeedback} >
                <Text style={styles.buttonTitle} >
                Quero enviar outro
                </Text>
            </TouchableOpacity>
            <CopyRight />
        </View>
        
    )
}

export default Success