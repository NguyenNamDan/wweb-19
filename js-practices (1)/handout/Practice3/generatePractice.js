'use strict'

function generate(testLengthArray){
  return Array.from({length : testLengthArray.length})
    .map(item => ({
      input: Array.from({length: item}).map(item => []),
      target: 0,
      output: -1  
    })
  ); // Remove this line and change to your own algorithm
} 
// em ko làm đc bài này ạ huhuh :v 

module.exports = generate
