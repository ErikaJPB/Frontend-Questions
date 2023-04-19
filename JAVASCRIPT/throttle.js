/**
 * The function `throttle` returns a new function that limits the rate at which a given callback
 * function can be called.
 * @param callback - The function that needs to be throttled. It will be called at most once per every
 * `delay` milliseconds.
 * @param delay - The time in milliseconds that the function should be throttled for. This means that
 * the function will only be called once every `delay` milliseconds, even if it is triggered multiple
 * times within that time period.
 * @returns The function `throttle` is returning a new function `throttledFunction` that will execute
 * the original `callback` function with a delay of `delay` milliseconds between each call. The
 * returned function also has a `cancel` method that can be used to cancel any pending execution of the
 * `callback` function.
 */

function throttle(callback, delay) {
  let timeoutId;
  let lastTime = 0;

  function throttledFunction(...args) {
    const now = Date.now();
    const timeSinceLast = now - lastTime;
    const remaining = delay - timeSinceLast;

    if (remaining <= 0) {
      lastTime = now;
      callback.apply(this, args);
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        lastTime = Date.now();
        callback.apply(this, args);
      }, remaining);
    }
  }

  throttledFunction.cancel = () => {
    clearTimeout(timeoutId);
  };

  return throttledFunction;
}
