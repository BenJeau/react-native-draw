export const isBright = (color: string): boolean => {
  let rgb: number[] = [];

  if (color[0] === '#') {
    if (color.length === 7) {
      rgb = [
        parseInt(color.substr(1, 2), 16),
        parseInt(color.substr(3, 2), 16),
        parseInt(color.substr(5, 2), 16),
      ];
    } else if (color.length === 4) {
      return isBright(
        `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`
      );
    }
  }

  if (rgb.length === 0) {
    return false;
  }

  // http://www.w3.org/TR/AERT#color-contrast
  const brightness = Math.round(
    (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000
  );

  return brightness > 125;
};
