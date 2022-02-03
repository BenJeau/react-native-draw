import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';

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
        style={styles.button}
        android_ripple={{ color: theme.colors.text }}
        onPress={onPress}
      >
        <Text style={{ color: theme.colors.text }}>{children}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    overflow: 'hidden',
    borderRadius: 10,
    elevation: 5,
    marginBottom: 10,
  },
  button: {
    padding: 10,
  },
});

export default Button;
