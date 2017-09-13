export interface ScrollPosition {
  scrollDistance: number;
  viewportHeight: number;
  targetDistance: number;
  offsetHeight: number;
};

export const DEFAULT_SCROLL_POSITION: ScrollPosition = {
  scrollDistance: 0,
  viewportHeight: 0,
  targetDistance: 0,
  offsetHeight: 0,
};