export type PathDataType = [number, number][];

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
