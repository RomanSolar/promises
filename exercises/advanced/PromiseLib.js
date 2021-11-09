/**
 * Return a function that wraps `nodeStyleFn`. When the returned function is invoked,
 * it will return a promise which will be resolved or rejected, depending on
 * the execution of the now-wrapped `nodeStyleFn`
 *
 * In other words:
 *   - If `nodeStyleFn` succeeds, the promise should be resolved with its results
 *   - If nodeStyleFn fails, the promise should be rejected with the error
 *
 * Because the returned function returns a promise, it does and should not
 * expect a callback function as one of its arguments
 */

var promisify = function(nodeStyleFn) {
  return (...args) => new Promise((resolve, reject) =>
    nodeStyleFn(...args, (err, res) => err ? reject(err) : resolve(res))
  );
};


/**
 * Given an array which contains promises, return a promise that is
 * resolved if and when all the items in the array are resolved.
 *
 * The promise's resolve value should be an array that maps to the
 * respective positions in the original array of promises.
 *
 * If any promise in the array rejects, the returned promise
 * is rejected with the rejection reason.
 */

var all = function(arrayOfPromises) {
  return new Promise((resolve, reject) => {
    const outputs = [];
    let successes = 0;
    let failed = false;
    let len = arrayOfPromises.length;
    for (let i = 0; i < len; i++) {
      const promise = arrayOfPromises[i];
      promise
        .then(output => {
          if (!failed) {
            outputs[i] = output;
            if (++successes === len) {
              resolve(outputs);
            }
          }
        })
        .catch(err => {
          failed = true;
          reject(err);
        });
    }
  });
};


/**
 * Given an array of promises, return a promise that is resolved or rejected,
 * resolving with whatever the resolved value or rejection reason was from
 * the first to be resolved/rejected promise in the passed-in array
 */

var race = function(arrayOfPromises) {
  return new Promise((resolve, reject) => {
    let done = false;
    const ifNotDone = (input) => (output) => {
      if (!done) {
        done = true;
        input(output);
      }
    };
    for (const promise of arrayOfPromises) {
      promise
        .then(ifNotDone(resolve))
        .catch(ifNotDone(reject));
    }
  });
};

// Export these functions so we can unit test them
module.exports = {
  all: all,
  race: race,
  promisify: promisify
};
