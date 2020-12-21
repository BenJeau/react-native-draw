import React from 'react';
import { Draw } from '@benjeau/react-native-draw';
import { StatusBar } from 'react-native';

export default () => {
  return (
    <>
      <StatusBar translucent backgroundColor="#00000050" animated />
      <Draw />
    </>
  );
};
