import type { CanvasControlsProps } from '@benjeau/react-native-draw';

interface Data {
  name: string;
  data: {
    description: string;
    props?: CanvasControlsProps;
  }[];
}

const data: Data[] = [];

export default data;
