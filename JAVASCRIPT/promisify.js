/**
 * The function "promisify" converts a callback-based function into a Promise-based function.
 * @param callback - The callback parameter is a function that takes in some arguments and a callback
 * function as its last parameter. The callback function is called with an error object (if any) as its
 * first parameter and the result value (if any) as its second parameter.
 * @returns A function that wraps the original callback function and returns a promise.
 */
function promisify(callback) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function handleErrorAndValue(error, value) {
        if (error === null) {
          resolve(value);
        } else {
          reject(error);
        }
      }
      callback.call(this, ...args, handleErrorAndValue);
    });
  };
}
