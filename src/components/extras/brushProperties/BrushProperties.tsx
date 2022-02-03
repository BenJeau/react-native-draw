import React from 'react';
import { StyleSheet, View } from 'react-native';
import Slider from '@react-native-community/slider';

import {
  DEFAULT_OPACITY,
  DEFAULT_OPACITY_STEP,
  DEFAULT_SLIDER_COLOR,
  DEFAULT_THICKNESS,
  DEFAULT_THICKNESS_MAX,
  DEFAULT_THICKNESS_MIN,
  DEFAULT_THICKNESS_STEP,
} from '../../../constants';
import ColorPicker, { ColorPickerProps } from './colorPicker/ColorPicker';

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
   * Step value of the thickness slider, should be between {thicknessMin} and {thicknessMax}
   * @default DEFAULT_THICKNESS_STEP
   */
  thicknessStep?: number;

  /**
   * Slider color
   * @default DEFAULT_SLIDER_COLOR
   */
  sliderColor?: string;
}

const BrushProperties: React.FC<BrushPropertiesProps> = ({
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
  colors,
}) => (
  <>
    <ColorPicker color={color} colors={colors} onColorChange={onColorChange} />
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
  </>
);

const styles = StyleSheet.create({
  sliderContainer: {
    marginVertical: 10,
  },
});

export default BrushProperties;
