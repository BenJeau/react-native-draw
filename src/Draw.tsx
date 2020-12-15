import React, { useMemo, useState } from 'react';
import { Alert, Dimensions, StyleSheet, View } from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerStateChangeEvent,
  State,
} from 'react-native-gesture-handler';

import { createSVGPath } from './utils';
import ColorButtonGroup from './ColorButtonGroup';
import type { PathDataType, PathType } from './@types';
import SVGRenderer from './SVGRenderer';
import colorPalette, { grayscale } from './colorPalette';
import { Brush, Delete, Palette, Undo } from './icons';
import Svg, { Path } from 'react-native-svg';
import Button from './Button';
import Slider from '@react-native-community/slider';

const { height, width } = Dimensions.get('screen');

interface DrawProps {
  colorPickerIcon?: React.ReactNode;
}

const Draw: React.FC<DrawProps> = () => {
  const [paths, setPaths] = useState<PathType[]>([]);
  const [path, setPath] = useState<PathDataType>([]);
  const [color, setColor] = useState(colorPalette[0][0]);
  const [thickness, setThickness] = useState(3);
  const [opacity, setOpacity] = useState(1);
  const [colorPickerVisible, setColorPickerVisible] = useState(false);

  const hideColorPicker = () =>
    colorPickerVisible && setColorPickerVisible(false);

  const onHandlerStateChange = ({
    nativeEvent: { state },
  }: PanGestureHandlerStateChangeEvent) => {
    hideColorPicker();
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
      setPath([]);
    }
  };

  const onGestureEvent = ({
    nativeEvent: { x, y },
  }: PanGestureHandlerGestureEvent) => {
    setPath((prev) => [...prev, [x, y]]);
  };

  const handleThicknessOnChange = (t: number) => setThickness(t);
  const handleOpacityOnChange = (o: number) => setOpacity(o);
  const handleColorPicker = () => setColorPickerVisible((prev) => !prev);
  const handleUndo = () => {
    hideColorPicker();
    setPaths((list) => list.filter((_i, key) => key !== list.length - 1));
  };

  const colors = useMemo(() => [colorPalette, grayscale], []);

  const reset = () =>
    paths.length > 0 &&
    Alert.alert(
      'Delete drawing',
      'Are you sure you want to delete your masterpiece?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          onPress() {
            hideColorPicker();
            setPaths([]);
            setPath([]);
          },
          text: 'Yes',
        },
      ],
      {
        cancelable: true,
      }
    );

  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            height: height - 140,
            elevation: 5,
            width: '100%',
            backgroundColor: 'white',
          }}
        >
          <PanGestureHandler
            maxPointers={1}
            minDist={0}
            avgTouches={false}
            onHandlerStateChange={onHandlerStateChange}
            onGestureEvent={onGestureEvent}
          >
            <View style={styles.canvas}>
              <SVGRenderer
                currentColor={color}
                currentOpacity={opacity}
                currentPath={path}
                currentThickness={thickness}
                paths={paths}
                height={height - 130}
                width={width}
              />
            </View>
          </PanGestureHandler>
        </View>
        <View style={{ marginTop: 15 }}>
          <Slider
            minimumValue={5}
            maximumValue={35}
            step={1}
            value={thickness}
            onValueChange={handleThicknessOnChange}
            onTouchStart={hideColorPicker}
            thumbTintColor="black"
            minimumTrackTintColor="black"
          />
          <Slider
            minimumValue={0}
            maximumValue={1}
            step={0.1}
            value={opacity}
            onValueChange={handleOpacityOnChange}
            onTouchStart={hideColorPicker}
            thumbTintColor="black"
            minimumTrackTintColor="black"
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 80,
            justifyContent: 'space-between',
            marginHorizontal: 15,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Button onPress={reset} color="#81090A">
              <Delete fill="#81090A" height={30} width={30} />
            </Button>
            <Button
              onPress={handleUndo}
              color="#ddd"
              style={{ marginLeft: 10 }}
            >
              <Undo fill="#ddd" height={30} width={30} />
            </Button>
          </View>

          <Svg height={80} width={100}>
            <Path
              d="M 20 60 Q 30 20 50 40 Q 70 60 80 20 "
              fill="none"
              stroke={color}
              strokeWidth={thickness}
              opacity={opacity}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Button onPress={handleColorPicker} color="#ddd">
              <Brush fill="#ddd" height={30} width={30} />
            </Button>
            <Button
              onPress={handleColorPicker}
              color={color}
              style={{ marginLeft: 10 }}
            >
              <Palette fill={color} height={30} width={30} />
            </Button>
          </View>
        </View>
      </View>

      <ColorButtonGroup
        colors={colors}
        selectedColor={color}
        updateColor={setColor}
        visible={colorPickerVisible}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  canvas: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Draw;
