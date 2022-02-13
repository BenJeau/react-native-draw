# React Native Draw

![Platform badge](https://img.shields.io/badge/platform-android%20%7C%20ios%20%7C%20web-blue)  [![CircleCI Status](https://img.shields.io/circleci/build/gh/BenJeau/react-native-draw)](https://app.circleci.com/pipelines/github/BenJeau/react-native-draw)

A cross-platform drawing component for React Native with the option of using SVG or Skia.

> **Note:** if you are currently using `@benjeau/react-native-draw` as a dependency, please migrate to either [`@benjeau/react-native-draw-svg`](./packages/svg) or [`@benjeau/react-native-draw-skia`](./packages/skia). It should be a drop-in replacement (depending on the version that you are using), please read the [release notes](https://github.com/BenJeau/react-native-draw/releases) for more information.

## Packages

| Name                                                      | Latest Version                                                                                                                              | Description                                                                                                       |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| [`@benjeau/react-native-draw-core`](./packages/core)      | [![badge](https://img.shields.io/npm/v/@benjeau/react-native-draw-core)](https://www.npmjs.com/package/@benjeau/react-native-draw-core)     | Shared package between `Canvas` implementation (only need to install it to create a new `Canvas` implementation)  |
| [`@benjeau/react-native-draw-svg`](./packages/svg)        | [![badge](https://img.shields.io/npm/v/@benjeau/react-native-draw-svg)](https://www.npmjs.com/package/@benjeau/react-native-draw-svg)       | Cross-platform React Native drawing `Canvas` component based on SVG                                               |  |
| [`@benjeau/react-native-draw-skia`](./packages/skia)      | [![badge](https://img.shields.io/npm/v/@benjeau/react-native-draw-skia)](https://www.npmjs.com/package/@benjeau/react-native-draw-skia)     | Cross-platform React Native drawing `Canvas` component based on Skia                                              |
| [`@benjeau/react-native-draw-extras`](./packages/extras/) | [![badge](https://img.shields.io/npm/v/@benjeau/react-native-draw-extras)](https://www.npmjs.com/package/@benjeau/react-native-draw-extras) | Extra components to complement `Canvas` (e.g. `CanvasControls`, `BrushPreview`, `BrushProperties`, `ColorPicker`) |

## `Canvas` props and ref functions

The following props and ref are shared between all `Canvas` implementations ([`@benjeau/react-native-draw-svg`](./packages/svg) and [`@benjeau/react-native-draw-skia`](./packages/skia)):

> **Note**: implementations of `Canvas` may have additional props

### Props

| name                    | description                                                                                                 | type                          | default                   |
| ----------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------- | ------------------------- |
| `color`                 | Color of the brush strokes                                                                                  | `string`                      | - (required)              |
| `thickness`             | Thickness of the brush strokes                                                                              | `number`                      | - (required)              |
| `opacity`               | Opacity of the brush strokes                                                                                | `number`                      | - (required)              |
| `filled`                | Whether the path is filled or not                                                                           | `boolean`                     | `false`                   |
| `cap`                   | The cap of the stroke, shape to be used at the end of open sub paths                                        | `butt` or `round` or `square` | `round`                   |
| `join`                  | The join of the stroke, shape to be used at the corners of paths                                            | `bevel` or `miter` or `round` | `round`                   |
| `initialPaths`          | Paths to be already drawn                                                                                   | `PathType[]`                  | `[]`                      |
| `height`                | Height of the canvas                                                                                        | `number`                      | height of the window - 80 |
| `width`                 | Width of the canvas                                                                                         | `number`                      | width of the window       |
| `style`                 | Override the style of the container of the canvas                                                           | `StyleProp`                   | -                         |
| `onPathsChange`         | Callback function when paths change                                                                         | `(paths: PathType) => any`    | -                         |
| `eraserSize`            | Width of eraser (to compensate for path simplification)                                                     | `number`                      | `5`                       |
| `tool`                  | Initial tool of the canvas                                                                                  | `brush` or `eraser`           | `brush`                   |
| `combineWithLatestPath` | Combine current path with the last path if it's the same color, thickness, and opacity                      | `boolean`                     | `false`                   |
| `shareStrokeProperties` | Make all the strokes on the canvas share the same properties (color, thickness, opacity, filled, cap, join) | `boolean`                     | `false`                   |
| `touchDisabled`         | Disable touch events on the canvas                                                                          | `boolean`                     | `false`                   |

### Ref functions

| name       | description                                        | type                          |
| ---------- | -------------------------------------------------- | ----------------------------- |
| `undo`     | Undo last brush stroke                             | `() => void`                  |
| `clear`    | Remove all brush strokes                           | `() => void`                  |
| `getPaths` | Get brush strokes data                             | `() => PathType[]`            |
| `addPath`  | Append a path to the current drawing paths         | `(path: PathType) => void`    |
| `addPaths` | Append multiple paths to the current drawing paths | `(paths: PathType[]) => void` |
| `setPaths` | Replace current drawing paths with new ones        | `(paths: PathType[]) => void` |
| `getSvg`   | Get SVG path string of the drawing                 | `() => string`                |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
