/**
 * The `curry` function returns a curried version of a given callback function.
 * @param callback - The `callback` parameter is a function that will be curried. It can take any
 * number of arguments.
 * @returns The `curried` function is being returned.
 */
function curry(callback) {
  const curried = (...args) => {
    if (args.length === 0) {
      return callback();
    }

    return (...otherArgs) => {
      if (otherArgs.length === 0) {
        return callback(...args);
      }

      return curried(...args, ...otherArgs);
    };
  };
  return curried;
}

//This code is creating a function called curry that takes a callback function as an argument. "curry" returns a new function that accepts one or more arguments. If the new function receives no arguments, it immediately invokes callback and returns its result. If it receives one or more arguments, it returns a new function that accepts more arguments, and so on, until all arguments have been collected and callback is finally invoked with all of them. This is a technique called "currying" that allows you to create new functions from existing ones by partial application of arguments.
