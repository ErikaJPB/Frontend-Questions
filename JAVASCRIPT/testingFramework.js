/**
 * The function `describe` takes in a test suite name and a function, runs the function as a test
 * suite, and logs whether the suite was successfully completed or if there was an error.
 * @param testSuiteName - A string that represents the name of the test suite being described.
 * @param func - The `func` parameter is a function that contains a series of test cases to be executed
 * within the `describe` function. It is typically defined using the `it` or `test` functions, which
 * contain individual test cases with assertions to check the expected behavior of the code being
 * tested.
 */
function describe(testSuiteName, func) {
  // Write your code here.
  console.log(`beginning test suite ${testSuiteName}`);

  try {
    func();
    console.log(`successfully completed test suite ${testSuiteName}`);
  } catch (error) {
    const { testCaseName, errorMessage } = error;
    console.error(
      `failed running test suite ${testSuiteName} on ` +
        `test case ${testCaseName} with error message ${errorMessage}`
    );
  }
}

/**
 * The function "it" is a testing helper that logs the beginning and successful completion of a test
 * case, and throws an error if the test case fails.
 * @param testCaseName - A string that describes the test case being run. It is used for logging and
 * error reporting purposes.
 * @param func - `func` is a parameter that represents a function that will be tested in the `it`
 * function. This function will be executed when the `it` function is called.
 */
function it(testCaseName, func) {
  // Write your code here.
  console.log(`beginning test case ${testCaseName}`);

  try {
    func();
    console.log(`successfully completed test case ${testCaseName}`);
  } catch (errorMessage) {
    throw { testCaseName, errorMessage };
  }
}

/**
 * The function creates an instance of ExpectFunctions with a given actual value.
 * @param actual - The value that is being tested or checked against an expected value.
 * @returns A new instance of the ExpectFunctions class with the actual value passed as an argument.
 */
function expect(actual) {
  // Write your code here.
  return new ExpectFunctions(actual);
}

/* The ExpectFunctions class provides methods for checking the existence, equality, and type of a
 given value. */
class ExpectFunctions {
  constructor(actual) {
    this.actual = actual;
    this.stringifiedActual = JSON.stringify(actual);
  }

  toExist() {
    if (this.actual == null) {
      throw `expected value to exist but got ${this.stringifiedActual}`;
    }
  }

  toBe(expected) {
    if (this.actual !== expected) {
      throw `expected ${this.stringifiedActual} to be ${JSON.stringify(
        expected
      )}`;
    }
  }

  toBeType(type) {
    if (typeof this.actual !== type) {
      throw `expected ${
        this.stringifiedActual
      } to be of type ${type} but got ${typeof this.actual}`;
    }
  }
}
