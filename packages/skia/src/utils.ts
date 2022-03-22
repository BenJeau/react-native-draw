import {
  IPaint,
  IPath,
  PaintStyle,
  StrokeCap,
  StrokeJoin,
  Skia,
} from '@shopify/react-native-skia';
import type {
  StrokeCap as CoreStrokeCap,
  StrokeJoin as CoreStrokeJoin,
  PathType,
  PointDataType,
} from '@benjeau/react-native-draw-core';

import type { SkiaPath } from './types';

/**
 * Helper function to convert Skia path colors to useful data
 *
 * @param color Skia color
 * @returns The color as HEX string and opacity
 */
export const convertIntColor = (
  color: number
): { color: string; opacity: number } => {
  const hex = color.toString(16);

  return {
    opacity: parseInt(hex.substring(0, 2), 16) / 255,
    color: hex.substring(2),
  };
};

/**
 * https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linecap
 */
export const SVGStrokeCap: { [key in StrokeCap]: CoreStrokeCap } = {
  [StrokeCap.Butt]: 'butt',
  [StrokeCap.Round]: 'round',
  [StrokeCap.Square]: 'square',
};

/**
 * Helper object to convert from standardized core stroke cap to Skia stroke cap
 */
export const SVGStrokeCapToSkia: { [key in CoreStrokeCap]: StrokeCap } = {
  butt: StrokeCap.Butt,
  round: StrokeCap.Round,
  square: StrokeCap.Square,
};

/**
 * A subset of https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linejoin
 */
export const SVGStrokeJoin: { [key in StrokeJoin]: CoreStrokeJoin } = {
  [StrokeJoin.Bevel]: 'bevel',
  [StrokeJoin.Miter]: 'miter',
  [StrokeJoin.Round]: 'round',
};

/**
 * Helper object to convert from standardized core stroke join to Skia stroke join
 */
export const SVGStrokeJoinToSkia: { [key in CoreStrokeJoin]: StrokeJoin } = {
  bevel: StrokeJoin.Bevel,
  miter: StrokeJoin.Miter,
  round: StrokeJoin.Round,
};

export const convertInnerPathToStandardPath = ({
  paint,
  path,
  style,
  data,
}: SkiaPath): PathType => {
  const rawColor = paint.getColor();
  const { color, opacity } = convertIntColor(rawColor);

  return {
    color,
    thickness: paint.getStrokeWidth(),
    path: [path.toSVGString()],
    opacity,
    cap: SVGStrokeCap[paint.getStrokeCap()],
    join: SVGStrokeJoin[paint.getStrokeJoin()],
    filled: style === PaintStyle.Fill,
    data: [data],
  };
};

export const convertInnerPathsToStandardPaths = (
  paths: SkiaPath[]
): PathType[] => paths.map(convertInnerPathToStandardPath);

export const setPaint = (
  paint: IPaint,
  data: {
    color: string;
    thickness: number;
    opacity: number;
    filled?: boolean;
    cap: CoreStrokeCap;
    join: CoreStrokeJoin;
  }
) => {
  paint.setColor(Skia.Color(data.color));
  paint.setStrokeWidth(data.thickness);
  paint.setAlphaf(data.opacity);
  paint.setStyle(data.filled ? PaintStyle.Fill : PaintStyle.Stroke);
  paint.setStrokeCap(SVGStrokeCapToSkia[data.cap]);
  paint.setStrokeJoin(SVGStrokeJoinToSkia[data.join]);
};

/**
 * Calculate and draw a smooth curve
 *
 * @param path
 * @param point1
 * @param point2
 */
export const drawPoint = (
  path: IPath,
  [x1, y1]: PointDataType,
  [x2, y2]: PointDataType
) => {
  const xMid = (x1 + x2) / 2;
  const yMid = (y1 + y2) / 2;

  path.quadTo(x1, y1, xMid, yMid);
};

export const convertCorePathToSkiaPath = (path: PathType): SkiaPath => {
  const newPaint = Skia.Paint();

  setPaint(newPaint, {
    ...path,
  });

  const newPath = Skia.Path.Make();

  for (let i = 0; i < path.data.length - 1; i++) {
    drawPoint(newPath, path.data[i][0], path.data[i + 1][0]); // TODO: support multiple paths
  }

  return {
    paint: newPaint,
    path: newPath,
    style: path.filled ? PaintStyle.Fill : PaintStyle.Stroke,
    data: path.data[0], // TODO: support multiple paths
  };
};

export const convertCorePathsToSkiaPaths = (paths: PathType[]): SkiaPath[] =>
  paths.map(convertCorePathToSkiaPath);
