import type { CanvasControlsProps } from '@benjeau/react-native-draw-extras';

interface Data {
  name: string;
  data: {
    description: string;
    props?: CanvasControlsProps;
  }[];
}

const data: Data[] = [
  {
    name: '',
    data: [
      {
        description:
          'CanvasControls component with default props (will render nothing)',
      },
      {
        description:
          'CanvasControls component with undo and brushProperties callback props',
        props: {
          onUndo: () => {},
          onToggleBrushProperties: () => {},
          color: '#09F',
          thickness: 1,
          opacity: 1,
        },
      },
      {
        description: 'CanvasControls component with every prop',
        props: {
          onUndo: () => {},
          onClear: () => {},
          onToggleEraser: () => {},
          onToggleBrushProperties: () => {},
          color: '#0A3FA9',
          thickness: 10,
          opacity: 1,
        },
      },
    ],
  },
];

export default data;
