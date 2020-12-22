import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerStateChangeEvent,
  State,
} from 'react-native-gesture-handler';

import { createSVGPath } from './utils';
import type { PathDataType, PathType } from './types';
import { Brush, Delete, Palette, Undo } from './icons';
import {
  Button,
  SVGRenderer,
  ColorPicker,
  BrushProperties,
  BrushPreview,
} from './components';
import {
  DEFAULT_COLORS,
  DEFAULT_THICKNESS,
  DEFAULT_OPACITY,
} from './constants';

const dimen = Dimensions.get('window');

export interface DrawProps {
  /**
   * Color palette colors, specifying the color palette sections each containing rows of colors
   * @default DEFAULT_COLORS
   */
  colors?: string[][][];
  /**
   * Initial thickness of the brush strokes
   * @default DEFAULT_THICKNESS
   */
  initialThickness?: number;
  /**
   * Initial opacity of the brush strokes
   * @default DEFAULT_OPACITY
   */
  initialOpacity?: number;
  /**
   * Paths to be already drawn
   * @default []
   */
  initialDrawing?: PathType[];
  /**
   * Override the style of the container of the canvas
   */
  canvasContainerStyle?: ViewStyle;
  /**
   * Callback function when paths change
   */
  onPathsChange?: (paths: PathType[]) => any;
  /**
   * Height of the canvas
   */
  height?: number;
  /**
   * Width of the canvas
   */
  width?: number;
}

export interface DrawRef {
  /**
   * Undo last brush stroke
   */
  undo: () => void;
  /**
   * Removes all brush strokes
   */
  clear: () => void;
  /**
   * Get brush strokes data
   */
  getPaths: () => PathType[];
  /**
   * Append a path to the current drawing paths
   */
  addPath: (path: PathType) => void;
}

const Draw = forwardRef<DrawRef, DrawProps>(
  (
    {
      colors = DEFAULT_COLORS,
      initialThickness = DEFAULT_THICKNESS,
      initialOpacity = DEFAULT_OPACITY,
      initialDrawing = [],
      canvasContainerStyle,
      onPathsChange,
      height = dimen.height - 80,
      width = dimen.width,
    },
    ref
  ) => {
    const [paths, setPaths] = useState<PathType[]>(initialDrawing);
    const [path, setPath] = useState<PathDataType>([]);
    const [color, setColor] = useState(colors[0][1][10]);
    const [thickness, setThickness] = useState(initialThickness);
    const [opacity, setOpacity] = useState(initialOpacity);
    const [colorPickerVisible, setColorPickerVisible] = useState(false);

    const onGestureEvent = ({
      nativeEvent: { x, y },
    }: PanGestureHandlerGestureEvent) => {
      setPath((prev) => [...prev, [x, y]]);
    };

    const focusCanvas = () => {
      if (penOpen) {
        handlePenOnPress();
      } else if (colorPickerVisible) {
        handleColorPicker();
      }
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
      focusCanvas();
      setPaths((list) => list.filter((_i, key) => key !== list.length - 1));
    };

    const clear = () => {
      setPaths([]);
      setPath([]);
    };

    const reset = () => {
      focusCanvas();
      if (paths.length > 0) {
        Alert.alert(
          'Delete drawing',
          'Are you sure you want to delete your masterpiece?',
          [
            {
              text: 'No',
              style: 'cancel',
            },
            {
              onPress: clear,
              text: 'Yes',
            },
          ],
          {
            cancelable: true,
          }
        );
      }
    };

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
      focusCanvas();

      if (state === State.END || state === State.CANCELLED) {
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
      inputRange: [-50, 0],
      outputRange: [0.5, 0],
      extrapolate: 'clamp',
    });

    const viewOpacity = animVal.interpolate({
      inputRange: [penOpen ? -50 : -180, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    const canvasContainerSyles = [
      styles.canvasContainer,
      {
        translateY: animVal,
        height,
        width,
      },
      canvasContainerStyle,
    ];

    const canvasOverlayStyles = [
      styles.canvasOverlay,
      {
        opacity: opacityOverlay,
      },
    ];

    useEffect(() => onPathsChange && onPathsChange(paths), [
      paths,
      onPathsChange,
    ]);

    useImperativeHandle(ref, () => ({
      undo: handleUndo,
      clear,
      getPaths: () => paths,
      addPath: (newPath) => {
        setPaths((prev) => [...prev, newPath]);
      },
    }));

    return (
      <>
        <View style={styles.container}>
          <Animated.View style={canvasContainerSyles}>
            <PanGestureHandler
              maxPointers={1}
              minDist={0}
              avgTouches={false}
              onHandlerStateChange={onHandlerStateChange}
              onGestureEvent={onGestureEvent}
              hitSlop={{
                height,
                width,
                top: 0,
                left: 0,
              }}
              shouldCancelWhenOutside
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
                <Animated.View style={canvasOverlayStyles} />
              </View>
            </PanGestureHandler>
          </Animated.View>

          <View style={styles.bottomContainer}>
            <View style={styles.bottomContent}>
              <View style={styles.buttonsContainer}>
                <Button onPress={reset} color="#81090A">
                  <Delete fill="#81090A" height={30} width={30} />
                </Button>
                <Button
                  onPress={handleUndo}
                  color="#ddd"
                  style={styles.endButton}
                >
                  <Undo fill="#ddd" height={30} width={30} />
                </Button>
              </View>

              <BrushPreview
                color={color}
                opacity={opacity}
                thickness={thickness}
              />

              <View style={styles.buttonsContainer}>
                <Button onPress={handlePenOnPress} color="#ddd">
                  <Brush fill="#ddd" height={30} width={30} />
                </Button>
                <Button
                  onPress={handleColorPicker}
                  color={color}
                  style={styles.endButton}
                >
                  <Palette fill={color} height={30} width={30} />
                </Button>
              </View>
            </View>
            <BrushProperties
              visible={penOpen}
              thickness={thickness}
              thicknessOnChange={handleThicknessOnChange}
              opacity={opacity}
              opacityOnChange={handleOpacityOnChange}
              viewOpacity={viewOpacity}
            />
            <ColorPicker
              selectedColor={color}
              updateColor={setColor}
              colors={colors}
              visible={colorPickerVisible}
              viewOpacity={viewOpacity}
            />
          </View>
        </View>
      </>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  canvas: {
    flex: 1,
    backgroundColor: 'white',
  },
  canvasContainer: {
    elevation: 5,
    backgroundColor: 'white',
  },
  canvasOverlay: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: '#000000',
  },
  bottomContainer: {
    height: 80,
    width: '100%',
  },
  bottomContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 15,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  endButton: {
    marginLeft: 10,
  },
});

export default Draw;
