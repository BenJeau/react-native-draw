import React from 'react';
import { Draw } from '@benjeau/react-native-draw';
import { Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../App';

type DrawExampleProps = NativeStackScreenProps<
  RootStackParamList,
  'DrawExample'
>;

const DrawExample: React.FC<DrawExampleProps> = ({ route, navigation }) => (
  <>
    <Draw {...route.params} />
    <Button
      title="Return to examples"
      onPress={() => navigation.navigate('Home')}
    />
  </>
);

export default DrawExample;
