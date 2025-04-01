
/**
 * Calculates mouse position for parallax effects
 */
export const calculateMousePosition = (e: MouseEvent | React.MouseEvent, intensity = 0.05) => {
  const x = (window.innerWidth / 2 - e.clientX) * intensity;
  const y = (window.innerHeight / 2 - e.clientY) * intensity;
  return { x, y };
};

/**
 * Calculates scroll progress
 */
export const calculateScrollProgress = (): number => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.offsetHeight - window.innerHeight;
  return scrollTop / docHeight || 0;
};

/**
 * Determines if an element is in viewport
 */
export const isInViewport = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );
};

/**
 * Creates a staggered animation delay
 * @param index Element index
 * @param baseDelay Base delay in ms
 * @returns CSS delay value
 */
export const getStaggeredDelay = (index: number, baseDelay = 100): string => {
  return `${index * baseDelay}ms`;
};

/**
 * Generates a random number between min and max
 */
export const random = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
