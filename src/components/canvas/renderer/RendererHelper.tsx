import React, { useMemo } from 'react';

import type { PathDataType, PathType } from '../../../types';
import { createSVGPath } from '../utils';

export interface RendererProps {
  paths: PathType[];
  height: number;
  width: number;
}

interface RendererHelperProps {
  currentPath: PathDataType;
  currentColor: string;
  currentThickness: number;
  currentOpacity: number;
  paths: PathType[];
  height: number;
  width: number;
  roundPoints: boolean;
  currentPathTolerance: number;
  Renderer: React.FC<RendererProps>;
}

const RendererHelper: React.FC<RendererHelperProps> = ({
  currentPath,
  currentColor,
  currentThickness,
  currentOpacity,
  paths,
  height,
  width,
  roundPoints,
  currentPathTolerance,
  Renderer,
}) => {
  const mergedPaths = useMemo(
    () => [
      ...paths,
      {
        color: currentColor,
        path: [createSVGPath(currentPath, currentPathTolerance, roundPoints)],
        thickness: currentThickness,
        opacity: currentOpacity,
        data: [currentPath],
      },
    ],
    [
      currentColor,
      currentThickness,
      currentPath,
      currentOpacity,
      paths,
      currentPathTolerance,
      roundPoints,
    ]
  );

  return <Renderer height={height} width={width} paths={mergedPaths} />;
};

export default RendererHelper;
