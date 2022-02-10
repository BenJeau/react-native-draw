/**
 * SVG simplification options used to interface with the `@luncheon/simplify-svg-path` package
 */
export interface SimplifyOptions {
  /**
   * Enable SVG path simplification on paths, except the one currently being drawn
   */
  simplifyPaths?: boolean;

  /**
   * Enable SVG path simplification on the stroke being drawn
   */
  simplifyCurrentPath?: boolean;

  /**
   * Amount of simplification to apply
   */
  amount?: number;

  /**
   * Ignore fractional part in the points. Improves performance
   */
  roundPoints?: boolean;
}
