import React, { FC, useRef } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { styles } from './styles'
import { theme } from '../../theme';
import { Camera, Trash } from 'phosphor-react-native';

interface Props {
    screenshot: string | null;
    onTakeShot: () => void;
    onRemoveShot: () => void;
}

const Screenshot = ({ screenshot, onRemoveShot, onTakeShot }: Props) => {
    
    return (
        <TouchableOpacity
            onPress={ screenshot ? onRemoveShot : onTakeShot }
        >
            {
                screenshot ? 
                <View>
                    <Image style={styles.image} source={{ uri: screenshot }} />
                    <Trash 
                        size={22}
                        color={theme.colors.text_secondary} 
                        weight="fill" 
                        style={styles.removeIcon} 
                    />
                </View>
                : <Camera size={24} color={theme.colors.text_secondary} weight="bold" />
            } 
        </TouchableOpacity>
    )
}

export default Screenshot