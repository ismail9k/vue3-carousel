/**
 * return a debounced version of the function
 * @param fn
 * @param delay
 */
export function debounce(fn: (...args: any[]) => unknown, delay: number): typeof fn {
  let timerId: ReturnType<typeof setTimeout> | null;
  return function (...args: any[]) {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn(...args);
      timerId = null;
    }, delay);
  };
}

/**
 * return a throttle version of the function
* Throttling
*
*/
export function throttle(fn: (...args: any[]) => unknown, limit: number): typeof fn {
  let inThrottle: boolean;
  return function (...args: any[]) {
    const self = this;
    if (!inThrottle) {
      fn.apply(self, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
