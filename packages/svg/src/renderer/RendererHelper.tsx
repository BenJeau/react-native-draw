import React, { useMemo } from 'react';

import type {
  PathDataType,
  PathType,
  StrokeCap,
  StrokeJoin,
} from '@benjeau/react-native-draw-core';
import { createSVGPath } from '../utils';

export interface RendererProps {
  paths: PathType[];
  height: number | string;
  width: number | string;
}

interface RendererHelperProps extends RendererProps {
  currentPath: PathDataType;
  currentColor: string;
  currentThickness: number;
  currentOpacity: number;
  currentFilled?: boolean;
  currentCap: StrokeCap;
  currentJoin: StrokeJoin;
  shareStrokeProperties?: boolean;
  roundPoints: boolean;
  currentPathTolerance: number;
  Renderer: React.FC<RendererProps>;
}

const RendererHelper: React.FC<RendererHelperProps> = ({
  currentPath,
  currentColor,
  currentThickness,
  currentOpacity,
  currentFilled,
  currentCap,
  currentJoin,
  shareStrokeProperties,
  paths,
  height,
  width,
  roundPoints,
  currentPathTolerance,
  Renderer,
}) => {
  const mergedPaths = useMemo(
    () => [
      ...(shareStrokeProperties
        ? paths.map((path) => ({
            ...path,
            color: currentColor,
            thickness: currentThickness,
            opacity: currentOpacity,
            data: [currentPath],
            filled: currentFilled,
            cap: currentCap,
            join: currentJoin,
          }))
        : paths),
      {
        color: currentColor,
        path: [createSVGPath(currentPath, currentPathTolerance, roundPoints)],
        thickness: currentThickness,
        opacity: currentOpacity,
        data: [currentPath],
        filled: currentFilled,
        cap: currentCap,
        join: currentJoin,
      },
    ],
    [
      currentColor,
      currentThickness,
      currentPath,
      currentOpacity,
      currentFilled,
      currentCap,
      currentJoin,
      shareStrokeProperties,
      paths,
      currentPathTolerance,
      roundPoints,
    ]
  );

  return <Renderer height={height} width={width} paths={mergedPaths} />;
};

export default RendererHelper;
