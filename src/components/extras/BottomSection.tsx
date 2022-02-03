import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import {
  DEFAULT_BRUSH_PREVIEW,
  DEFAULT_DELETE_BUTTON_COLOR,
  DEFAULT_OTHER_BUTTONS_COLOR,
  DEFAULT_TOOL,
} from '../../constants';
import { DrawingTool } from '../../types';
import BrushPreview, { BrushType } from './BrushPreview';
import Button from './Button';
import { Brush, Delete, Eraser, Palette, Undo } from './icons';

export interface BottomSectionProps {
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
   * Callback when the color palette button is pressed
   */
  onToggleColorPalette?: () => void;

  /**
   * Override the style of the buttons
   */
  buttonStyle?: StyleProp<ViewStyle>;

  /**
   * Change brush preview preset or remove it
   * @default DEFAULT_BRUSH_PREVIEW
   */
  brushPreview?: BrushType;

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

  /**
   * Initial tool of the canvas
   * @default DEFAULT_TOOL
   */
  tool?: DrawingTool;

  /**
   * Current brush color
   */
  color: string;

  /**
   * Current brush opacity
   */
  opacity: number;

  /**
   * Current brush size
   */
  thickness: number;
}

/**
 * Bottom section of the canvas, allowing the user can change the brush
 * properties, clear the canvas, undo strokes.
 *
 * The buttons will be visible if the corresponding callback is provided.
 */
const BottomSection: React.FC<BottomSectionProps> = ({
  onClear,
  onUndo,
  onToggleEraser,
  onToggleColorPalette,
  buttonStyle,
  brushPreview = DEFAULT_BRUSH_PREVIEW,
  tool = DEFAULT_TOOL,
  deleteButtonColor = DEFAULT_DELETE_BUTTON_COLOR,
  otherButtonsColor = DEFAULT_OTHER_BUTTONS_COLOR,
  color,
  opacity,
  thickness,
}) => (
  <View style={styles.bottomContainer}>
    <View style={styles.bottomContent}>
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
        previewType={brushPreview}
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
        {onToggleColorPalette && (
          <View style={onToggleEraser && styles.endButton}>
            <Button
              onPress={onToggleColorPalette}
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

export default BottomSection;
