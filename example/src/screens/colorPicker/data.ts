import { ColorPickerProps, DEFAULT_COLORS } from '@benjeau/react-native-draw';

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
        description: 'Drawing component with default props',
        props: {
          color: DEFAULT_COLORS[0][0][0],
          onColorChange: () => {},
        },
      },
    ],
  },
];

export default data;
