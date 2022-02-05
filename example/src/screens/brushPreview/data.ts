import type { BrushPreviewProps } from '@benjeau/react-native-draw';

interface Data {
  name: string;
  data: {
    description: string;
    props?: BrushPreviewProps;
  }[];
}

const data: Data[] = [
  {
    name: '',
    data: [
      {
        description: 'Drawing component with default props',
        props: {
          color: '#000000',
          thickness: 1,
          opacity: 1,
          brushPreview: 'stroke',
        },
      },
    ],
  },
];

export default data;
