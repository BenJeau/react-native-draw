import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import ColorButton from './ColorButton';

interface ColorButtonGroupProps {
  selectedColor: string;
  updateColor: (color: string) => void;
  visible: boolean;
  colors: string[][][];
}

const ColorButtonGroup: React.FC<ColorButtonGroupProps> = ({
  selectedColor,
  updateColor,
  visible,
  colors,
}) =>
  useMemo(
    () =>
      visible ? (
        <View style={styles.container}>
          <View style={styles.content}>
            {colors.map((group, gKey) => (
              <View
                key={gKey}
                style={colors.length - 1 !== gKey ? styles.divider : {}}
              >
                {group.map((row, rKey) => (
                  <View style={styles.row} key={rKey}>
                    {row.map((color, colorKey) => {
                      return (
                        <ColorButton
                          key={colorKey}
                          color={color}
                          selectedColor={selectedColor}
                          updateColor={updateColor}
                          isTopStart={rKey === 0 && colorKey === 0}
                          isTopEnd={
                            rKey === 0 && colorKey === group[0].length - 1
                          }
                          isBottomStart={
                            rKey === group.length - 1 && colorKey === 0
                          }
                          isBottomEnd={
                            rKey === group.length - 1 &&
                            colorKey === group[0].length - 1
                          }
                        />
                      );
                    })}
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>
      ) : null,
    [visible, colors, selectedColor, updateColor]
  );

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  content: {
    borderRadius: 10,
    backgroundColor: '#eee',
    borderWidth: 2,
    borderColor: '#eee',
    elevation: 5,
    flex: 1,
  },
  container: {
    borderRadius: 10,
    position: 'absolute',
    bottom: 150,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    marginBottom: 3,
  },
});

export default ColorButtonGroup;
