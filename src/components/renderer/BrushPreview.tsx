import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface BrushPreviewProps {
  color: string;
  thickness: number;
  opacity: number;
}

const BrushPreview: React.FC<BrushPreviewProps> = ({
  color,
  thickness,
  opacity,
}) => (
  <Svg height={80} width={100}>
    <Path
      d="M 20 60 Q 30 20 50 40 Q 70 60 80 20 "
      fill="none"
      stroke={color}
      strokeWidth={thickness}
      opacity={opacity}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default BrushPreview;
