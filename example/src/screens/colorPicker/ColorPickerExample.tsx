import React from 'react';
import { View } from 'react-native';
import { ColorPicker } from '@benjeau/react-native-draw';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../../App';

type ColorPickerExampleProps = NativeStackScreenProps<
  RootStackParamList,
  'ColorPickerExample'
>;

const ColorPickerExample: React.FC<ColorPickerExampleProps> = ({ route }) => (
  <View style={{ position: 'absolute' }}>
    <ColorPicker {...route.params} />
  </View>
);

export default ColorPickerExample;
