import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

export type BrushType = 'stroke' | 'dot' | 'none';

export interface BrushPreviewProps {
  color: string;
  thickness: number;
  opacity: number;
  previewType: BrushType;
}

const BrushPreview: React.FC<BrushPreviewProps> = ({
  color,
  thickness,
  opacity,
  previewType,
}) =>
  previewType !== 'none' ? (
    <Svg height={80} width={100}>
      {previewType === 'stroke' ? (
        <Path
          d="M 20 60 Q 30 20 50 40 Q 70 60 80 20 "
          fill="none"
          stroke={color}
          strokeWidth={thickness}
          opacity={opacity}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <Circle
          r={thickness / 2}
          fill={color}
          opacity={opacity}
          x={50}
          y={40}
        />
      )}
    </Svg>
  ) : null;

export default BrushPreview;
