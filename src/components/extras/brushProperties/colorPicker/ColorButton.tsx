import React, { memo } from 'react';
import { TouchableOpacity, StyleSheet, Dimensions, View } from 'react-native';

import { isBright } from '../../utils';

const { width } = Dimensions.get('screen');
export const colorButtonSize = Math.min(Math.round((width - 40) / 12), 50);

interface ColorButtonProps {
  /**
   * Color of the button
   */
  color: string;

  /**
   * Wether the button is selected or not
   * @default false
   */
  selected?: boolean;

  /**
   * Callback the button is pressed
   * @param color Color of the button
   */
  onPress: (color: string) => void;

  /**
   * Wether the button is the top left corner
   * @default false
   */
  isTopStart: boolean;

  /**
   * Wether the button is the top right corner
   * @default false
   */
  isTopEnd: boolean;

  /**
   * Wether the button is the bottom left corner
   * @default false
   */
  isBottomStart: boolean;

  /**
   * Wether the button is the bottom right corner
   * @default false
   */
  isBottomEnd: boolean;
}

/**
 * Buttons displaying a color in the `ColorPicker` component
 */
const ColorButton: React.FC<ColorButtonProps> = ({
  color,
  selected,
  onPress,
  isTopStart,
  isTopEnd,
  isBottomStart,
  isBottomEnd,
}) => {
  const handleOnPress = () => onPress(color);

  const borderRadiusStyle = {
    borderTopStartRadius: isTopStart ? 8 : 0,
    borderTopEndRadius: isTopEnd ? 8 : 0,
    borderBottomStartRadius: isBottomStart ? 8 : 0,
    borderBottomEndRadius: isBottomEnd ? 8 : 0,
  };

  const style = {
    backgroundColor: color,
    borderWidth: selected ? 2 : 0,
    borderColor: isBright(color) ? '#000000b0' : '#ffffffb0',
  };

  return (
    <View style={{ ...borderRadiusStyle, margin: 1 }}>
      <TouchableOpacity
        style={[styles.button, borderRadiusStyle, style]}
        onPress={handleOnPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: colorButtonSize,
    width: colorButtonSize,
    borderWidth: 3,
  },
});

export default memo(ColorButton);
