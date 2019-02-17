'use strict'

function sort(input) {
  // return input.sort((a,b) => a-b); // Remove this line and change to your own algorithm
  let bigNumber;
  for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
      if (input[i] > input[j]) {
        bigNumber = input[i];
        input[i] = input[j];
        input[j] = bigNumber;
      }
    }
  }
  return input;
}

module.exports = sort
