import React from 'react';
import { CanvasControls } from '@benjeau/react-native-draw-extras';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../../App';

type CanvasControlsExampleProps = NativeStackScreenProps<
  RootStackParamList,
  'CanvasControlsExample'
>;

const CanvasControlsExample: React.FC<CanvasControlsExampleProps> = ({
  route,
}) => <CanvasControls {...route.params} />;

export default CanvasControlsExample;
