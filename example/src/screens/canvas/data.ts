import type { CanvasProps } from '@benjeau/react-native-draw';
import { ToastAndroid } from 'react-native';

interface Data {
  name: string;
  data: {
    description: string;
    props?: CanvasProps;
  }[];
}

const data: Data[] = [
  {
    name: '',
    data: [
      {
        description: 'Drawing component with default props',
      },
    ],
  },
  {
    name: 'height/width',
    data: [
      {
        description: 'Custom canvas size',
        props: {
          height: 500,
          width: 300,
        },
      },
    ],
  },
  {
    name: 'simplifyOptions',
    data: [
      {
        description: 'Disable SVG simplification',
        props: {
          simplifyOptions: {
            simplifyPaths: false,
          },
        },
      },
      {
        description: 'Custom simplification amount',
        props: {
          simplifyOptions: {
            amount: 200,
          },
        },
      },
      {
        description: 'Live SVG path simplification',
        props: {
          simplifyOptions: {
            simplifyCurrentPath: true,
          },
        },
      },
      {
        description: 'Enable float numbers in points of paths',
        props: {
          simplifyOptions: {
            roundPoints: false,
          },
        },
      },
    ],
  },
  {
    name: 'onPathsChange',
    data: [
      {
        description:
          'Subscribe to changes to the paths (see console logs or Toasts on Android)',
        props: {
          onPathsChange(e) {
            console.log(e);
            ToastAndroid.show(
              'Number of paths ' + e.length.toString(),
              ToastAndroid.SHORT
            );
          },
        },
      },
    ],
  },
  {
    name: 'initialValues',
    data: [
      {
        description:
          'Initial brush color, size, and opacity with an initial drawing',
        props: {
          initialPaths: [
            {
              color: '#F42C1B',
              data: [
                [
                  [59, 119],
                  [59, 161],
                  [59, 171],
                  [59, 182],
                  [59, 194],
                  [60, 208],
                  [60, 222],
                  [60, 237],
                  [62, 252],
                  [62, 269],
                  [62, 284],
                  [62, 300],
                  [62, 314],
                  [62, 327],
                  [62, 347],
                  [62, 354],
                  [62, 359],
                  [62, 367],
                  [62, 368],
                ],
                [
                  [59, 251],
                  [83, 251],
                  [89, 251],
                  [98, 251],
                  [105, 251],
                  [111, 251],
                  [116, 251],
                  [123, 253],
                  [128, 253],
                  [135, 253],
                  [141, 253],
                  [141, 253],
                  [144, 253],
                ],
                [
                  [147, 105],
                  [143, 139],
                  [143, 163],
                  [143, 176],
                  [143, 189],
                  [143, 203],
                  [143, 218],
                  [143, 233],
                  [143, 248],
                  [143, 262],
                  [145, 278],
                  [147, 304],
                  [149, 325],
                  [150, 333],
                  [151, 345],
                  [151, 349],
                  [151, 352],
                  [152, 354],
                  [152, 355],
                  [153, 356],
                  [154, 358],
                  [154, 358],
                ],
                [
                  [228, 236],
                  [226, 246],
                  [225, 251],
                  [223, 258],
                  [222, 264],
                  [222, 272],
                  [220, 280],
                  [219, 288],
                  [219, 298],
                  [219, 306],
                  [219, 315],
                  [221, 322],
                  [222, 329],
                  [224, 336],
                  [228, 342],
                  [237, 352],
                  [242, 356],
                  [251, 361],
                  [256, 361],
                  [259, 363],
                  [262, 363],
                  [265, 363],
                  [268, 363],
                  [268, 363],
                ],
                [
                  [241, 172],
                  [239, 178],
                  [234, 181],
                  [231, 182],
                  [229, 184],
                  [226, 183],
                  [224, 183],
                  [218, 182],
                  [216, 177],
                  [216, 169],
                  [216, 164],
                  [218, 160],
                  [220, 156],
                  [223, 153],
                  [227, 150],
                  [232, 150],
                  [237, 149],
                  [241, 149],
                  [245, 149],
                  [249, 152],
                  [251, 154],
                  [251, 160],
                  [251, 166],
                ],
              ],
              thickness: 20,
              opacity: 1,
            },
            {
              color: '#4897FA',
              data: [
                [
                  [72, 407],
                  [128, 402],
                  [165, 398],
                  [187, 396],
                  [207, 395],
                  [227, 394],
                  [249, 394],
                  [269, 394],
                  [287, 394],
                  [306, 394],
                  [319, 394],
                  [331, 394],
                  [339, 394],
                  [349, 394],
                  [350, 395],
                  [345, 397],
                  [333, 398],
                  [302, 403],
                  [284, 405],
                  [265, 408],
                  [242, 412],
                  [217, 416],
                  [195, 418],
                  [176, 421],
                  [143, 425],
                  [133, 428],
                  [126, 430],
                  [128, 432],
                  [150, 438],
                  [189, 442],
                  [242, 448],
                  [271, 453],
                  [284, 455],
                ],
              ],
              thickness: 15,
              opacity: 0.6,
            },
          ],
        },
      },
    ],
  },
];

export default data;
