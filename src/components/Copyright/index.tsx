import React, { FC, useRef } from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles'
import { theme } from '../../theme';

const CopyRight = () => {
    
    return (
        <View >
            <Text style={styles.text} >
                Feito com ♥ pela Rocketseat
            </Text>
        </View>
    )
}

export default CopyRight