# @benjeau/react-native-draw

Cross-platform React Native drawing component based on SVG

![Drawing Example](assets/drawingExample.gif)

Example application with React Native performance overlay

## Installation

```sh
npm install @benjeau/react-native-draw
# or
yarn add @benjeau/react-native-draw
```

Also, you need to install [react-native-gesture-handler](https://github.com/software-mansion/react-native-gesture-handler), [@react-native-community/slider](https://github.com/callstack/react-native-slider) and [react-native-svg](https://github.com/react-native-svg/react-native-svg), and follow their installation instructions.

## Usage

```jsx
import React from 'react';
import Draw from "@benjeau/react-native-draw";

export default function App() {
  return (
    <Draw
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
| `colors` | Color palette colors, specifying the color palette sections each containing rows of colors | `string[][][]` |  `[DEFAULT_COLORS](./src/constants.ts)` |
| `initialThickness` | Initial thickness of the brush strokes | `number` |  `3` |
| `initialOpacity` | Initial opacity of the brush strokes | `number` |  `1` |
| `initialDrawing` | Paths to be already drawn | `PathType[]` |  `[]` |
| `canvasContainerStyle` | Override the style of the container of the canvas | `StyleProp` | |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
