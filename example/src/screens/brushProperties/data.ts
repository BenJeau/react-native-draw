import {
  BrushPropertiesProps,
  DEFAULT_COLORS,
} from '@benjeau/react-native-draw-extras';

interface Data {
  name: string;
  data: {
    description: string;
    props?: BrushPropertiesProps;
  }[];
}

const data: Data[] = [
  {
    name: '',
    data: [
      {
        description:
          'BrushProperties component with default props (will render only the color picker)',
        props: {
          color: DEFAULT_COLORS[0][0][0],
          onColorChange: () => {},
        },
      },
      {
        description:
          'BrushProperties component with thickness and opacity props',
        props: {
          color: DEFAULT_COLORS[0][0][0],
          onColorChange: () => {},
          thickness: 6,
          opacity: 0.4,
          onThicknessChange: () => {},
          onOpacityChange: () => {},
        },
      },
      {
        description: 'BrushProperties component with different slider color',
        props: {
          color: DEFAULT_COLORS[0][0][0],
          onColorChange: () => {},
          thickness: 6,
          opacity: 0.4,
          onThicknessChange: () => {},
          onOpacityChange: () => {},
          sliderColor: '#FF0000',
        },
      },
    ],
  },
];

export default data;
