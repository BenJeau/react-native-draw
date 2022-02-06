import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { DEFAULT_COLORS } from '../../constants';
import ColorButton from './ColorButton';

export interface ColorPickerProps {
  /**
   * Brush color, one from the colors provided
   */
  color: string;

  /**
   * Callback when a color is selected
   * @param newColor - New selected color
   */
  onColorChange: (newColor: string) => void;

  /**
   * Color picker colors, specifying the color picker sections each
   * containing rows of colors. First array defines the sections, second
   * one defines the rows, and the last one defines the columns.
   * @default DEFAULT_COLORS
   */
  colors?: string[][][];
}

/**
 * Color picker component displaying a grid of colors triggering a
 * callback when a color is selected and being able to select a color
 */
const ColorPicker: React.FC<ColorPickerProps> = ({
  color,
  onColorChange,
  colors = DEFAULT_COLORS,
}) => (
  <View style={styles.container}>
    <View style={styles.content}>
      {colors.map((section, gKey) => (
        <View
          key={gKey}
          style={colors.length - 1 !== gKey ? styles.divider : {}}
        >
          {section.map((row, rKey) => (
            <View style={styles.row} key={rKey}>
              {row.map((buttonColor, colorKey) => (
                <ColorButton
                  key={colorKey}
                  color={buttonColor}
                  selected={color === buttonColor}
                  onPress={onColorChange}
                  isTopStart={rKey === 0 && colorKey === 0}
                  isTopEnd={rKey === 0 && colorKey === section[0].length - 1}
                  isBottomStart={rKey === section.length - 1 && colorKey === 0}
                  isBottomEnd={
                    rKey === section.length - 1 &&
                    colorKey === section[0].length - 1
                  }
                />
              ))}
            </View>
          ))}
        </View>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  content: {
    borderRadius: 10,
    flex: 1,
  },
  container: {
    borderRadius: 10,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    marginBottom: 3,
  },
});

export default memo(ColorPicker);
