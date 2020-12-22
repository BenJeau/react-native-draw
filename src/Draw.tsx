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
  StyleProp,
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
import type { BrushType } from './components/renderer/BrushPreview';

const dimen = Dimensions.get('window');

export interface DrawInitialValues {
  /**
   * Initial brush color, from the colors provided
   */
  color?: string;

  /**
   * Initial thickness of the brush strokes
   * @default DEFAULT_THICKNESS
   */
  thickness?: number;

  /**
   * Initial opacity of the brush strokes
   * @default DEFAULT_OPACITY
   */
  opacity?: number;

  /**
   * Paths to be already drawn
   * @default []
   */
  paths?: PathType[];
}

export interface HideBottomBrushProperties {
  opacity?: boolean;
  size?: boolean;
}

export interface HideBottom {
  undo?: boolean;
  clear?: boolean;
  colorPicker?: boolean;
  brushProperties?: boolean | HideBottomBrushProperties;
}

export interface DrawProps {
  /**
   * Color palette colors, specifying the color palette sections each containing rows of colors
   * @default DEFAULT_COLORS
   */
  colors?: string[][][];

  /**
   * Initial values for color the brush and paths
   */
  initialValues?: DrawInitialValues;

  /**
   * Override the style of the container of the canvas
   */
  canvasStyle?: StyleProp<ViewStyle>;

  /**
   * Override the style of the buttons
   */
  buttonStyle?: StyleProp<ViewStyle>;

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

  /**
   * Change brush preview preset or remove it
   */
  brushPreview?: BrushType;

  /**
   * Hide all of the bottom section, below the canvas, or only certain functionalities
   */
  hideBottom?: boolean | HideBottom;
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

interface Visibility {
  undo: boolean;
  clear: boolean;
  colorPicker: boolean;
  brushProperties: {
    opacity: boolean;
    size: boolean;
  };
}

const getVisibility = (hideBottom: boolean | HideBottom): Visibility => {
  if (typeof hideBottom === 'boolean') {
    return {
      clear: hideBottom,
      colorPicker: hideBottom,
      undo: hideBottom,
      brushProperties: {
        opacity: hideBottom,
        size: hideBottom,
      },
    };
  } else {
    return {
      clear: false,
      colorPicker: false,
      undo: false,
      ...hideBottom,
      brushProperties: {
        opacity: false,
        size: false,
        ...(hideBottom.brushProperties &&
          (typeof hideBottom.brushProperties === 'object'
            ? hideBottom.brushProperties
            : {
                opacity: true,
                size: true,
              })),
      },
    };
  }
};

const Draw = forwardRef<DrawRef, DrawProps>(
  (
    {
      colors = DEFAULT_COLORS,
      initialValues = {},
      canvasStyle,
      buttonStyle,
      onPathsChange,
      height = dimen.height - 80,
      width = dimen.width,
      brushPreview = 'stroke',
      hideBottom = false,
    } = {},
    ref
  ) => {
    initialValues = {
      color: colors[0][0][0],
      thickness: DEFAULT_THICKNESS,
      opacity: DEFAULT_OPACITY,
      paths: [],
      ...initialValues,
    };

    const viewVisibility = getVisibility(hideBottom);

    const [paths, setPaths] = useState<PathType[]>(initialValues.paths!);
    const [path, setPath] = useState<PathDataType>([]);
    const [color, setColor] = useState(initialValues.color!);
    const [thickness, setThickness] = useState(initialValues.thickness!);
    const [opacity, setOpacity] = useState(initialValues.opacity!);
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
      styles.canvas,
      {
        translateY: animVal,
        height,
        width,
      },
      canvasStyle,
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
              <View style={styles.canvasContent}>
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

          {hideBottom !== true && (
            <View style={styles.bottomContainer}>
              <View style={styles.bottomContent}>
                <View style={styles.buttonsContainer}>
                  {!viewVisibility.clear && (
                    <Button onPress={reset} color="#81090A" style={buttonStyle}>
                      <Delete fill="#81090A" height={30} width={30} />
                    </Button>
                  )}
                  {!viewVisibility.undo && (
                    <View style={!viewVisibility.clear && styles.endButton}>
                      <Button
                        onPress={handleUndo}
                        color="#ddd"
                        style={buttonStyle}
                      >
                        <Undo fill="#ddd" height={30} width={30} />
                      </Button>
                    </View>
                  )}
                </View>

                <BrushPreview
                  color={color}
                  opacity={opacity}
                  thickness={thickness}
                  type={brushPreview}
                />

                <View style={styles.buttonsContainer}>
                  {(!viewVisibility.brushProperties.opacity ||
                    !viewVisibility.brushProperties.size) && (
                    <Button
                      onPress={handlePenOnPress}
                      color="#ddd"
                      style={buttonStyle}
                    >
                      <Brush fill="#ddd" height={30} width={30} />
                    </Button>
                  )}
                  {!viewVisibility.colorPicker && (
                    <View
                      style={
                        (!viewVisibility.brushProperties.opacity ||
                          !viewVisibility.brushProperties.size) &&
                        styles.endButton
                      }
                    >
                      <Button
                        onPress={handleColorPicker}
                        color={color}
                        style={buttonStyle}
                      >
                        <Palette fill={color} height={30} width={30} />
                      </Button>
                    </View>
                  )}
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
          )}
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
    elevation: 5,
    backgroundColor: 'white',
    zIndex: 10,
  },
  canvasContent: {
    flex: 1,
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
    justifyContent: 'center',
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
