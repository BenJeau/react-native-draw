import React from 'react';
import { Draw } from '@benjeau/react-native-draw';
import { StatusBar } from 'react-native';

export default () => {
  return (
    <>
      <StatusBar translucent backgroundColor="#00000050" animated />
      <Draw
        width={300}
        height={500}
        initialValues={{ color: '#AB88F2', thickness: 15 }}
        canvasStyle={{
          borderRadius: 10,
          marginTop: 80,
        }}
        brushPreview="none"
        hideBottom={{ brushProperties: true, clear: true, undo: true }}
      />
    </>
  );
};
