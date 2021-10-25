import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { DrawProps } from '@benjeau/react-native-draw';
import { DrawExample, Home } from './screens';

export type RootStackParamList = {
  Home: undefined;
  DrawExample?: DrawProps;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DrawExample"
        component={DrawExample}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
