import React, { useState } from 'react';
import { Button, Dimensions, StyleSheet, View } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Slider from '@react-native-community/slider';

import { createSVGPath } from './utils';
import ColorButtonGroup from './ColorButtonGroup';
import type { PathDataType, PathType } from './@types';
import SVGRenderer from './SVGRenderer';

const { height, width } = Dimensions.get('window');

export const colors = [
  'white',
  'black',
  'red',
  'green',
  'blue',
  'purple',
  'orange',
  'yellow',
];

const Draw = () => {
  const [paths, setPaths] = useState<PathType[]>([]);
  const [path, setCurrentPath] = useState<PathDataType>([]);
  const [color, setCurrentColor] = useState(colors[2]);
  const [thickness, setCurrentThickness] = useState(3);
  const [opacity, setCurrentOpacity] = useState(1);
  const [tolerance, setTolerance] = useState(20);

  const reset = () => {
    setPaths([]);
    setCurrentPath([]);
  };

  return (
    <View style={styles.container}>
      <Button title="Clear" onPress={reset} />
      <PanGestureHandler
        maxPointers={1}
        minDist={0}
        avgTouches={false}
        onHandlerStateChange={({ nativeEvent: { state } }) => {
          if (state === State.END) {
            setPaths((prev) => [
              ...prev,
              {
                color,
                path: createSVGPath(path),
                data: path,
                thickness,
                opacity,
              },
            ]);
            setCurrentPath([]);
          }
        }}
        onGestureEvent={({ nativeEvent: { x, y } }) => {
          setCurrentPath((prev) => [...prev, [x, y]]);
        }}
      >
        <View style={styles.canvas}>
          <SVGRenderer
            currentColor={color}
            currentOpacity={opacity}
            currentPath={path}
            currentThickness={thickness}
            paths={paths}
            height={height}
            width={width}
          />
        </View>
      </PanGestureHandler>
      <Slider
        minimumValue={0}
        maximumValue={20}
        value={thickness}
        onValueChange={(t) => setCurrentThickness(t)}
      />
      <Slider
        minimumValue={0}
        maximumValue={1}
        value={opacity}
        onValueChange={(t) => setCurrentOpacity(t)}
      />
      <Slider
        minimumValue={0}
        maximumValue={100}
        value={tolerance}
        onValueChange={(t) => setTolerance(t)}
      />
      <ColorButtonGroup selectedColor={color} updateColor={setCurrentColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  canvas: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Draw;
