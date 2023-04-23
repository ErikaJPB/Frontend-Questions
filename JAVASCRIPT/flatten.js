/**
 * The function flattens an object or array into a single-level object.
 * @param value - The input value that needs to be flattened. It can be an object or an array.
 * @returns The `flatten` function is returning either the original `value` if it is not an object or
 * if it is null, or it is calling either `flattenArray` or `flattenObject` functions depending on
 * whether the `value` is an array or an object, respectively. However, the implementation of
 * `flattenArray` and `flattenObject` functions is not provided in the code snippet.
 */
function flatten(value) {
  if (typeof value !== "object" || !value) {
    return value;
  }
  if (Array.isArray(value)) {
    return flattenArray(value);
  }

  return flattenObject(value);
}

/**
 * The function flattens a nested array into a single-dimensional array.
 * @param array - The input array that needs to be flattened.
 * @returns The function `flattenArray` is returning the flattened version of the input `array`. It
 * uses the `reduce` method to iterate over each element of the array and concatenate it with the
 * flattened version of any nested arrays using recursion. The final result is a one-dimensional array
 * with all the elements of the original array and any nested arrays.
 */
function flattenArray(array) {
  return array.reduce((acc, val) => {
    return acc.concat(flatten(val));
  }, []);
}

/**
 * The function flattens a nested object into a single-level object.
 * @param object - The input object that needs to be flattened.
 * @returns a flattened version of the input object.
 */
function flattenObject(object) {
  let flattenedObj = {};

  for (const key in object) {
    const value = object[key];
    const flattendedValue = flatten(value);

    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      flattenedObj = { ...flattenedObj, ...flattendedValue };
    } else {
      flattenedObj[key] = flattendedValue;
    }
  }

  return flattenedObj;
}
