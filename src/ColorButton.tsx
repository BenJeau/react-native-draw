/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useMemo } from 'react';
import { TouchableOpacity, StyleSheet, Dimensions, View } from 'react-native';

import { isBright } from './colorPalette';

const { width } = Dimensions.get('screen');
const size = Math.round((width - 40) / 12);
const maxSize = 50;

interface ColorButtonProps {
  color: string;
  selectedColor: string;
  updateColor: (color: string) => void;
  isTopStart: boolean;
  isTopEnd: boolean;
  isBottomStart: boolean;
  isBottomEnd: boolean;
}

const ColorButton: React.FC<ColorButtonProps> = ({
  color,
  selectedColor,
  updateColor,
  isTopStart,
  isTopEnd,
  isBottomStart,
  isBottomEnd,
}) => {
  const handleOnPress = useCallback(() => updateColor(color), [
    color,
    updateColor,
  ]);
  const borderRadiusStyle = useMemo(
    () => ({
      borderTopStartRadius: isTopStart ? 8 : 0,
      borderTopEndRadius: isTopEnd ? 8 : 0,
      borderBottomStartRadius: isBottomStart ? 8 : 0,
      borderBottomEndRadius: isBottomEnd ? 8 : 0,
    }),
    [isBottomEnd, isBottomStart, isTopEnd, isTopStart]
  );

  const style = useMemo(
    () => ({
      backgroundColor: color,
      borderWidth: selectedColor === color ? 2 : 0,
      borderColor: isBright(color) ? '#000000b0' : '#ffffffb0',
    }),
    [color, selectedColor]
  );

  return (
    <View style={{ borderWidth: 1, ...borderRadiusStyle, borderColor: '#eee' }}>
      <TouchableOpacity
        style={[styles.button, borderRadiusStyle, style]}
        onPress={handleOnPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: size,
    width: size,
    maxHeight: maxSize,
    maxWidth: maxSize,
    borderWidth: 3,
  },
});

export default ColorButton;
