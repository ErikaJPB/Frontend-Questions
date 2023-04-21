/* This code is adding custom methods to the Promise object in JavaScript. */

/* `Promise.myRace` is a custom method being added to the Promise object in JavaScript. It takes an
array of promises as an argument and returns a new promise that resolves or rejects as soon as one
of the promises in the array resolves or rejects. It achieves this by iterating over the promises
array and attaching a `then` method to each promise that resolves or rejects the new promise based
on the resolution or rejection of the original promise. */
Promise.myRace = function (promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      promise.then(resolve, reject);
    });
  });
};

/* `Promise.myAny` is a custom method being added to the Promise object in JavaScript. It takes an
array of promises as an argument and returns a new promise that resolves as soon as one of the
promises in the array resolves, or rejects if all of the promises in the array reject. It achieves
this by iterating over the promises array and attaching a `then` method to each promise that
resolves the new promise as soon as the original promise resolves, or catches any rejections and
keeps track of the number of rejected promises. If all promises are rejected, it rejects the new
promise with the message "all promises rejected". */
Promise.myAny = function (promises) {
  return new Promise((resolve, reject) => {
    let rejectedCount = 0;
    promises.forEach((promise) => {
      promise.then(resolve).catch(() => {
        rejectedCount++;
        if (rejectedCount === promises.length) {
          reject("all promises rejected");
        }
      });
    });
  });
};

/* `Promise.myAll` is a custom method being added to the Promise object in JavaScript. It takes an
array of promises as an argument and returns a new promise that resolves with an array of all the
resolved values of the original promises, in the same order as the original promises. If any of the
original promises reject, the new promise is rejected with the same reason. */
Promise.myAll = function (promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let resolvedCount = 0;
    promises.forEach((promise, index) => {
      promise
        .then((value) => {
          results[index] = value;
          resolvedCount++;
          if (resolvedCount === promises.length) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
};

/* `Promise.myAllSettled` is a custom method being added to the Promise object in JavaScript. It takes
an array of promises as an argument and returns a new promise that resolves with an array of objects
representing the status of each promise in the original array. Each object has a `status` property
that is either "fulfilled" or "rejected", and a `value` or `error` property that contains the
resolved value or rejection reason of the corresponding promise. */
Promise.myAllSettled = function (promises) {
  return new Promise((resolve) => {
    const results = [];
    let settledCount = 0;

    promises.forEach((promise, index) => {
      promise
        .then((value) => {
          results[index] = { status: "fulfilled", value };
        })
        .catch((error) => {
          results[index] = { status: "rejected", error };
        })
        .finally(() => {
          settledCount++;

          if (settledCount === promises.length) {
            resolve(results);
          }
        });
    });
  });
};
