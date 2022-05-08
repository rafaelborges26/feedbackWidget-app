import React, { FC, useRef } from 'react';
import { View, TouchableOpacity, TouchableOpacityProps, Image, ImageProps, Text } from 'react-native';
import { styles } from './styles'
import { theme } from '../../theme';

interface Props extends TouchableOpacityProps {
    title: string;
    image: ImageProps;
}

const Option = ({ title, image, ...rest }:Props) => {
    
    return (
        <TouchableOpacity style={styles.container} {...rest}>
            <Image 
                source={image} 
                style={styles.image}
            />
            <Text style={styles.title}>
                {title}
            </Text>

            
        </TouchableOpacity>
    )
}

export default Option