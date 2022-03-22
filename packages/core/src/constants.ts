import { Dimensions } from 'react-native';
import { DrawingTool } from './types';

export const DEFAULT_BRUSH_COLOR = '#000000';
export const DEFAULT_ERASER_SIZE = 5;
export const DEFAULT_THICKNESS = 3;
export const DEFAULT_OPACITY = 1;
export const DEFAULT_STROKE_CAP = 'round';
export const DEFAULT_STROKE_JOIN = 'round';
export const DEFAULT_TOOL = DrawingTool.Brush;
export const DEFAULT_CANVAS_BACKGROUND_COLOR = '#FFFFFF';

export const { width: screenWidth, height: screenHeight } =
  Dimensions.get('window');
