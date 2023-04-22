/* `const state` is an object that defines three properties: `PENDING`, `FULFILLED`, and `REJECTED`.
These properties are used to represent the different states that a promise can be in. `PENDING`
represents the initial state of a promise, `FULFILLED` represents the state when a promise has been
successfully resolved, and `REJECTED` represents the state when a promise has been rejected or
encountered an error. These properties are used throughout the `MyPromise` class to keep track of
the state of the promise and determine what actions to take based on that state. */
const state = {
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
};

/* The above class is an implementation of a Promise in JavaScript with methods for resolving,
 rejecting, and chaining callbacks. */
class MyPromise {
  _state = state.PENDING;
  _value = null;
  _fulfilledCallbacks = [];
  _rejectedCallbacks = [];

  /**
   * This is a constructor function that takes an executor function as a parameter and tries to
   * execute it, resolving or rejecting the promise based on the outcome.
   * @param executorFunc - executorFunc is a function that takes two parameters, commonly referred to
   * as resolve and reject. These parameters are functions themselves that are used to either fulfill
   * or reject the promise. The executorFunc is called immediately when the promise is created and is
   * responsible for initiating the asynchronous operation that will eventually either resolve or
   * reject
   */
  constructor(executorFunc) {
    try {
      executorFunc(
        (value) => this._resolve(value),
        (value) => this._reject(value)
      );
    } catch (e) {
      this._reject(e);
    }
  }

  /**
   * This is a function that returns a new promise with callbacks for handling fulfillment and
   * rejection.
   * @param onFulfilled - A function that will be called if the promise is fulfilled. It takes the
   * fulfilled value as its argument and returns a new value or throws an error.
   * @param onRejected - A function that will be called if the promise is rejected. It takes one
   * argument, which is the reason for rejection.
   * @returns A new instance of the MyPromise class with the onFulfilled and onRejected callbacks
   * passed as arguments to the constructor.
   */
  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      /**
       * This is a fulfilled callback function that executes a provided function if a promise is
       * fulfilled.
       * @returns If `onFulfilled` is not defined, `resolve(this._value)` is being returned.
       */
      const fulfilledCallback = () => {
        if (!onFulfilled) return resolve(this._value);

        queueMicrotask(() => {
          try {
            const value = onFulfilled(this._value);
            resolve(value);
          } catch (e) {
            reject(e);
          }
        });
      };

      /**
       * This is a rejected callback function that handles errors in a Promise chain.
       * @returns If `onRejected` is not defined, `reject(this._value)` is being returned.
       */
      const rejectedCallback = () => {
        if (!onRejected) return reject(this._value);

        queueMicrotask(() => {
          try {
            const value = onRejected(this._value);
            resolve(value);
          } catch (e) {
            reject(e);
          }
        });
      };

      /* This code block is checking the current state of the promise (`this._state`) and taking
      different actions based on that state. */
      switch (this._state) {
        case state.PENDING:
          this._fulfilledCallbacks.push(fulfilledCallback);
          this._rejectedCallbacks.push(rejectedCallback);
          break;
        case state.FULFILLED:
          fulfilledCallback();
          break;
        case state.REJECTED:
          rejectedCallback();
          break;
        default:
          throw new Error("Invalid promise state");
      }
    });
  }
  /**
   * This is a method in JavaScript that allows for catching errors in a Promise chain.
   * @param onRejected - onRejected is a function that will be called if the Promise is rejected. It
   * takes one argument, which is the reason for the rejection (usually an error object). The catch
   * method is used to handle any errors that may occur during the execution of the Promise. If the
   * Promise is rejected, the catch
   * @returns A new promise is being returned that is rejected with the reason provided by the
   * onRejected function.
   */
  catch(onRejected) {
    return this.then(null, onRejected);
  }

  /**
   * This is a getter function that returns the value of the private variable "_state".
   * @returns The `state` property of an object is being returned. The value of the `state` property
   * is accessed through the getter method, which returns the value of the private `_state` property.
   */
  get state() {
    return this._state;
  }

  /**
   * This is a getter function that returns the value of a private variable named "_value".
   * @returns The `value` property of the object, which is stored in the `_value` variable.
   */
  get value() {
    return this._value;
  }

  /**
   * The above function resolves a promise with a given value and executes all fulfilled callbacks.
   * @param value - The value that the Promise is being resolved with. This value will be stored in
   * the Promise's internal state and will be passed as an argument to any callbacks registered with
   * the `then()` method.
   */
  _resolve(value) {
    this._value = value;
    this._state = state.FULFILLED;
    this._fulfilledCallbacks.forEach((cb) => cb());
  }

  /**
   * This is a function that sets the state of a promise to "rejected" and executes all the
   * registered callbacks for rejection.
   * @param value - The value that the Promise was rejected with.
   */
  _reject(value) {
    this._value = value;
    this._state = state.REJECTED;
    this._rejectedCallbacks.forEach((cb) => cb());
  }
}
