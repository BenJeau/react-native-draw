import React from 'react';
import { Canvas } from '@benjeau/react-native-draw';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../../App';

type CanvasExampleProps = NativeStackScreenProps<
  RootStackParamList,
  'CanvasExample'
>;

const CanvasExample: React.FC<CanvasExampleProps> = ({ route }) => (
  <Canvas {...route.params} />
);

export default CanvasExample;
