import simplifySvgPath from '@luncheon/simplify-svg-path';
import type { PathDataType } from '../../types';

export const createSVGPath = (
  points: PathDataType,
  tolerance: number,
  roundPoints: boolean
) => {
  if (points.length > 1) {
    try {
      return simplifySvgPath(points, {
        precision: roundPoints ? 0 : 5,
        tolerance,
      });
    } catch (error) {
      console.log(error);
    }
  } else if (points.length === 1) {
    return `M${points[0][0]},${points[0][1]} L${points[0][0]},${points[0][1]}`;
  }
  return '';
};
