import type { PathType } from './types';

/**
 * Helper function to serialize a path
 *
 * @param d Path to be drawn
 * @param stroke Color of the path
 * @param strokeWidth Width of the path
 * @param strokeOpacity Opacity of the path
 * @returns String representation of the SVG path
 */
const serializePath = (
  d: string,
  stroke: string,
  strokeWidth: number,
  strokeOpacity: number
) =>
  `<path d="${d}" stroke="${stroke}" stroke-width="${strokeWidth}" opacity="${strokeOpacity}" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;

/**
 * Helper function to serialize paths into a multiple SVG paths
 *
 * @param p Path to be drawn
 * @returns Multiple SVG paths
 */
const separatePaths = (p: PathType) =>
  p.path!.reduce(
    (acc, innerPath) =>
      `${acc}${serializePath(innerPath, p.color, p.thickness, p.opacity)}`,
    ''
  );

/**
 * Helper function to serialize paths into a single SVG path
 *
 * @param p Path to be drawn
 * @returns A single SVG path
 */
const combinedPath = (p: PathType) =>
  `${serializePath(p.path!.join(' '), p.color, p.thickness, p.opacity)}`;

/**
 * Helper function for canvases to generate the SVG from the paths
 *
 * @param paths Paths to convert to SVG
 * @param width Width of the canvas (SVG)
 * @param height Height of the canvas (SVG)
 * @returns String representation of the SVG
 */
export const getSvgHelper = (
  paths: PathType[],
  width: number | string,
  height: number | string
) => {
  const serializedPaths = paths.reduce(
    (acc, p) => `${acc}${p.combine ? combinedPath(p) : separatePaths(p)}`,
    ''
  );

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${serializedPaths}</svg>`;
};
