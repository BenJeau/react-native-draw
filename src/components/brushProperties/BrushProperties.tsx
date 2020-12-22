import Slider from '@react-native-community/slider';
import React from 'react';
import { Animated, StyleSheet } from 'react-native';

interface BrushPropertiesProps {
  visible: boolean;
  thickness: number;
  thicknessOnChange: (value: number) => void;
  opacity: number;
  opacityOnChange: (value: number) => void;
  viewOpacity?: Animated.AnimatedInterpolation;
}

const BrushProperties: React.FC<BrushPropertiesProps> = ({
  visible,
  thickness,
  thicknessOnChange,
  opacity,
  opacityOnChange,
  viewOpacity,
}) =>
  visible ? (
    <Animated.View style={[styles.container, { opacity: viewOpacity }]}>
      <Slider
        minimumValue={5}
        maximumValue={35}
        step={1}
        value={thickness}
        onValueChange={thicknessOnChange}
        thumbTintColor="black"
        minimumTrackTintColor="black"
      />
      <Slider
        minimumValue={0}
        maximumValue={1}
        step={0.1}
        value={opacity}
        onValueChange={opacityOnChange}
        thumbTintColor="black"
        minimumTrackTintColor="black"
      />
    </Animated.View>
  ) : null;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
  },
});

export default BrushProperties;
