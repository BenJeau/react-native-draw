import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from './Draw';
import ColorButton from './ColorButton';

interface ColorButtonGroupProps {
  selectedColor: string;
  updateColor: (color: string) => void;
}

const ColorButtonGroup: React.FC<ColorButtonGroupProps> = ({
  selectedColor,
  updateColor,
}) => (
  <View style={styles.container}>
    <View style={styles.row}>
      {colors.map((i) => (
        <ColorButton
          key={i}
          color={i}
          selectedColor={selectedColor}
          updateColor={updateColor}
        />
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    minHeight: 50,
    padding: 10,
  },
});

export default ColorButtonGroup;
