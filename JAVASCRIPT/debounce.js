/**
 * This is a debounce function in JavaScript that delays the execution of a callback function until a
 * certain amount of time has passed without the function being called again.
 * @param callback - The function that needs to be debounced.
 * @param delay - The delay parameter is the time in milliseconds that the debounce function will wait
 * before executing the callback function. It determines how long the function should wait for
 * additional calls before executing the callback function.
 * @param [immediate=false] - A boolean value that determines whether the callback function should be
 * called immediately or after the delay time has passed. If set to true, the callback function will be
 * called immediately and then wait for the delay time before being called again. If set to false
 * (default), the callback function will only be called after
 * @returns A function that will debounce the provided callback function by delaying its execution by
 * the specified delay time. If the `immediate` parameter is set to `true`, the callback function will
 * be executed immediately on the first call, and then debounced for subsequent calls.
 */
function debounce(callback, delay, immediate = false) {
  let timerID;

  return function (...args) {
    clearTimeout(timerID);
    const shouldCallImmediately = !timerID && immediate;
    if (shouldCallImmediately) {
      callback.apply(this, args);
    }

    timerID = setTimeout(() => {
      if (!immediate) {
        callback.apply(this, args);
      }
      timerID = null;
    }, delay);
  };
}
