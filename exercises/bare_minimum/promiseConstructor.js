/**
 * Implement these promise-returning functions.
 * Any successful value should be made available in the next `then` block chained
 * to the function invocation, while errors should be available in the `catch` block
 */

var fs = require('fs/promises');
var request = require('needle');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFileAsync = function(filePath) {
  return fs.readFile(filePath, 'utf8')
    .then(data => data.split(/[\r\n]/, 1)[0]);
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCodeAsync = function(url) {
  return request('get', url)
    .then(res => res.statusCode);
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCodeAsync: getStatusCodeAsync,
  pluckFirstLineFromFileAsync: pluckFirstLineFromFileAsync
};
