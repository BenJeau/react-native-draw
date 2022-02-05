import React, { useMemo } from 'react';
import Svg, { Path } from 'react-native-svg';

import type { RendererProps } from './RendererHelper';

const SVGRenderer: React.FC<RendererProps> = ({ paths, height, width }) => (
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
  </Svg>
);

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
