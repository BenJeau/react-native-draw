import React from 'react';
import { Canvas } from 'packages/core/src';
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
