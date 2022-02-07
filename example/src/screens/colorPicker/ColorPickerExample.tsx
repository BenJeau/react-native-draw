import React from 'react';
import { ColorPicker } from '@benjeau/react-native-draw-extras';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../../App';
import { StyleSheet } from 'react-native';

type ColorPickerExampleProps = NativeStackScreenProps<
  RootStackParamList,
  'ColorPickerExample'
>;

const ColorPickerExample: React.FC<ColorPickerExampleProps> = ({ route }) => (
  <ColorPicker {...route.params} style={styles.container} />
);

const styles = StyleSheet.create({ container: { position: 'absolute' } });

export default ColorPickerExample;
