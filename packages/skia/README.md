# `@benjeau/react-native-draw-skia`

[![NPM badge](https://img.shields.io/npm/v/@benjeau/react-native-draw-skia)](https://www.npmjs.com/package/@benjeau/react-native-draw-skia)

Cross-platform React Native drawing `Canvas` component based on Skia

## Installation

```sh
npm install @benjeau/react-native-draw-skia
# or
yarn add @benjeau/react-native-draw-skia
```

> Also, you need to install [react-native-skia](https://github.com/Shopify/react-native-skia) and follow their installation instructions.

### Extras

Supporting components, such as `CanvasControls`, `BrushPreview`, `ColorPicker` and `BrushProperties` components, are available as a separate package, [`@benjeau/react-native-draw-extras`](https://github.com/BenJeau/react-native-draw/tree/master/packages/react-native-draw-extras)

## Props

### `Canvas`

In addition to the standard [`Canvas` props](../../README.md#Props), the following props are also available for the SVG `Canvas`

| name              | description                                                                                   | type      | default   |
| ----------------- | --------------------------------------------------------------------------------------------- | --------- | --------- |
| `debug`           | When set to true the view will display information about the average time it takes to render. | `boolean` | `false`   |
| `backgroundColor` | Background color of the canvas                                                                | `string`  | `#FFFFFF` |
