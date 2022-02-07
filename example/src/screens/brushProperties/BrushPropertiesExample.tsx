import React from 'react';
import { BrushProperties } from '@benjeau/react-native-draw-extras';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../../App';
import { StyleSheet } from 'react-native';

type BrushPropertiesExampleProps = NativeStackScreenProps<
  RootStackParamList,
  'BrushPropertiesExample'
>;

const BrushPropertiesExample: React.FC<BrushPropertiesExampleProps> = ({
  route,
}) => <BrushProperties {...route.params} style={styles.container} />;

const styles = StyleSheet.create({ container: { position: 'absolute' } });

export default BrushPropertiesExample;
