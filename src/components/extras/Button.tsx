import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import { isBright } from './utils';

interface ButtonProps {
  onPress: () => void;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

const Button: React.FC<ButtonProps> = ({ children, onPress, color, style }) => {
  const containerStyle = [
    styles.container,
    {
      backgroundColor: color || '#232323',
    },
    style,
  ];

  const buttonStyle = [
    styles.button,
    {
      backgroundColor: color
        ? isBright(color)
          ? '#000000b0'
          : '#ffffffb0'
        : '',
    },
    style,
  ];

  return (
    <View style={containerStyle}>
      <RectButton
        onPress={onPress}
        style={buttonStyle}
        activeOpacity={0.5}
        rippleColor={color}
      >
        {children}
      </RectButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    elevation: 3,
  },
  button: {
    borderRadius: 25,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Button;
