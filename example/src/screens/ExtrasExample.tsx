import React, { useRef, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Canvas, CanvasRef, DrawingTool } from '@benjeau/react-native-draw';
import {
  BrushProperties,
  CanvasControls,
  DEFAULT_COLORS,
} from '@benjeau/react-native-draw-extras';
import { useTheme } from '@react-navigation/native';

export default () => {
  const theme = useTheme();

  const canvasRef = useRef<CanvasRef>(null);

  const [color, setColor] = useState(DEFAULT_COLORS[0][0][0]);
  const [thickness, setThickness] = useState(5);
  const [opacity, setOpacity] = useState(1);
  const [tool, setTool] = useState(DrawingTool.Brush);
  const [visibleBrushProperties, setVisibleBrushProperties] = useState(false);

  const handleUndo = () => {
    canvasRef.current?.undo();
  };

  const handleClear = () => {
    canvasRef.current?.clear();
  };

  const handleToggleEraser = () => {
    setTool((prev) =>
      prev === DrawingTool.Brush ? DrawingTool.Eraser : DrawingTool.Brush
    );
  };

  const [overlayOpacity] = useState(new Animated.Value(0));
  const handleToggleBrushProperties = () => {
    if (!visibleBrushProperties) {
      setVisibleBrushProperties(true);

      Animated.timing(overlayOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setVisibleBrushProperties(false);
      });
    }
  };

  return (
    <>
      <Canvas
        ref={canvasRef}
        height={600}
        color={color}
        thickness={thickness}
        opacity={opacity}
        tool={tool}
        style={{
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderColor: theme.colors.border,
        }}
      />
      <View>
        <CanvasControls
          onUndo={handleUndo}
          onClear={handleClear}
          onToggleEraser={handleToggleEraser}
          onToggleBrushProperties={handleToggleBrushProperties}
          tool={tool}
          color={color}
          opacity={opacity}
          thickness={thickness}
        />
        {visibleBrushProperties && (
          <BrushProperties
            color={color}
            thickness={thickness}
            opacity={opacity}
            onColorChange={setColor}
            onThicknessChange={setThickness}
            onOpacityChange={setOpacity}
            sliderColor={theme.colors.text}
            //@ts-ignore
            style={{
              position: 'absolute',
              bottom: 80,
              left: 0,
              right: 0,
              padding: 10,
              backgroundColor: theme.colors.background,
              borderTopEndRadius: 10,
              borderTopStartRadius: 10,
              borderWidth: StyleSheet.hairlineWidth,
              borderBottomWidth: 0,
              borderTopColor: '#ccc',
              opacity: overlayOpacity,
            }}
          />
        )}
      </View>
    </>
  );
};
