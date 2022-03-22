import simplifySvgPath from '@luncheon/simplify-svg-path';
import type { PathDataType, PathType } from '@benjeau/react-native-draw-core';

import type { SimplifyOptions } from './types';

/**
 * Generate SVG path string.
 *
 * @param path SVG path data
 * @param tolerance Amount to simplify the path
 * @param roundPoints Whether to round the points (remove decimals)
 * @returns SVG path strings
 */
export const createSVGPath = (
  path: PathDataType,
  tolerance: number,
  roundPoints: boolean
) => {
  if (path.length > 1) {
    try {
      return simplifySvgPath(path, {
        precision: roundPoints ? 0 : 5,
        tolerance,
      });
    } catch (error) {
      console.log(error);
    }
  } else if (path.length === 1) {
    return `M${path[0][0]},${path[0][1]} L${path[0][0]},${path[0][1]}`;
  }
  return '';
};

/**
 * Generate SVG path string.
 *
 * @param path SVG path data
 * @param simplifyOptions Simplification options for the SVG drawing simplification
 * @returns SVG path strings
 */
export const createSVGPathWithSimplifyOptions = (
  path: PathDataType,
  simplifyOptions: SimplifyOptions
) =>
  createSVGPath(
    path,
    simplifyOptions.simplifyPaths ? simplifyOptions.amount! : 0,
    simplifyOptions.roundPoints!
  );

/**
 * Generate multiple SVG path strings. If the path string is already defined, do not create a new one.
 *
 * @param paths SVG data paths
 * @param simplifyOptions Simplification options for the SVG drawing simplification
 * @returns An array of SVG path strings
 */
export const createSVGPaths = (
  paths: PathType[],
  simplifyOptions: SimplifyOptions
) =>
  paths.map((i) => ({
    ...i,
    path: i.path
      ? i.path
      : i.data.reduce(
          (acc: string[], data) => [
            ...acc,
            createSVGPathWithSimplifyOptions(data, simplifyOptions),
          ],
          []
        ),
  }));
