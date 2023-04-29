/**
 * The function `memoize` takes a callback function and a resolver function, and returns a memoized
 * version of the callback function that caches its results based on the arguments passed to it.
 * @param callback - The function that will be memoized. It takes some input arguments and returns a
 * result.
 * @param resolver - An optional function that takes in the same arguments as the original callback
 * function and returns a unique key that will be used to store and retrieve the result of the callback
 * function from the cache. If no resolver function is provided, the arguments will be converted to a
 * JSON string and used as the cache key.
 * @returns The `memoize` function is returning a memoized version of the original `callback` function.
 * The memoized function caches the results of previous calls to the `callback` function and returns
 * the cached result if the same arguments are passed in again. The memoized function also has
 * additional methods `clear`, `delete`, and `has` to manipulate the cache.
 */
function memoize(callback, resolver) {
  const cache = new Map();

  function memoized(...args) {
    const key = resolver ? resolver(...args) : JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = callback(...args);
    cache.set(key, result);
    return result;
  }

  memoized.clear = () => cache.clear();
  memoized.delete = (...args) =>
    cache.delete(resolver ? resolver(...args) : JSON.stringify(args));
  memoized.has = (...args) =>
    cache.has(resolver ? resolver(...args) : JSON.stringify(...args));
  return memoized;
}
