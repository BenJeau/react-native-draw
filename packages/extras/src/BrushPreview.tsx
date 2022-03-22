import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

export type BrushType = 'stroke' | 'dot' | 'none';

export interface BrushPreviewProps {
  /**
   * Color of the brush strokes
   */
  color: string;

  /**
   * Thickness of the brush strokes
   */
  thickness: number;

  /**
   * Opacity of the brush strokes
   */
  opacity: number;

  /**
   * Brush preview preset, for different kinds of previews
   * @default DEFAULT_BRUSH_PREVIEW
   */
  brushPreview?: BrushType;
}

/**
 * Displays a preview of the current brush with its color, size, and
 * opacity. The preview can either be a stroke or a dot.
 */
const BrushPreview: React.FC<BrushPreviewProps> = ({
  color,
  thickness,
  opacity,
  brushPreview,
}) =>
  brushPreview !== 'none' ? (
    <Svg height={80} width={100}>
      {brushPreview === 'stroke' ? (
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
