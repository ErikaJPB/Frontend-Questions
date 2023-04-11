/* These are custom implementations of the built-in JavaScript methods `call`, `apply`, and `bind` for
the `Function` prototype. */

/* `Function.prototype.myCall` is a custom implementation of the built-in `call` method for the
`Function` prototype in JavaScript. It allows you to call a function with a specific `this` context
and any number of arguments passed as individual arguments. */
Function.prototype.myCall = function (thisContext, ...args) {
  const symbol = Symbol();

  thisContext[symbol] = this;
  const value = thisContext[symbol](...args);
  delete thisContext[symbol];
  return value;
};

/* `Function.prototype.myApply` is a custom implementation of the built-in `apply` method for the
`Function` prototype. It takes two arguments: `thisContext` which is the context in which the
function should be called, and `args` which is an optional array of arguments to be passed to the
function. */
Function.prototype.myApply = function (thisContext, args = []) {
  return this.myCall(thisContext, ...args);
};

/* `Function.prototype.myBind` is a custom implementation of the built-in `bind` method for the
`Function` prototype. It returns a new function that, when called, will have its `this` value set to
`thisContext` and will have the arguments passed to `myBind` concatenated with the arguments passed
to the new function. This is achieved by returning an arrow function that calls `myApply` with
`thisContext` as the context and the concatenated arguments as the arguments. */
Function.prototype.myBind = function (thisContext, ...args) {
  return (...newArgs) => this.myApply(thisContext, [...args, ...newArgs]);
};
