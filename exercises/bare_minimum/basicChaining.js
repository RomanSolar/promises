/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs/promises');
var request = require('needle');

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return fs.readFile(readFilePath, 'utf8')
    .then(user => request('get', 'https://api.github.com/users/' + user.split(/[\r\n]/, 1)[0]))
    .then(res => fs.writeFile(writeFilePath, JSON.stringify(res.body)));
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
