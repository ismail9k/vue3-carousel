/**
 * debounce function
 * @param fn
 * @param delay
 */
export function debounce(fn: Function, delay: number) {
  let timerId: number | null;
  return function(...args: Array<any>) {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn(...args);
      timerId = null;
    }, delay);
  };
}
