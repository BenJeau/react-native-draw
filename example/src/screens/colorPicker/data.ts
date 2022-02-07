import {
  ColorPickerProps,
  DEFAULT_COLORS,
} from '@benjeau/react-native-draw-extras';

interface Data {
  name: string;
  data: {
    description: string;
    props?: ColorPickerProps;
  }[];
}

const data: Data[] = [
  {
    name: '',
    data: [
      {
        description: 'ColorPicker component with default props',
        props: {
          color: DEFAULT_COLORS[0][0][0],
          onColorChange: () => {},
        },
      },
      {
        description:
          'ColorPicker component with different colors and multiple sections',
        props: {
          color: '#457429',
          onColorChange: () => {},
          colors: [
            [['#457429', '#696F1C', '#6B6414', '#8C6115']],
            [['#FFC0A9', '#FFA9A7', '#FDC2D7', '#EDC1F9']],
            [['#DB4575', '#B644D0', '#7A4DD9', '#0063FA']],
            [['#010101', '#151515', '#2A2A2A', '#3E3E3E']],
          ],
        },
      },
      {
        description:
          'ColorPicker component with different colors and one section',
        props: {
          color: '#FFA9A7',
          onColorChange: () => {},
          colors: [
            [
              ['#457429', '#696F1C', '#6B6414', '#8C6115'],
              ['#FFC0A9', '#FFA9A7', '#FDC2D7', '#EDC1F9'],
              ['#DB4575', '#B644D0', '#7A4DD9', '#0063FA'],
              ['#010101', '#151515', '#2A2A2A', '#3E3E3E'],
            ],
          ],
        },
      },
    ],
  },
];

export default data;
