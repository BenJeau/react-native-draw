import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Pressable, View, Text, StyleSheet, Platform } from 'react-native';

interface ButtonProps {
  onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({ onPress, children }) => {
  const theme = useTheme();

  return (
    <View
      style={[styles.buttonContainer, { backgroundColor: theme.colors.card }]}
    >
      <Pressable
        style={({ pressed }) => ({
          ...(Platform.OS === 'ios'
            ? {
                backgroundColor: pressed
                  ? theme.colors.border
                  : theme.colors.card,
                borderWidth: StyleSheet.hairlineWidth,
                borderColor: theme.colors.border,
              }
            : {}),
          ...styles.button,
        })}
        android_ripple={{ color: theme.colors.text }}
        onPress={onPress}
      >
        <Text
          style={{
            color: theme.colors.text,
            lineHeight: 20,
          }}
        >
          {children}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    overflow: 'hidden',
    borderRadius: 5,
    elevation: 5,
    marginBottom: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
});

export default Button;
