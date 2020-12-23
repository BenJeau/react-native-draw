import { Navigation } from 'react-native-navigation';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import type { DrawProps } from '@benjeau/react-native-draw';

import * as Screens from './screens';

export const pushScreen = (
  name: string,
  componentId: string,
  passProps?: DrawProps
) => {
  Navigation.push(componentId, {
    component: {
      name,
      options: {
        statusBar: {
          animated: true,
          style: 'dark',
          backgroundColor: '#00000000',
          drawBehind: true,
        },
      },
      passProps,
    },
  });
};

export const registerScreens = () => {
  Object.keys(Screens).forEach((i) => {
    // @ts-ignore
    Navigation.registerComponent(i, () => gestureHandlerRootHOC(Screens[i]));
  });

  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                name: 'Home',
                options: {
                  statusBar: {
                    animated: true,
                    style: 'dark',
                    backgroundColor: '#eee',
                  },
                },
              },
            },
          ],
          options: {
            topBar: {
              visible: false,
            },
            navigationBar: {
              backgroundColor: '#eeeeee',
            },
            layout: {
              backgroundColor: '#eee',
            },
            animations: {
              push: {
                content: {
                  translationX: {
                    from: 200,
                    to: 0,
                    interpolation: {
                      type: 'spring',
                    },
                  },
                  alpha: {
                    from: 0.4,
                    to: 1,
                  },
                },
              },
              pop: {
                content: {
                  scaleX: {
                    from: 1,
                    to: 0.8,
                    interpolation: {
                      type: 'spring',
                    },
                  },
                  scaleY: {
                    from: 1,
                    to: 0.8,
                    interpolation: {
                      type: 'spring',
                    },
                  },
                  alpha: {
                    from: 1,
                    to: 0,
                    interpolation: {
                      type: 'spring',
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  });
};
