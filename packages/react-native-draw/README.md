# @benjeau/react-native-draw

[![NPM badge](https://img.shields.io/npm/v/@benjeau/react-native-draw)](https://www.npmjs.com/package/@benjeau/react-native-draw) [![CircleCI Status](https://img.shields.io/circleci/build/gh/BenJeau/react-native-draw)](https://app.circleci.com/pipelines/github/BenJeau/react-native-draw) ![Platform badge](https://img.shields.io/badge/platform-android%20%7C%20ios%20%7C%20web-blue)

Cross-platform React Native drawing component based on SVG

## Installation

```sh
npm install @benjeau/react-native-draw
# or
yarn add @benjeau/react-native-draw
```

> Also, you need to install [react-native-gesture-handler](https://github.com/software-mansion/react-native-gesture-handler) and [react-native-svg](https://github.com/react-native-svg/react-native-svg), and follow their installation instructions.

## Usage

> All the following examples are also available in the [example](./example/) Expo application

### Simple example

Here's the most simple example:

```tsx
import React from 'react';
import { Canvas } from '@benjeau/react-native-draw';

export default () => <Canvas />;
```

https://user-images.githubusercontent.com/22248828/152287845-d5d2dea0-7f7e-430b-bbfd-1769aca8af11.mp4

### Complex example

Here's a more complex example:

<details>
  <summary>Complex example - Code snippet</summary>

```tsx
import React, { useRef } from 'react';
import { Button } from 'react-native';
import { Canvas, CanvasRef } from '@benjeau/react-native-draw';

export default () => {
  const canvasRef = useRef<CanvasRef>(null);

  const handleUndo = () => {
    canvasRef.current?.undo();
  };

  const handleClear = () => {
    canvasRef.current?.clear();
  };

  return (
    <>
      <Canvas
        ref={canvasRef}
        height={600}
        color="red"
        thickness={20}
        opacity={0.6}
        style={{ backgroundColor: 'black' }}
      />
      <Button title="Undo" onPress={handleUndo} />
      <Button title="Clear" onPress={handleClear} />
    </>
  );
};
```
</details>

https://user-images.githubusercontent.com/22248828/152287758-95089f75-2b9e-4807-b7a3-a03654acf7ac.mp4

### Example with `@BenJeau/react-native-draw-extras`

This uses the `@BenJeau/react-native-draw-extras` npm package for the color picker and the bottom buttons/brush preview.

> As this package does not depend on `@BenJeau/react-native-draw-extras`, it is completely optional and you can build your own supporting UI, just like the previous example

<details>
  <summary>Extras example - Code snippet</summary>

```tsx
import React, { useRef, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import {
  BrushProperties,
  Canvas,
  CanvasControls,
  CanvasRef,
  DEFAULT_COLORS,
  DrawingTool,
} from '@benjeau/react-native-draw';

export default () => {
  const canvasRef = useRef<CanvasRef>(null);

  const [color, setColor] = useState(DEFAULT_COLORS[0][0][0]);
  const [thickness, setThickness] = useState(5);
  const [opacity, setOpacity] = useState(1);
  const [tool, setTool] = useState(DrawingTool.Brush);
  const [visibleBrushProperties, setVisibleBrushProperties] = useState(false);

  const handleUndo = () => {
    canvasRef.current?.undo();
  };

  const handleClear = () => {
    canvasRef.current?.clear();
  };

  const handleToggleEraser = () => {
    setTool((prev) =>
      prev === DrawingTool.Brush ? DrawingTool.Eraser : DrawingTool.Brush
    );
  };

  const [overlayOpacity] = useState(new Animated.Value(0));
  const handleToggleBrushProperties = () => {
    if (!visibleBrushProperties) {
      setVisibleBrushProperties(true);

      Animated.timing(overlayOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setVisibleBrushProperties(false);
      });
    }
  };

  return (
    <>
      <Canvas
        ref={canvasRef}
        height={600}
        color={color}
        thickness={thickness}
        opacity={opacity}
        tool={tool}
        style={{
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderColor: '#ccc',
        }}
      />
      <View>
        <CanvasControls
          onUndo={handleUndo}
          onClear={handleClear}
          onToggleEraser={handleToggleEraser}
          onToggleBrushProperties={handleToggleBrushProperties}
          tool={tool}
          color={color}
          opacity={opacity}
          thickness={thickness}
        />
        {visibleBrushProperties && (
          <BrushProperties
            color={color}
            thickness={thickness}
            opacity={opacity}
            onColorChange={setColor}
            onThicknessChange={setThickness}
            onOpacityChange={setOpacity}
            style={{
              position: 'absolute',
              bottom: 80,
              left: 0,
              right: 0,
              padding: 10,
              backgroundColor: '#f2f2f2',
              borderTopEndRadius: 10,
              borderTopStartRadius: 10,
              borderWidth: StyleSheet.hairlineWidth,
              borderBottomWidth: 0,
              borderTopColor: '#ccc',
              opacity: overlayOpacity,
            }}
          />
        )}
      </View>
    </>
  );
};
```
</details>

https://user-images.githubusercontent.com/22248828/152296353-4512848a-c39b-4ef0-930b-c65a7010e2db.mp4

## Props

### Canvas

| name                    | description                                                                            | type                                           | default                       |
| ----------------------- | -------------------------------------------------------------------------------------- | ---------------------------------------------- | ----------------------------- |
| `color`                 | Color of the brush strokes                                                             | `string`                                       | - (required)                  |
| `thickness`             | Thickness of the brush strokes                                                         | `number`                                       | - (required)                  |
| `opacity`               | Opacity of the brush strokes                                                           | `number`                                       | - (required)                  |
| `initialPaths`          | Paths to be already drawn                                                              | `PathType[]`                                   | `[]`                          |
| `height`                | Height of the canvas                                                                   | `number`                                       | height of the window - 80     |
| `width`                 | Width of the canvas                                                                    | `number`                                       | width of the window           |
| `style`                 | Override the style of the container of the canvas                                      | `StyleProp`                                    | -                             |
| `onPathsChange`         | Callback function when paths change                                                    | (paths: [`PathType`](./src/types.ts)[]) => any | -                             |
| `simplifyOptions`       | SVG simplification options                                                             | [`SimplifyOptions`](./src/Draw.tsx)            | see [below](#SimplifyOptions) |
| `eraserSize`            | Width of eraser (to compensate for path simplification)                                | `number`                                       | `5`                           |
| `tool`                  | Initial tool of the canvas                                                             | `brush` or `eraser`                            | `brush`                       |
| `combineWithLatestPath` | Combine current path with the last path if it's the same color, thickness, and opacity | `boolean`                                      | `false`                       |

### SimplifyOptions

| name                  | description                                                                   | type      | default |
| --------------------- | ----------------------------------------------------------------------------- | --------- | ------- |
| `simplifyPaths`       | Enable SVG path simplification on paths, except the one currently being drawn | `boolean` | `true`  |
| `simplifyCurrentPath` | Enable SVG path simplification on the stroke being drawn                      | `boolean` | `false` |
| `amount`              | Amount of simplification to apply                                             | `number`  | `10`    |
| `roundPoints`         | Ignore fractional part in the points. Improves performance                    | `boolean` | `true`  |

## Ref functions

| name       | description                                | type                       |
| ---------- | ------------------------------------------ | -------------------------- |
| `undo`     | Undo last brush stroke                     | `() => void`               |
| `clear`    | Removes all brush strokes                  | `() => void`               |
| `getPaths` | Get brush strokes data                     | `() => PathType[]`         |
| `addPath`  | Append a path to the current drawing paths | `(path: PathType) => void` |
| `getSvg`   | Get SVG path string of the drawing         | `() => string`             |

## Troubleshooting

If you cannot draw on the canvas, make sure you have followed the extra steps of [react-native-gesture-handler](https://github.com/software-mansion/react-native-gesture-handler)

## Helper functions

* If you need to create an SVG path, `createSVGPath()` is available to create the string representation of an SVG path.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
