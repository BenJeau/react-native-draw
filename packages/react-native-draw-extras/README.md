# @benjeau/react-native-draw-extras

[![NPM badge](https://img.shields.io/npm/v/@benjeau/react-native-draw-extras)](https://www.npmjs.com/package/@benjeau/react-native-draw-extras) [![CircleCI Status](https://img.shields.io/circleci/build/gh/BenJeau/react-native-draw)](https://app.circleci.com/pipelines/github/BenJeau/react-native-draw) ![Platform badge](https://img.shields.io/badge/platform-android%20%7C%20ios%20%7C%20web-blue)

Extra components to complement [@benjeau/react-native-draw](https://github.com/BenJeau/react-native-draw):

* `CanvasControls`
  * Clear drawing
  * Undo last path
  * Includes the `BrushPreview` component
  * Toggle between drawing and erasing
  * Toggle visibility of `BrushProperties`
* `BrushPreview`
  * Displays an SVG preview of the stroke (color, thickness, opacity)
* `BrushProperties`
  * Includes the `ColorPicker` component
  * Slider to change brush opacity
  * Slider to change brush size
* `ColorPicker`
  * Grid of color where the user can select a color

## Installation

```sh
npm install @benjeau/react-native-draw-extras
# or
yarn add @benjeau/react-native-draw-extras
```

> Also, you need to install [@react-native-community/slider](https://github.com/callstack/react-native-slider) and [react-native-svg](https://github.com/react-native-svg/react-native-svg), and follow their installation instructions.

## Example

Please see the [example](../../example/) Expo application showcasing the components

## Props

### CanvasControls

Contains all the props of [BrushProperties](#brushproperties) and the following:

| name                      | description                                          | type                   | default   |
| ------------------------- | ---------------------------------------------------- | ---------------------- | --------- |
| `onClear`                 | Callback when the clear button is pressed            | `() => void`           | -         |
| `onUndo`                  | Callback when the undo button is pressed             | `() => void`           | -         |
| `onToggleEraser`          | Callback when the eraser button is pressed           | `() => void`           | -         |
| `onToggleBrushProperties` | Callback when the brush properties button is pressed | `() => void`           | -         |
| `buttonStyle`             | Override the style of the buttons                    | `StyleProp<ViewStyle>` | -         |
| `tool`                    | Initial tool of the canvas                           | `brush` or `eraser`    | -         |
| `deleteButtonColor`       | Delete button color                                  | `string`               | `#81090A` |
| `otherButtonsColor`       | Other buttons color (undo and eraser mode toggle)    | `string`               | `#DDD`    |

### BrushPreview

| name           | description                                           | type                        | default      |
| -------------- | ----------------------------------------------------- | --------------------------- | ------------ |
| `color`        | Color of the brush strokes                            | `string`                    | - (required) |
| `thickness`    | Thickness of the brush strokes                        | `number`                    | - (required) |
| `opacity`      | Opacity of the brush strokes                          | `number`                    | - (required) |
| `brushPreview` | Brush preview preset, for different kinds of previews | `stroke` or `dot` or `none` | - (required) |

### BrushProperties

Contains all the props of [ColorPicker](#colorpicker) and the following:

| name                | description                                                                                         | type                             | default |
| ------------------- | --------------------------------------------------------------------------------------------------- | -------------------------------- | ------- |
| `thickness`         | Thickness of the brush strokes                                                                      | `number`                         | `3`     |
| `opacity`           | Opacity of the brush strokes                                                                        | `number`                         | `1`     |
| `onThicknessChange` | Callback when brush size is changed via the slider                                                  | `(newThickness: number) => void` | -       |
| `onOpacityChange`   | Callback when brush opacity is changed via the slider                                               | `(newOpacity: number) => void`   | -       |
| `opacityStep`       | Step value of the opacity slider, should be between 0 and 1                                         | `number`                         | `0.1`   |
| `thicknessMin`      | Minimum value of the thickness slider                                                               | `number`                         | `5`     |
| `thicknessMax`      | Maximum value of the thickness slider                                                               | `number`                         | `35`    |
| `thicknessStep`     | Step value of the thickness slider, should be between `props.thicknessMin` and `props.thicknessMax` | `number`                         | `1`     |
| `sliderColor`       | Slider color                                                                                        | `string`                         | `#000`  |
| `style`             | Style of the container                                                                              | `StyleProp<ViewStyle>`           | -       |

### ColorPicker

| name            | description                                                                                                                                                                                    | type                         | default                                |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | -------------------------------------- |
| `color`         | Brush color, one from the colors provided                                                                                                                                                      | `string`                     | - (required)                           |
| `onColorChange` | Callback when a color is selected                                                                                                                                                              | `(newColor: string) => void` | - (required)                           |
| `colors`        | Color picker colors, specifying the color picker sections each containing rows of colors. First array defines the sections, second one defines the rows, and the last one defines the columns. | `string[][][]`               | [`DEFAULT_COLORS`](./src/constants.ts) |
| `style`         | Style of the container                                                                                                                                                                         | `StyleProp<ViewStyle>`       | -                                      |

## Helper functions

* If you want to know if a color is bright or not, `isBright()` is available to detect if a HEX color is bright or dark.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT