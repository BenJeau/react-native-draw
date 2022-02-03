import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../../App';

type DrawExampleProps = NativeStackScreenProps<
  RootStackParamList,
  'DrawExample'
>;

const DrawExample: React.FC<DrawExampleProps> = ({ route }) => <></>;

export default DrawExample;
