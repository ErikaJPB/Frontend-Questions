/* This code is creating a new method called `myMap` on the `Array` prototype. This method takes a
callback function as an argument and returns a new array with the results of calling the callback
function on each element of the original array. The callback function takes three arguments: the
current element, its index, and the original array. The `for` loop iterates over each element of the
original array, calls the callback function on it, and pushes the result to the new array. Finally,
the new array is returned. */
Array.prototype.myMap = function (callback) {
  const newArray = [];
  for (let i = 0; i < this.length; i++) {
    newArray.push(callback(this[i], i, this));
  }
  return newArray;
};

/* `Array.prototype.myFilter` is creating a new method on the `Array` prototype called `myFilter`. This
method takes a callback function as an argument and returns a new array with all the elements of the
original array that pass the test implemented by the provided callback function. The callback
function takes three arguments: the current element, its index, and the original array. The `for`
loop iterates over each element of the original array, calls the callback function on it, and if the
callback function returns `true`, the element is pushed to the new array. Finally, the new array is
returned. */
Array.prototype.myFilter = function (callback) {
  const newArray = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this) === true) {
      newArray.push(this[i]);
    }
  }
  return newArray;
};

/* `Array.prototype.myReduce` is creating a new method on the `Array` prototype called `myReduce`. This
method takes two arguments: a callback function and an optional initial value for the accumulator.
The callback function takes four arguments: the accumulator, the current element, its index, and the
original array. The method iterates over each element of the original array, and for each element,
it calls the callback function with the accumulator, the current element, its index, and the
original array as arguments. The result of the callback function is then assigned to the
accumulator. Finally, the method returns the accumulator. If an initial value is provided, it is
used as the initial value of the accumulator, otherwise the first element of the array is used as
the initial value. This method can be used to perform a variety of operations on an array, such as
summing its elements or concatenating its strings. */
Array.prototype.myReduce = function (callback, initialValue) {
  let accumulator = initialValue;
  for (let i = 0; i < this.length; i++) {
    if (i === 0 && initialValue === undefined) {
      accumulator = this[i];
    } else {
      accumulator = callback(accumulator, this[i], i, this);
    }
  }
  return accumulator;
};
