import React, { forwardRef, useImperativeHandle, useMemo } from 'react';
import { Animated, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Slider from '@react-native-community/slider';

import {
  DEFAULT_COLORS,
  DEFAULT_OPACITY,
  DEFAULT_OPACITY_STEP,
  DEFAULT_SLIDER_COLOR,
  DEFAULT_THICKNESS,
  DEFAULT_THICKNESS_MAX,
  DEFAULT_THICKNESS_MIN,
  DEFAULT_THICKNESS_STEP,
  SLIDERS_HEIGHT,
} from '../constants';
import ColorPicker, { ColorPickerProps } from './colorPicker/ColorPicker';
import { colorButtonSize } from './colorPicker/ColorButton';

export interface BrushPropertiesProps extends ColorPickerProps {
  /**
   * Thickness of the brush strokes
   * @default DEFAULT_THICKNESS
   */
  thickness?: number;

  /**
   * Opacity of the brush strokes
   * @default DEFAULT_OPACITY
   */
  opacity?: number;

  /**
   * Callback when brush size is changed via the slider
   * @param newThickness - New brush size
   */
  onThicknessChange?: (newThickness: number) => void;

  /**
   * Callback when brush opacity is changed via the slider
   * @param newOpacity - New brush opacity
   */
  onOpacityChange?: (newOpacity: number) => void;

  /**
   * Step value of the opacity slider, should be between 0 and 1
   * @default DEFAULT_OPACITY_STEP
   */
  opacityStep?: number;

  /**
   * Minimum value of the thickness slider
   * @default DEFAULT_THICKNESS_MIN
   */
  thicknessMin?: number;

  /**
   * Maximum value of the thickness slider
   * @default DEFAULT_THICKNESS_MAX
   */
  thicknessMax?: number;

  /**
   * Step value of the thickness slider, should be between `props.thicknessMin` and `props.thicknessMax`
   * @default DEFAULT_THICKNESS_STEP
   */
  thicknessStep?: number;

  /**
   * Slider color
   * @default DEFAULT_SLIDER_COLOR
   */
  sliderColor?: string;

  /**
   * Style of the container
   */
  style?: StyleProp<ViewStyle>;
}

export interface BrushPropertiesRef {
  height: number;
}

/**
 * Component allowing user to change brush properties, such as the color,
 * thickness, and opacity.
 *
 * If no thickness or opacity is provided, the component will behave like the
 * `ColorPicker` component.
 */
const BrushProperties = forwardRef<BrushPropertiesRef, BrushPropertiesProps>(
  (
    {
      thickness = DEFAULT_THICKNESS,
      opacity = DEFAULT_OPACITY,
      onThicknessChange,
      onOpacityChange,
      opacityStep = DEFAULT_OPACITY_STEP,
      thicknessMin = DEFAULT_THICKNESS_MIN,
      thicknessMax = DEFAULT_THICKNESS_MAX,
      thicknessStep = DEFAULT_THICKNESS_STEP,
      sliderColor = DEFAULT_SLIDER_COLOR,
      color,
      onColorChange,
      colors = DEFAULT_COLORS,
      style,
    },
    ref
  ) => {
    const height = useMemo(
      () =>
        (colors.length - 1) * 3 +
        (colors[0].length + colors[1].length) * colorButtonSize +
        SLIDERS_HEIGHT,
      [colors]
    );

    useImperativeHandle(ref, () => ({
      height,
    }));

    return (
      <Animated.View style={style}>
        <ColorPicker
          color={color}
          colors={colors}
          onColorChange={onColorChange}
        />
        {thickness && onThicknessChange && opacity && onOpacityChange && (
          <View style={styles.sliderContainer}>
            {thickness && onThicknessChange && (
              <Slider
                minimumValue={thicknessMin}
                maximumValue={thicknessMax}
                step={thicknessStep}
                value={thickness}
                onValueChange={onThicknessChange}
                thumbTintColor={sliderColor}
                minimumTrackTintColor={sliderColor}
              />
            )}
            {opacity && onOpacityChange && (
              <Slider
                minimumValue={0}
                maximumValue={1}
                step={opacityStep}
                value={opacity}
                onValueChange={onOpacityChange}
                thumbTintColor={sliderColor}
                minimumTrackTintColor={sliderColor}
              />
            )}
          </View>
        )}
      </Animated.View>
    );
  }
);

const styles = StyleSheet.create({
  sliderContainer: {
    marginVertical: 10,
  },
});

export default BrushProperties;
