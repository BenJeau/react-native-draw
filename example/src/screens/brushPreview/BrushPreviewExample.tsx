import React from 'react';
import { BrushPreview } from '@benjeau/react-native-draw-extras';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../../App';

type BrushPreviewExampleProps = NativeStackScreenProps<
  RootStackParamList,
  'BrushPreviewExample'
>;

const BrushPreviewExample: React.FC<BrushPreviewExampleProps> = ({ route }) => (
  <BrushPreview {...route.params} />
);

export default BrushPreviewExample;
