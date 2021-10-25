import React, { memo } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import ColorButton from './ColorButton';

export interface ColorPickerProps {
  selectedColor: string;
  updateColor: (color: string) => void;
  colors: string[][][];
  visible: boolean;
  viewOpacity?: Animated.AnimatedInterpolation;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  selectedColor,
  updateColor,
  colors,
  visible,
  viewOpacity,
}) =>
  visible ? (
    <Animated.View style={[styles.container, { opacity: viewOpacity }]}>
      <View style={styles.content}>
        {colors.map((group, gKey) => (
          <View
            key={gKey}
            style={colors.length - 1 !== gKey ? styles.divider : {}}
          >
            {group.map((row, rKey) => (
              <View style={styles.row} key={rKey}>
                {row.map((color, colorKey) => (
                  <ColorButton
                    key={colorKey}
                    color={color}
                    selectedColor={selectedColor}
                    updateColor={updateColor}
                    isTopStart={rKey === 0 && colorKey === 0}
                    isTopEnd={rKey === 0 && colorKey === group[0].length - 1}
                    isBottomStart={rKey === group.length - 1 && colorKey === 0}
                    isBottomEnd={
                      rKey === group.length - 1 &&
                      colorKey === group[0].length - 1
                    }
                  />
                ))}
              </View>
            ))}
          </View>
        ))}
      </View>
    </Animated.View>
  ) : null;

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
