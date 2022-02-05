import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {
  Animated,
  Dimensions,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
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
  DEFAULT_THICKNESS,
  DEFAULT_TOOL,
} from '../../constants';
import { DrawingTool, PathDataType, PathType } from '../../types';
import { createSVGPath } from './utils';
import SVGRenderer from './renderer/SVGRenderer';
import RendererHelper from './renderer/RendererHelper';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export interface CanvasProps {
  /**
   * Color of the brush strokes
   * @default DEFAULT_BRUSH_COLOR
   */
  color?: string;

  /**
   * Thickness of the brush strokes
   * @default DEFAULT_THICKNESS
   */
  thickness?: number;

  /**
   * Opacity of the brush strokes
   * @default DEFAULT_OPACITY
   */
  opacity?: number;

  /**
   * Paths to be already drawn
   * @default []
   */
  initialPaths?: PathType[];

  /**
   * Height of the canvas
   */
  height?: number;

  /**
   * Width of the canvas
   */
  width?: number;

  /**
   * Override the style of the container of the canvas
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Callback function when paths change
   */
  onPathsChange?: (paths: PathType[]) => any;

  /**
   * SVG simplification options
   */
  simplifyOptions?: SimplifyOptions;

  /**
   * Width of eraser (to compensate for path simplification)
   * @default DEFAULT_ERASER_SIZE
   */
  eraserSize?: number;

  /**
   * Initial tool of the canvas
   * @default DEFAULT_TOOL
   */
  tool?: DrawingTool;

  /**
   * Combine current path with the last path if it's the same color,
   * thickness, and opacity.
   *
   * **Note**: changing this value while drawing will only be effective
   * on the next change to opacity, thickness, or color change
   * @default false
   */
  combineWithLatestPath?: boolean;
}

export interface SimplifyOptions {
  /**
   * Enable SVG path simplification on paths, except the one currently being drawn
   */
  simplifyPaths?: boolean;

  /**
   * Enable SVG path simplification on the stroke being drawn
   */
  simplifyCurrentPath?: boolean;

  /**
   * Amount of simplification to apply
   */
  amount?: number;

  /**
   * Ignore fractional part in the points. Improves performance
   */
  roundPoints?: boolean;
}

export interface CanvasRef {
  /**
   * Undo last brush stroke
   */
  undo: () => void;

  /**
   * Removes all brush strokes
   */
  clear: () => void;

  /**
   * Get brush strokes data
   */
  getPaths: () => PathType[];

  /**
   * Append a path to the current drawing paths
   * @param path Path to append/draw
   */
  addPath: (path: PathType) => void;

  /**
   * Get SVG path string of the drawing
   */
  getSvg: () => string;
}

/**
 * Generate SVG path string. Helper method for createSVGPath
 *
 * @param paths SVG path data
 * @param simplifyOptions Simplification options for the SVG drawing simplification
 * @returns SVG path strings
 */
const generateSVGPath = (
  path: PathDataType,
  simplifyOptions: SimplifyOptions
) =>
  createSVGPath(
    path,
    simplifyOptions.simplifyPaths ? simplifyOptions.amount! : 0,
    simplifyOptions.roundPoints!
  );

/**
 * Generate multiple SVG path strings. If the path string is already defined, do not create a new one.
 *
 * @param paths SVG data paths
 * @param simplifyOptions Simplification options for the SVG drawing simplification
 * @returns An array of SVG path strings
 */
const generateSVGPaths = (
  paths: PathType[],
  simplifyOptions: SimplifyOptions
) =>
  paths.map((i) => ({
    ...i,
    path: i.path
      ? i.path
      : i.data.reduce(
          (acc: string[], data) => [
            ...acc,
            generateSVGPath(data, simplifyOptions),
          ],
          []
        ),
  }));

const Canvas = forwardRef<CanvasRef, CanvasProps>(
  (
    {
      color = DEFAULT_BRUSH_COLOR,
      thickness = DEFAULT_THICKNESS,
      opacity = DEFAULT_OPACITY,
      initialPaths = [],
      style,
      height = screenHeight - 80,
      width = screenWidth,
      simplifyOptions = {},
      onPathsChange,
      eraserSize = DEFAULT_ERASER_SIZE,
      tool = DEFAULT_TOOL,
      combineWithLatestPath = false,
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
      generateSVGPaths(initialPaths, simplifyOptions)
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

    const getSvg = () => {
      const serializePath = (
        d: string,
        stroke: string,
        strokeWidth: number,
        strokeOpacity: number
      ) =>
        `<path d="${d}" stroke="${stroke}" stroke-width="${strokeWidth}" opacity="${strokeOpacity}" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;

      const separatePaths = (p: PathType) =>
        p.path!.reduce(
          (acc, innerPath) =>
            `${acc}${serializePath(
              innerPath,
              p.color,
              p.thickness,
              p.opacity
            )}`,
          ''
        );

      const combinedPath = (p: PathType) =>
        `${serializePath(p.path!.join(' '), p.color, p.thickness, p.opacity)}`;

      const serializedPaths = paths.reduce(
        (acc, p) => `${acc}${p.combine ? combinedPath(p) : separatePaths(p)}`,
        ''
      );

      return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${serializedPaths}</svg>`;
    };

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
            const newSVGPath = generateSVGPath(path, simplifyOptions);

            if (prev.length === 0) {
              return [
                {
                  color,
                  path: [newSVGPath],
                  data: [path],
                  thickness,
                  opacity,
                  combine: combineWithLatestPath,
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
            height,
            width,
            top: 0,
            left: 0,
          }}
          shouldCancelWhenOutside
        >
          <View>
            <RendererHelper
              currentColor={color}
              currentOpacity={opacity}
              currentPath={path}
              currentThickness={thickness}
              currentPathTolerance={
                simplifyOptions.simplifyCurrentPath
                  ? simplifyOptions.amount!
                  : 0
              }
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
  canvasOverlay: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: '#000000',
  },
});

export default Canvas;
