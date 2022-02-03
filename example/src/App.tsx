import React from 'react';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { CanvasProps } from '@benjeau/react-native-draw';

import { CanvasExample, DrawExample, Home } from './screens';
import ExampleSelection from './screens/ExampleSelection';
import { StatusBar, useColorScheme } from 'react-native';

export type RootStackParamList = {
  Home: undefined;
  CanvasExample: CanvasProps;
  DrawExample: CanvasProps;
  ExampleSelection: { type: 'canvas' | 'draw'; title: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default () => {
  const colorScheme = useColorScheme();

  return (
    <>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor="#00000000"
        translucent
      />
      <NavigationContainer
        theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      >
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ title: '@benjeau/react-native-draw' }}
          />
          <Stack.Screen
            name="DrawExample"
            component={DrawExample}
            options={{ title: 'Draw Example' }}
          />
          <Stack.Screen
            name="CanvasExample"
            component={CanvasExample}
            options={{ title: 'Canvas Example' }}
          />
          <Stack.Screen
            name="ExampleSelection"
            component={ExampleSelection}
            options={({
              route: {
                params: { title },
              },
            }) => ({ title })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
