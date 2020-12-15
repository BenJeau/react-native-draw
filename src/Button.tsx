import React from 'react';
import { TouchableOpacity, View, ViewStyle } from 'react-native';
import { isBright } from './colorPalette';

interface ButtonProps {
  onPress: () => void;
  color?: string;
  style?: ViewStyle;
}

const Button: React.FC<ButtonProps> = ({ children, onPress, color, style }) => (
  <View
    style={[
      {
        borderRadius: 25,
        backgroundColor: color || '#232323',
        elevation: 3,
      },
      style,
    ]}
  >
    <TouchableOpacity
      onPress={onPress}
      style={{
        borderRadius: 25,
        height: 50,
        width: 50,
        backgroundColor: color
          ? isBright(color)
            ? '#000000b0'
            : '#ffffffb0'
          : '',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </TouchableOpacity>
  </View>
);

export default Button;
