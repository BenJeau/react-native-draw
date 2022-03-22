import type { IPaint, IPath, PaintStyle } from '@shopify/react-native-skia';
import type { PathDataType } from '@benjeau/react-native-draw-core';

/**
 * Custom Skia path to contain more information about the path
 */
export interface SkiaPath {
  path: IPath; // TODO: support multiple paths
  paint: IPaint;
  style: PaintStyle;
  data: PathDataType; // TODO: support multiple paths
}
