import React, { useRef } from 'react';
import { Button } from 'react-native';
import { Canvas, CanvasRef } from '@benjeau/react-native-draw';

export default () => {
  const canvasRef = useRef<CanvasRef>(null);

  const handleUndo = () => {
    canvasRef.current?.undo();
  };

  const handleClear = () => {
    canvasRef.current?.clear();
  };

  return (
    <>
      <Canvas
        ref={canvasRef}
        height={600}
        color="red"
        thickness={20}
        opacity={0.6}
        style={{ backgroundColor: 'black' }}
      />
      <Button title="Undo" onPress={handleUndo} />
      <Button title="Clear" onPress={handleClear} />
    </>
  );
};
