import React, {
  useImperativeHandle,
  useMemo,
  useRef,
  forwardRef,
  useCallback,
  useEffect,
} from 'react';
import { StyleSheet } from 'react-native';
import {
  Skia,
  usePaint,
  useDrawCallback,
  useTouchHandler,
  PaintStyle,
  SkiaView,
} from '@shopify/react-native-skia';
import {
  DEFAULT_BRUSH_COLOR,
  DEFAULT_ERASER_SIZE,
  DEFAULT_OPACITY,
  DEFAULT_STROKE_CAP,
  DEFAULT_STROKE_JOIN,
  DEFAULT_THICKNESS,
  DEFAULT_TOOL,
  DEFAULT_CANVAS_BACKGROUND_COLOR,
  CanvasRef,
  CanvasProps as CoreCanvasProps,
  DrawingTool,
  PathType,
  PointDataType,
  getSvgHelper,
} from '@benjeau/react-native-draw-core';

import {
  convertCorePathsToSkiaPaths,
  convertCorePathToSkiaPath,
  convertInnerPathsToStandardPaths,
  drawPoint,
  setPaint,
} from './utils';

export interface CanvasProps extends CoreCanvasProps {
  /**
   * When set to true the view will display information about the
   * average time it takes to render.
   * @default false
   */
  debug?: boolean;

  /**
   * Background color of the canvas
   * @default DEFAULT_CANVAS_BACKGROUND_COLOR
   */
  backgroundColor?: string;
}

const Canvas = forwardRef<CanvasRef, CanvasProps>(
  (
    {
      color = DEFAULT_BRUSH_COLOR,
      thickness = DEFAULT_THICKNESS,
      opacity = DEFAULT_OPACITY,
      filled,
      cap = DEFAULT_STROKE_CAP,
      join = DEFAULT_STROKE_JOIN,
      initialPaths = [],
      style,
      height = '100%',
      width = '100%',
      eraserSize = DEFAULT_ERASER_SIZE,
      tool = DEFAULT_TOOL,
      onPathsChange,
      backgroundColor = DEFAULT_CANVAS_BACKGROUND_COLOR,
      debug,
      shareStrokeProperties,
      touchDisabled,
    },
    ref
  ) => {
    const prevPointRef = useRef<PointDataType>();
    const skiaViewRef = useRef<SkiaView>(null);

    const paths = useMemo(() => convertCorePathsToSkiaPaths(initialPaths), []);
    let eraserPoint = useMemo(() => ({ x: 0, y: 0, erasing: false }), []);

    const canvasPaint = usePaint((p) =>
      p.setColor(Skia.Color(backgroundColor))
    );

    const pathPaint = usePaint((p) => {
      setPaint(p, {
        color,
        thickness,
        opacity,
        filled,
        cap,
        join,
      });
    });

    const eraserPaint = usePaint((p) => {
      p.setColor(Skia.Color('#000000'));
      p.setStyle(PaintStyle.Fill);
    });

    const undo = useCallback(() => {
      paths.length = Math.max(0, paths.length - 1);
      skiaViewRef.current?.redraw();
    }, [paths, skiaViewRef]);

    const clear = useCallback(() => {
      paths.length = 0;
      skiaViewRef.current?.redraw();
    }, [paths, skiaViewRef]);

    const getPaths = useCallback(
      (): PathType[] => convertInnerPathsToStandardPaths(paths),
      [paths]
    );

    const addPath = useCallback(
      (path: PathType) => {
        paths.push(convertCorePathToSkiaPath(path));
      },
      [paths]
    );

    const addPaths = useCallback(
      (corePaths: PathType[]) => {
        paths.push(...convertCorePathsToSkiaPaths(corePaths));
      },
      [paths]
    );

    const setPaths = useCallback(
      (corePaths: PathType[]) => {
        paths.splice(
          0,
          paths.length,
          ...convertCorePathsToSkiaPaths(corePaths)
        );
      },
      [paths]
    );

    const getSvg = useCallback(
      () => getSvgHelper(getPaths(), width, height),
      [getPaths, width, height]
    );

    useImperativeHandle(ref, () => ({
      undo,
      clear,
      getPaths,
      addPath,
      addPaths,
      setPaths,
      getSvg,
    }));

    const erasingPaths = useCallback(
      (x: number, y: number) => {
        const reversedPaths = [...paths].reverse();
        reversedPaths.forEach(({ path }, index) => {
          if (path.contains(x, y)) {
            paths.splice(reversedPaths.length - index - 1, 1);
          }
        });
      },
      [paths]
    );

    const touchHandler = useTouchHandler({
      onStart: ({ x, y }) => {
        if (tool === DrawingTool.Eraser) {
          erasingPaths(x, y);
          eraserPoint = { x, y, erasing: true };
        } else {
          const path = Skia.Path.Make();
          path.setIsVolatile(true);
          paths.push({
            path,
            paint: pathPaint,
            style: filled ? PaintStyle.Fill : PaintStyle.Stroke,
            data: [[x, y]],
          });
          path.moveTo(x, y);
          prevPointRef.current = [x, y];
        }
      },
      onActive: ({ x, y }) => {
        if (tool === DrawingTool.Eraser) {
          erasingPaths(x, y);
          eraserPoint = { x, y, erasing: true };
        } else {
          // Get current path object
          const { path } = paths[paths.length - 1];

          drawPoint(path, prevPointRef.current!, [x, y]);

          prevPointRef.current = [x, y];
          paths[paths.length].data.push([x, y]);
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
          paths.forEach(({ path }) => canvas.drawPath(path, pathPaint));
        } else {
          paths.forEach(({ path, paint }) => canvas.drawPath(path, paint));
        }

        if (eraserPoint.erasing) {
          canvas.drawCircle(
            eraserPoint.x,
            eraserPoint.y,
            eraserSize,
            eraserPaint
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
      ]
    );

    useEffect(
      () =>
        onPathsChange && onPathsChange(convertInnerPathsToStandardPaths(paths)),
      [paths, onPathsChange]
    );

    return (
      <SkiaView
        ref={skiaViewRef}
        style={[styles.skia, style, { width, height }]}
        onDraw={onDraw}
        debug={debug}
      />
    );
  }
);

const styles = StyleSheet.create({
  skia: {
    flex: 1,
    overflow: 'hidden',
  },
});

export default Canvas;
