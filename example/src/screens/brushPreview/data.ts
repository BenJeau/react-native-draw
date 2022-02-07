import type { BrushPreviewProps } from '@benjeau/react-native-draw-extras';

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
        description: 'BrushPreview component as a stroke',
        props: {
          color: '#0000A3',
          thickness: 10,
          opacity: 1,
          brushPreview: 'stroke',
        },
      },
      {
        description: 'BrushPreview component as dot',
        props: {
          color: '#000000',
          thickness: 10,
          opacity: 1,
          brushPreview: 'dot',
        },
      },
    ],
  },
];

export default data;
