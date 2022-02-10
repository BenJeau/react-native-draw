import React, {
  useImperativeHandle,
  useMemo,
  useRef,
  forwardRef,
  useCallback,
} from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {IPaint, IPath, StrokeJoin} from '@shopify/react-native-skia';
import {
  Skia,
  usePaint,
  useDrawCallback,
  useTouchHandler,
  PaintStyle,
  StrokeCap,
  SkiaView,
} from '@shopify/react-native-skia';

type Point = {x: number; y: number};

interface CustomPath {
  path: IPath;
  paint: IPaint;
  style: PaintStyle;
}

interface SerializedPath {
  path: string;
  color: string;
  opacity: number;
  thickness: number;
  rawColor: number;
  paintStyle: PaintStyle;
  cap: StrokeCap;
  join: StrokeJoin;
}

export interface SkiaRendererRef {
  undo: () => void;
  clear: () => void;
  getPaths: () => SerializedPath[];
  getSvg: () => string;
}

interface SkiaRendererProps {
  backgroundColor?: string;
  strokeColor?: string;
  strokeThickness?: number;
  strokeOpacity?: number;
  strokePaintStyle?: PaintStyle;
  strokeCap?: StrokeCap;
  strokeJoin?: StrokeJoin;
  shareStrokeProperties?: boolean;
  height?: string | number;
  width?: string | number;
  debug?: boolean;
  style?: ViewStyle;
  erasing?: boolean;
  eraserSize?: number;
  touchDisabled?: boolean;
}

// onPathsChange,
// simplifyOptions = {},

const convertIntColor = (color: number): {color: string; opacity: number} => {
  const hex = color.toString(16);

  return {
    opacity: parseInt(hex.substring(0, 2), 16) / 255,
    color: hex.substring(2),
  };
};

const SVGPaintStyle: {[key in PaintStyle]: string} = {
  [PaintStyle.Fill]: 'fill',
  [PaintStyle.Stroke]: 'stroke',
};

/**
 * https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linecap
 */
const SVGStrokeCap: {[key in StrokeCap]: string} = {
  [StrokeCap.Butt]: 'butt',
  [StrokeCap.Round]: 'round',
  [StrokeCap.Square]: 'square',
};

/**
 * A subset of https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linejoin
 */
const SVGStrokeJoin: {[key in StrokeJoin]: string} = {
  [StrokeJoin.Bevel]: 'bevel',
  [StrokeJoin.Miter]: 'miter',
  [StrokeJoin.Round]: 'round',
};

const SkiaRenderer = forwardRef<SkiaRendererRef, SkiaRendererProps>(
  (
    {
      strokeColor = '#000000',
      strokeThickness = 5,
      strokeOpacity = 1,
      strokePaintStyle = PaintStyle.Stroke,
      strokeCap = StrokeCap.Round,
      strokeJoin = StrokeJoin.Round,
      backgroundColor = '#FFFFFF',
      shareStrokeProperties,
      height = '100%',
      width = '100%',
      debug,
      style,
      erasing,
      eraserSize = 20,
      touchDisabled,
    },
    ref,
  ) => {
    const prevPointRef = useRef<Point>();
    const skiaViewRef = useRef<SkiaView>(null);

    const paths = useMemo(() => [] as CustomPath[], []);
    let eraserPoint = useMemo(() => ({x: 0, y: 0, erasing: false}), []);

    const canvasPaint = usePaint(p => p.setColor(Skia.Color(backgroundColor)));

    const pathPaint = usePaint(p => {
      p.setColor(Skia.Color(strokeColor));
      p.setStrokeWidth(strokeThickness);
      p.setAlphaf(strokeOpacity);
      p.setStrokeCap(strokeCap);
      p.setStrokeJoin(strokeJoin);
      p.setStyle(strokePaintStyle);
    });

    const eraserPaint = usePaint(p => {
      p.setColor(Skia.Color('#000000'));
      p.setStyle(PaintStyle.Fill);
    });

    const getPaths = useCallback(
      (): SerializedPath[] =>
        paths.map(({paint, path, style}) => {
          const rawColor = paint.getColor();
          const {color, opacity} = convertIntColor(rawColor);

          return {
            color,
            thickness: paint.getStrokeWidth(),
            path: path.toSVGString(),
            opacity,
            rawColor,
            cap: paint.getStrokeCap(),
            join: paint.getStrokeJoin(),
            paintStyle: style,
          };
        }),
      [paths],
    );

    const undo = useCallback(() => {
      paths.length = Math.max(0, paths.length - 1);
      skiaViewRef.current?.redraw();
    }, [paths, skiaViewRef]);

    const clear = useCallback(() => {
      paths.length = 0;
      skiaViewRef.current?.redraw();
    }, [paths, skiaViewRef]);

    const getSvg = useCallback(
      () =>
        `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${getPaths().reduce(
          (acc, {color, opacity, path, thickness, paintStyle, cap, join}) =>
            `${acc}<path d="${path}" stroke="${color}" stroke-width="${thickness}" opacity="${opacity}" stroke-linecap="${SVGStrokeCap[cap]}" stroke-linejoin="${SVGStrokeJoin[join]}" fill="${SVGPaintStyle[paintStyle]}"/>`,
          '',
        )}</svg>`,
      [getPaths],
    );

    useImperativeHandle(ref, () => ({
      undo,
      clear,
      getPaths,
      getSvg,
    }));

    const erasingPaths = useCallback(
      (x: number, y: number) => {
        const reversedPaths = [...paths].reverse();
        reversedPaths.forEach(({path}, index) => {
          if (path.contains(x, y)) {
            paths.splice(reversedPaths.length - index - 1, 1);
          }
        });
      },
      [paths],
    );

    const touchHandler = useTouchHandler({
      onStart: ({x, y}) => {
        if (erasing) {
          erasingPaths(x, y);
          eraserPoint = {x, y, erasing: true};
        } else {
          const path = Skia.Path.Make();
          path.setIsVolatile(true);
          paths.push({path, paint: pathPaint, style: strokePaintStyle});
          path.moveTo(x, y);
          prevPointRef.current = {x, y};
        }
      },
      onActive: ({x, y}) => {
        if (erasing) {
          erasingPaths(x, y);
          eraserPoint = {x, y, erasing: true};
        } else {
          // Get current path object
          const {path} = paths[paths.length - 1];

          // Calculate and draw a smooth curve
          const xMid = (prevPointRef.current!.x + x) / 2;
          const yMid = (prevPointRef.current!.y + y) / 2;

          path.quadTo(
            prevPointRef.current!.x,
            prevPointRef.current!.y,
            xMid,
            yMid,
          );

          prevPointRef.current = {x, y};
        }
      },
      onEnd: () => {
        eraserPoint.erasing = false;
      },
    });

    const onDraw = useDrawCallback(
      (canvas, info) => {
        if (!touchDisabled) {
          // Update from pending touches
          touchHandler(info.touches);
        }

        // Clear screen
        canvas.drawPaint(canvasPaint);

        // Draw paths
        if (shareStrokeProperties) {
          paths.forEach(({path}) => canvas.drawPath(path, pathPaint));
        } else {
          paths.forEach(({path, paint}) => canvas.drawPath(path, paint));
        }

        console.log(eraserPoint)

        if (eraserPoint.erasing) {
          canvas.drawCircle(
            eraserPoint.x,
            eraserPoint.y,
            eraserSize,
            eraserPaint,
          );
        }
      },
      [
        canvasPaint,
        pathPaint,
        eraserPaint,
        eraserPoint,
        eraserSize,
        paths,
        touchDisabled,
        shareStrokeProperties,
      ],
    );

    return (
      <SkiaView
        ref={skiaViewRef}
        style={[styles.skiaview, style, {width, height}]}
        onDraw={onDraw}
        debug={debug}
      />
    );
  },
);

const styles = StyleSheet.create({
  skiaview: {
    flex: 1,
    overflow: 'hidden',
  },
});

export default SkiaRenderer;
