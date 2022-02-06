import { DrawingTool } from './types';

const grayscale = [
  [
    '#010101',
    '#151515',
    '#2A2A2A',
    '#3E3E3E',
    '#535353',
    '#666666',
    '#7A7A7A',
    '#8F8F8F',
    '#A3A3A3',
    '#B8B8B8',
    '#CCCCCC',
    '#FFFFFF',
  ],
];

const colors = [
  [
    '#457429',
    '#696F1C',
    '#6B6414',
    '#8C6115',
    '#8D5014',
    '#89280C',
    '#81090A',
    '#95133F',
    '#8204A6',
    '#3704AB',
    '#003389',
    '#0086AB',
  ],
  [
    '#75BD4F',
    '#B5C835',
    '#C1BB2C',
    '#FFC934',
    '#FFAA2E',
    '#FF6924',
    '#F42C1B',
    '#DB4575',
    '#B644D0',
    '#7A4DD9',
    '#0063FA',
    '#00C7FC',
  ],
  [
    '#A9D78A',
    '#E7F169',
    '#FFF755',
    '#FFD367',
    '#FFBE61',
    '#FF8F5B',
    '#FF6252',
    '#EC86A8',
    '#CE82E8',
    '#AB88F2',
    '#4897FA',
    '#5ADDFC',
  ],
  [
    '#D6EFC3',
    '#F8FAB0',
    '#FFFA9E',
    '#FFE7AD',
    '#FFD9AC',
    '#FFC0A9',
    '#FFA9A7',
    '#FDC2D7',
    '#EDC1F9',
    '#D1C4F8',
    '#A2C4FB',
    '#AFEBFE',
  ],
];

export const DEFAULT_COLORS = [colors, grayscale];
export const DEFAULT_THICKNESS = 3;
export const DEFAULT_OPACITY = 1;
export const DEFAULT_TOOL = DrawingTool.Brush;
export const DEFAULT_BRUSH_PREVIEW = 'stroke';
export const DEFAULT_OPACITY_STEP = 0.1;
export const DEFAULT_THICKNESS_MIN = 5;
export const DEFAULT_THICKNESS_MAX = 35;
export const DEFAULT_THICKNESS_STEP = 1;
export const DEFAULT_SLIDER_COLOR = '#000';
export const DEFAULT_DELETE_BUTTON_COLOR = '#81090A';
export const DEFAULT_OTHER_BUTTONS_COLOR = '#DDD';
export const SLIDERS_HEIGHT = 80;
