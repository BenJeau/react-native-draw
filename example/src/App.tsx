import React from 'react';
import { Draw } from '@benjeau/react-native-draw';
import { StatusBar } from 'react-native';

export default () => {
  return (
    <>
      <StatusBar translucent backgroundColor="#00000050" animated />
      <Draw width={300} height={500} initialColor="#AB88F2" />
    </>
  );
};
