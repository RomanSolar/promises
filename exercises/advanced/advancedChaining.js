/**
 * Your task is to write a function that uses a deep learning
 * algorithm to determine the common set of concepts between
 * multiple github profile pictures
 *
 * Given an array of github handles, searchCommonConceptsFromGitHubProfiles should:
 *   1) get the public profile associated with each handle
 *   2) extract the avatar_url of each profile
 *   4) get the set of concepts for each avatar_url (requires API key)
 *   5) find the intersection of the concepts
 *
 * Much of the heavy lifting has been done already in `lib/advancedChainingHelpers`,
 * you just have to wire everything up together! Once you pass this one, you'll
 * be a promise chaining master! Have fun!
 */

var lib = require('../../lib/advancedChainingLib');

// We're using Clarifai's API to recognize concepts in an image into a list of concepts
// Visit the following url to sign up for a free account
//     https://portal.clarifai.com/signup
// Once you're in, create a new application on your Clarifai User Dashboard. Clarifai will
// automatically generate an API key which you can find by opening up the new
// application tile.  Accept the default 'all scopes' setting for the key or modify it
// to give it the `Predict on Public and Custom Models` scope. When your key
// is ready, copy and add it to the `advancedChainingLib.js` file.

const intersection = function (arrays) {
  if (arrays.length === 0) {
    return new Set();
  }
  const sets = arrays.map(array => new Set(array));
  return Array.from(sets.pop()).filter(item => sets.every(set => set.has(item)));
};

var searchCommonConceptsFromGitHubProfiles = function (githubHandles) {
  return Promise.all(githubHandles.map(user =>
    lib.getGitHubProfile(user)
      .then(profile => lib.predictImage(profile.avatarUrl))
  )).then(intersection);
};

// Export these functions so we can unit test them
module.exports = {
  searchCommonConceptsFromGitHubProfiles,
};
