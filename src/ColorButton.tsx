import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

interface ColorButtonProps {
  color: string;
  selectedColor: string;
  updateColor: (color: string) => void;
}

const ColorButton: React.FC<ColorButtonProps> = ({
  color,
  selectedColor,
  updateColor,
}) => {
  const handleOnPress = () => updateColor(color);
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: color,
          opacity: selectedColor === color ? 0.5 : 1,
        },
      ]}
      onPress={handleOnPress}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    height: 35,
    width: 35,
    borderColor: 'black',
    borderWidth: 2,
  },
});

export default ColorButton;
