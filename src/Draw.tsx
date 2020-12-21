import React, { useMemo, useState } from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  View,
} from 'react-native';
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

  const onGestureEvent = ({
    nativeEvent: { x, y },
  }: PanGestureHandlerGestureEvent) => {
    setPath((prev) => [...prev, [x, y]]);
  };

  const handleThicknessOnChange = (t: number) => setThickness(t);
  const handleOpacityOnChange = (o: number) => setOpacity(o);
  const handleColorPicker = () => {
    if (!colorPickerVisible) {
      setColorPickerVisible(true);
      setPenOpen(false);
    }
    Animated.timing(animVal, {
      useNativeDriver: true,
      toValue: colorPickerVisible ? 0 : -180,
      duration: 500,
      easing: Easing.out(Easing.cubic),
    }).start(() => {
      if (colorPickerVisible) {
        setColorPickerVisible(false);
      }
    });
  };
  const handleUndo = () => {
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

  const [animVal] = useState(new Animated.Value(0));
  const [penOpen, setPenOpen] = useState(false);

  const handlePenOnPress = () => {
    if (!penOpen) {
      setPenOpen(true);
      setColorPickerVisible(false);
    }
    Animated.timing(animVal, {
      useNativeDriver: true,
      toValue: penOpen ? 0 : -50,
      duration: 300,
      easing: Easing.out(Easing.cubic),
    }).start(() => {
      if (penOpen) {
        setPenOpen(false);
      }
    });
  };
  const onHandlerStateChange = ({
    nativeEvent: { state },
  }: PanGestureHandlerStateChangeEvent) => {
    if (penOpen) {
      handlePenOnPress();
    } else if (colorPickerVisible) {
      handleColorPicker();
    }

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

  const opacityOverlay = animVal.interpolate({
    inputRange: [penOpen ? -50 : -180, 0],
    outputRange: [0.5, 0],
    extrapolate: 'clamp',
  });

  return (
    <>
      <View style={styles.container}>
        <Animated.View
          style={{
            height: height - 80,
            elevation: 5,
            width: '100%',
            backgroundColor: 'white',
            translateY: animVal,
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
                height={height - 80}
                width={width}
              />
              <Animated.View
                style={{
                  position: 'absolute',
                  height: '100%',
                  width: '100%',
                  backgroundColor: '#000000',
                  opacity: opacityOverlay,
                }}
              />
            </View>
          </PanGestureHandler>
        </Animated.View>
        {penOpen && (
          <View style={{ position: 'absolute', bottom: 80, left: 0, right: 0 }}>
            <Slider
              minimumValue={5}
              maximumValue={35}
              step={1}
              value={thickness}
              onValueChange={handleThicknessOnChange}
              thumbTintColor="black"
              minimumTrackTintColor="black"
            />
            <Slider
              minimumValue={0}
              maximumValue={1}
              step={0.1}
              value={opacity}
              onValueChange={handleOpacityOnChange}
              thumbTintColor="black"
              minimumTrackTintColor="black"
            />
          </View>
        )}

        {colorPickerVisible && (
          <ColorButtonGroup
            colors={colors}
            selectedColor={color}
            updateColor={setColor}
          />
        )}
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
            <Button onPress={handlePenOnPress} color="#ddd">
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
