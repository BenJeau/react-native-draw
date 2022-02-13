import type { StyleProp, ViewStyle } from 'react-native';

/**
 *  A point [x, y]
 */
export type PointDataType = [number, number];

/**
 * An array of points making up a path [x, y][]
 */
export type PathDataType = PointDataType[];

/**
 * Shape to be used at the end of open sub paths
 */
export type StrokeCap = 'butt' | 'round' | 'square';

/**
 * Shape to be used at the corners of paths
 */
export type StrokeJoin = 'bevel' | 'miter' | 'round';

/**
 * Grouped data paths of the same color, thickness, opacity, filled, cap, and join drawn
 * consecutively
 */
export interface PathType {
  /**
   * Color of the path
   */
  color: string;

  /**
   * SVG path. It does not need to be defined while passing a PathType to Draw as initialValues.
   * It will always be defined if you get the path data from the component.
   */
  path?: string[];

  /**
   * Raw points data used to create the SVG path
   */
  data: PathDataType[];

  /**
   * Thickness of the path
   */
  thickness: number;

  /**
   * Opacity of the path
   */
  opacity: number;

  /**
   * Whether the path is filled or not
   */
  filled?: boolean;

  /**
   * The cap of the stroke, shape to be used at the end of open sub paths
   */
  cap: StrokeCap;

  /**
   * The join of the stroke, shape to be used at the corners of paths
   */
  join: StrokeJoin;

  /**
   * Combine all the paths
   */
  combine?: boolean;
}

/**
 * Tool used on the canvas
 */
export enum DrawingTool {
  Brush = 'brush',
  Eraser = 'eraser',
}

/**
 * React props for a general `Canvas` component
 */
export interface CanvasProps {
  /**
   * Color of the brush strokes
   * @default DEFAULT_BRUSH_COLOR
   */
  color?: string;

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
   * Whether the path is filled or not
   */
  filled?: boolean;

  /**
   * The cap of the stroke, shape to be used at the end of open sub paths
   * @default DEFAULT_STROKE_CAP
   */
  cap?: StrokeCap;

  /**
   * The join of the stroke, shape to be used at the corners of paths
   * @default DEFAULT_STROKE_JOIN
   */
  join?: StrokeJoin;

  /**
   * Paths to be already drawn
   * @default []
   */
  initialPaths?: PathType[];

  /**
   * Height of the canvas
   */
  height?: number | string;

  /**
   * Width of the canvas
   */
  width?: number | string;

  /**
   * Override the style of the container of the canvas
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Callback function when paths change
   */
  onPathsChange?: (paths: PathType[]) => any;

  /**
   * Width of eraser (to compensate for path simplification)
   * @default DEFAULT_ERASER_SIZE
   */
  eraserSize?: number;

  /**
   * Initial tool of the canvas
   * @default DEFAULT_TOOL
   */
  tool?: DrawingTool;

  /**
   * Combine current path with the last path if it's the same color,
   * thickness, and opacity.
   *
   * **Note**: changing this value while drawing will only be effective
   * on the next change to opacity, thickness, or color change
   * @default false
   */
  combineWithLatestPath?: boolean;

  /**
   * Make all the strokes on the canvas share the same properties (color,
   * thickness, opacity, filled, cap, join)
   *
   * Can help you achieve some cool things
   * @default false
   */
  shareStrokeProperties?: boolean;

  /**
   * Disable touch events on the canvas
   * @default false
   */
  touchDisabled?: boolean;
}

/**
 * React ref for a generic `Canvas` component
 */
export interface CanvasRef {
  /**
   * Undo last brush stroke
   */
  undo: () => void;

  /**
   * Remove all brush strokes
   */
  clear: () => void;

  /**
   * Get brush strokes data
   */
  getPaths: () => PathType[];

  /**
   * Append a path to the current drawing paths
   * @param path Path to append/draw
   */
  addPath: (path: PathType) => void;

  /**
   * Append multiple paths to the current drawing paths
   * @param paths Multiple paths to append/draw
   */
  addPaths: (paths: PathType[]) => void;

  /**
   * Replace current drawing paths with new ones (similar to calling `clear()`
   * and then `addPaths()`)
   * @param paths Multiple paths to append/draw
   */
  setPaths: (paths: PathType[]) => void;

  /**
   * Get SVG path string of the drawing
   */
  getSvg: () => string;
}
