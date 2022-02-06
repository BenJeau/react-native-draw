import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type {
  CanvasProps,
} from '@benjeau/react-native-draw';
import type {
  BrushPreviewProps,
  BrushPropertiesProps,
  CanvasControlsProps,
  ColorPickerProps,
} from '@benjeau/react-native-draw-extras';

import {
  CanvasExample,
  Home,
  ExampleSelection,
  ExtrasExample,
  MoreComplexExample,
  SimpleExample,
  BrushPreviewExample,
  BrushPropertiesExample,
  CanvasControlsExample,
  ColorPickerExample,
} from './screens';

export type RootStackParamList = {
  Home: undefined;
  CanvasExample: CanvasProps;
  BrushPreviewExample: BrushPreviewProps;
  BrushPropertiesExample: BrushPropertiesProps;
  CanvasControlsExample: CanvasControlsProps;
  ColorPickerExample: ColorPickerProps;
  ExampleSelection: {
    type:
      | 'canvas'
      | 'brushPreview'
      | 'brushProperties'
      | 'canvasControls'
      | 'colorPicker';
    title: string;
  };
  SimpleExample: undefined;
  MoreComplexExample: undefined;
  ExtrasExample: undefined;
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
            name="SimpleExample"
            component={SimpleExample}
            options={{ title: 'Simple Example' }}
          />
          <Stack.Screen
            name="MoreComplexExample"
            component={MoreComplexExample}
            options={{ title: 'Complex Example' }}
          />
          <Stack.Screen
            name="ExtrasExample"
            component={ExtrasExample}
            options={{ title: 'Extras Example' }}
          />
          <Stack.Screen
            name="CanvasExample"
            component={CanvasExample}
            options={{ title: 'Canvas Example' }}
          />
          <Stack.Screen
            name="BrushPreviewExample"
            component={BrushPreviewExample}
            options={{ title: 'BrushPreview Example' }}
          />
          <Stack.Screen
            name="BrushPropertiesExample"
            component={BrushPropertiesExample}
            options={{ title: 'BrushProperties Example' }}
          />
          <Stack.Screen
            name="CanvasControlsExample"
            component={CanvasControlsExample}
            options={{ title: 'CanvasControls Example' }}
          />
          <Stack.Screen
            name="ColorPickerExample"
            component={ColorPickerExample}
            options={{ title: 'ColorPicker Example' }}
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
