import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import {
  DEFAULT_BRUSH_PREVIEW,
  DEFAULT_DELETE_BUTTON_COLOR,
  DEFAULT_OTHER_BUTTONS_COLOR,
  DEFAULT_TOOL,
} from './constants';
import { DrawingTool } from './types';
import BrushPreview, { BrushPreviewProps } from './BrushPreview';
import Button from './Button';
import { Brush, Delete, Eraser, Palette, Undo } from './icons';

export interface CanvasControlsProps extends BrushPreviewProps {
  /**
   * Callback when the clear button is pressed
   */
  onClear?: () => void;

  /**
   * Callback when the undo button is pressed
   */
  onUndo?: () => void;

  /**
   * Callback when the eraser button is pressed
   */
  onToggleEraser?: () => void;

  /**
   * Callback when the brush properties button is pressed
   */
  onToggleBrushProperties?: () => void;

  /**
   * Override the style of the buttons
   */
  buttonStyle?: StyleProp<ViewStyle>;

  /**
   * Initial tool of the canvas
   * @default DEFAULT_TOOL
   */
  tool?: DrawingTool;

  /**
   * Delete button color
   * @default DEFAULT_DELETE_BUTTON_COLOR
   */
  deleteButtonColor?: string;

  /**
   * Other buttons color (undo and eraser mode toggle)
   * @default DEFAULT_OTHER_BUTTONS_COLOR
   */
  otherButtonsColor?: string;
}

/**
 * Bottom section of the canvas, allowing the user to change the brush
 * properties, clear the canvas, undo strokes.
 *
 * The buttons will be visible if the corresponding callback is provided.
 */
const CanvasControls: React.FC<CanvasControlsProps> = ({
  onClear,
  onUndo,
  onToggleEraser,
  onToggleBrushProperties,
  buttonStyle,
  tool = DEFAULT_TOOL,
  deleteButtonColor = DEFAULT_DELETE_BUTTON_COLOR,
  otherButtonsColor = DEFAULT_OTHER_BUTTONS_COLOR,
  color,
  thickness,
  opacity,
  brushPreview = DEFAULT_BRUSH_PREVIEW,
}) => (
  <View style={styles.container}>
    <View style={styles.content}>
      <View style={styles.buttonsContainer}>
        {onClear && (
          <Button
            onPress={onClear}
            color={deleteButtonColor}
            style={buttonStyle}
          >
            <Delete fill={deleteButtonColor} height={30} width={30} />
          </Button>
        )}
        {onUndo && (
          <View style={onClear && styles.endButton}>
            <Button
              onPress={onUndo}
              color={otherButtonsColor}
              style={buttonStyle}
            >
              <Undo fill={otherButtonsColor} height={30} width={30} />
            </Button>
          </View>
        )}
      </View>

      <BrushPreview
        color={color}
        opacity={opacity}
        thickness={thickness}
        brushPreview={brushPreview}
      />

      <View style={styles.buttonsContainer}>
        {onToggleEraser && (
          <Button
            onPress={onToggleEraser}
            color={otherButtonsColor}
            style={buttonStyle}
          >
            {tool === DrawingTool.Brush ? (
              <Brush fill={otherButtonsColor} height={30} width={30} />
            ) : (
              <Eraser fill={otherButtonsColor} height={30} width={30} />
            )}
          </Button>
        )}
        {onToggleBrushProperties && (
          <View style={onToggleEraser && styles.endButton}>
            <Button
              onPress={onToggleBrushProperties}
              color={color}
              style={buttonStyle}
            >
              <Palette fill={color} height={30} width={30} />
            </Button>
          </View>
        )}
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: '100%',
    justifyContent: 'center',
  },
  content: {
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

export default CanvasControls;
