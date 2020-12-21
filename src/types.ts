export type PathDataType = [number, number][];

export interface PathType {
  /**
   * Color of the path
   */
  color: string;

  /**
   * SVG path
   */
  path: string;

  /**
   * Raw points data used to create the SVG path
   */
  data: PathDataType;

  /**
   * Thickness of the path
   */
  thickness: number;

  /**
   * Opacity of the path
   */
  opacity: number;
}
