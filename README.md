# @benjeau/react-native-draw

[![NPM badge](https://img.shields.io/npm/v/@benjeau/react-native-draw)](https://www.npmjs.com/package/@benjeau/react-native-draw) [![CircleCI Status](https://img.shields.io/circleci/build/gh/BenJeau/react-native-draw)](https://app.circleci.com/pipelines/github/BenJeau/react-native-draw) ![Platform badge](https://img.shields.io/badge/platform-android%20%7C%20ios%20%7C%20web-blue)

Cross-platform React Native drawing component based on SVG

> Note: This should technically work on Android, iOS and potentially the web, but I only tested it on Android

![Drawing Example](assets/drawingExample.gif)

Example application with React Native performance overlay

## Installation

```sh
npm install @benjeau/react-native-draw
# or
yarn add @benjeau/react-native-draw
```

> Also, you need to install [react-native-gesture-handler](https://github.com/software-mansion/react-native-gesture-handler), [@react-native-community/slider](https://github.com/callstack/react-native-slider) and [react-native-svg](https://github.com/react-native-svg/react-native-svg), and follow their installation instructions.

## Usage

```tsx
import React from 'react';
import { Draw, DrawRef } from "@benjeau/react-native-draw";

export default function App() {
  const drawRef = useRef<DrawRef>(null);

  const removeLastPath = () {
    drawRef.current.?undo();
  }

  const clearDrawing = () {
    drawRef.current.?clear();
  }

  // ... for more ref functions, look below

  return (
    <Draw
      ref={drawRef}
      initialThickness={20}
      initialOpacity={0.5}
      initialDrawing ={[]}
      canvasContainerStyle={{ elevation: 0, backgroundColor: "red" }}
    />
  )
}
```

## Props

**None** of the following props are required

| name | description  | type | default |
| --- | --- | --- | --- |
| `colors` | Color palette colors, specifying the color palette sections each containing rows of colors | `string[][][]` |  [`DEFAULT_COLORS`](./src/constants.ts) |
| `height` | Height of the canvas | `number` | height of the window - 80 |
| `width` | Width of the canvas | `number` | width of the window |
| `initialColor` | Initial brush color, from the colors provided | `string` | the first color of the first row in the first section from `colors` |
| `initialThickness` | Initial thickness of the brush strokes | `number` |  `3` |
| `initialOpacity` | Initial opacity of the brush strokes | `number` |  `1` |
| `initialDrawing` | Paths to be already drawn | `PathType[]` |  `[]` |
| `brushPreview` | Change brush preview preset or remove it | `'stroke' | 'dot' | 'none'` | `stroke` |
| `canvasContainerStyle` | Override the style of the container of the canvas | `StyleProp` | - |
| `onPathsChange` | Callback function when paths change | (paths: [`PathType`](./src/types)[]) => any | - |

## Ref

| name | description | type |
| --- | --- | --- |
| `undo` | Undo last brush stroke | `() => void` |
| `clear` | Removes all brush strokes | `() => void` |
| `getPaths` | Get brush strokes data | `() => PathType[]` |
| `addPath` | Append a path to the current drawing paths | `(path: PathType) => void` |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
