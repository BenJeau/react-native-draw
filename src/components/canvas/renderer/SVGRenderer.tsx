import React, { useMemo } from 'react';
import Svg, { Path } from 'react-native-svg';

import type { PathDataType, PathType } from '../../../types';
import { createSVGPath } from '../utils';

interface SVGRendererProps {
  currentPath: PathDataType;
  currentColor: string;
  currentThickness: number;
  currentOpacity: number;
  paths: PathType[];
  height: number;
  width: number;
  roundPoints: boolean;
  currentPathTolerance: number;
}

const SVGRenderer: React.FC<SVGRendererProps> = ({
  currentPath,
  currentColor,
  currentThickness,
  currentOpacity,
  paths,
  height,
  width,
  roundPoints,
  currentPathTolerance,
}) => {
  const memoizedPath = useMemo(
    () => createSVGPath(currentPath, currentPathTolerance, roundPoints),
    [currentPath, roundPoints, currentPathTolerance]
  );

  return (
    <Svg height={height} width={width}>
      {paths.map(({ color, path, thickness, opacity, combine }, i) =>
        combine ? (
          <SVGRendererPath
            key={i}
            path={path}
            color={color}
            thickness={thickness}
            opacity={opacity}
          />
        ) : (
          path!.map((svgPath, j) => (
            <Path
              key={`${i}-${j}`}
              d={svgPath}
              fill="none"
              stroke={color}
              strokeWidth={thickness}
              strokeLinecap="round"
              opacity={opacity}
              strokeLinejoin="round"
            />
          ))
        )
      )}
      {memoizedPath.length > 0 && (
        <Path
          d={memoizedPath}
          fill="none"
          stroke={currentColor}
          strokeWidth={currentThickness}
          strokeLinecap="round"
          opacity={currentOpacity}
          strokeLinejoin="round"
        />
      )}
    </Svg>
  );
};

interface SVGRendererPathProps {
  path?: string[];
  color: string;
  thickness: number;
  opacity: number;
}

const SVGRendererPath: React.FC<SVGRendererPathProps> = ({
  path,
  color,
  thickness,
  opacity,
}) => {
  const memoizedPath = useMemo(() => path?.join(' ') ?? '', [path]);

  return (
    <Path
      d={memoizedPath}
      fill="none"
      stroke={color}
      strokeWidth={thickness}
      strokeLinecap="round"
      opacity={opacity}
      strokeLinejoin="round"
    />
  );
};

export default SVGRenderer;
