import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerStateChangeEvent,
  State,
} from 'react-native-gesture-handler';
import {
  DEFAULT_BRUSH_COLOR,
  DEFAULT_ERASER_SIZE,
  DEFAULT_OPACITY,
  DEFAULT_STROKE_CAP,
  DEFAULT_STROKE_JOIN,
  DEFAULT_THICKNESS,
  DEFAULT_TOOL,
  CanvasProps as CoreCanvasProps,
  CanvasRef,
  DrawingTool,
  PathDataType,
  PathType,
  screenHeight,
  screenWidth,
  getSvgHelper,
} from '@benjeau/react-native-draw-core';

import type { SimplifyOptions } from './types';
import { createSVGPaths, createSVGPathWithSimplifyOptions } from './utils';
import RendererHelper from './renderer/RendererHelper';
import SVGRenderer from './renderer/SVGRenderer';

export interface CanvasProps extends CoreCanvasProps {
  /**
   * SVG simplification options
   */
  simplifyOptions?: SimplifyOptions;
}

/**
 * SVG version of the `Canvas` component
 */
const SVGCanvas = forwardRef<CanvasRef, CanvasProps>(
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
      height = screenHeight - 80,
      width = screenWidth,
      simplifyOptions = {},
      onPathsChange,
      eraserSize = DEFAULT_ERASER_SIZE,
      tool = DEFAULT_TOOL,
      combineWithLatestPath,
      shareStrokeProperties,
      touchDisabled,
    },
    ref
  ) => {
    simplifyOptions = {
      simplifyPaths: true,
      simplifyCurrentPath: false,
      amount: 15,
      roundPoints: true,
      ...simplifyOptions,
    };

    const [paths, setPaths] = useState<PathType[]>(
      createSVGPaths(initialPaths, simplifyOptions)
    );
    const [path, setPath] = useState<PathDataType>([]);

    const canvasContainerStyles = [
      styles.canvas,
      {
        height,
        width,
      },
      style,
    ];

    const addPointToPath = (x: number, y: number) => {
      setPath((prev) => [
        ...prev,
        [
          simplifyOptions.roundPoints ? Math.floor(x) : x,
          simplifyOptions.roundPoints ? Math.floor(y) : y,
        ],
      ]);
    };

    const undo = () => {
      setPaths((list) =>
        list.reduce((acc: PathType[], p, index) => {
          if (index === list.length - 1) {
            if (p.data.length > 1) {
              return [
                ...acc,
                {
                  ...p,
                  data: p.data.slice(0, -1),
                  path: p.path!.slice(0, -1),
                },
              ];
            }
            return acc;
          }
          return [...acc, p];
        }, [])
      );
    };

    const clear = () => {
      setPaths([]);
      setPath([]);
    };

    const getPaths = () => paths;

    const addPath = (newPath: PathType) =>
      setPaths((prev) => [...prev, newPath]);

    const getSvg = () => getSvgHelper(paths, width, height);

    useImperativeHandle(ref, () => ({
      undo,
      clear,
      getPaths,
      addPath,
      getSvg,
    }));

    useEffect(
      () => onPathsChange && onPathsChange(paths),
      [paths, onPathsChange]
    );

    const onGestureEvent = ({
      nativeEvent: { x, y },
    }: PanGestureHandlerGestureEvent) => {
      switch (tool) {
        case DrawingTool.Brush:
          addPointToPath(x, y);
          break;
        case DrawingTool.Eraser:
          setPaths((prevPaths) =>
            prevPaths.reduce((acc: PathType[], p) => {
              const filteredDataPaths = p.data.reduce(
                (
                  acc2: { data: PathDataType[]; path: string[] },
                  data,
                  index
                ) => {
                  const closeToPath = data.some(
                    ([x1, y1]) =>
                      Math.abs(x1 - x) < p.thickness + eraserSize &&
                      Math.abs(y1 - y) < p.thickness + eraserSize
                  );

                  // If point close to path, don't include it
                  if (closeToPath) {
                    return acc2;
                  }

                  return {
                    data: [...acc2.data, data],
                    path: [...acc2.path, p.path![index]],
                  };
                },
                { data: [], path: [] }
              );

              if (filteredDataPaths.data.length > 0) {
                return [...acc, { ...p, ...filteredDataPaths }];
              }

              return acc;
            }, [])
          );
          break;
      }
    };

    const onHandlerStateChange = ({
      nativeEvent: { state, x, y },
    }: PanGestureHandlerStateChangeEvent) => {
      if (tool === DrawingTool.Brush) {
        if (state === State.BEGAN) {
          addPointToPath(x, y);
        } else if (state === State.END || state === State.CANCELLED) {
          setPaths((prev) => {
            const newSVGPath = createSVGPathWithSimplifyOptions(
              path,
              simplifyOptions
            );

            if (prev.length === 0) {
              return [
                {
                  color,
                  path: [newSVGPath],
                  data: [path],
                  thickness,
                  opacity,
                  combine: combineWithLatestPath,
                  filled,
                  cap,
                  join,
                },
              ];
            }

            const lastPath = prev[prev.length - 1];

            // Check if the last path has the same properties
            if (
              lastPath.color === color &&
              lastPath.thickness === thickness &&
              lastPath.opacity === opacity
            ) {
              lastPath.path = [...lastPath.path!, newSVGPath];
              lastPath.data = [...lastPath.data, path];

              return [...prev.slice(0, -1), lastPath];
            }

            return [
              ...prev,
              {
                color,
                path: [newSVGPath],
                data: [path],
                thickness,
                opacity,
                combine: combineWithLatestPath,
                filled,
                cap,
                join,
              },
            ];
          });
          setPath([]);
        }
      }
    };

    return (
      <Animated.View style={canvasContainerStyles}>
        <PanGestureHandler
          maxPointers={1}
          minDist={0}
          avgTouches={false}
          onHandlerStateChange={onHandlerStateChange}
          onGestureEvent={onGestureEvent}
          hitSlop={{
            // @ts-ignore
            height: Number.isFinite(height) ? height : undefined,
            width: Number.isFinite(width) ? width : undefined,
            top: 0,
            left: 0,
          }}
          shouldCancelWhenOutside
          enabled={!touchDisabled}
        >
          <View>
            <RendererHelper
              currentPath={path}
              currentColor={color}
              currentThickness={thickness}
              currentOpacity={opacity}
              currentFilled={filled}
              currentCap={cap}
              currentJoin={join}
              currentPathTolerance={
                simplifyOptions.simplifyCurrentPath
                  ? simplifyOptions.amount!
                  : 0
              }
              shareStrokeProperties={shareStrokeProperties}
              roundPoints={simplifyOptions.roundPoints!}
              paths={paths}
              height={height}
              width={width}
              Renderer={SVGRenderer}
            />
          </View>
        </PanGestureHandler>
      </Animated.View>
    );
  }
);

const styles = StyleSheet.create({
  canvas: {
    backgroundColor: 'white',
  },
});

export default SVGCanvas;
