import type { PathDataType } from '../types';

export const createSVGPath = (path: PathDataType) => {
  return path.reduce((acc, point, index) => {
    let letter = 'L';

    if (index === 0) letter = 'M';

    return `${acc}${letter} ${point[0]},${point[1]} `;
  }, '');
};
