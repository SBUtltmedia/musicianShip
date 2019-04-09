var fs = require('fs');
var data = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
var state = {}

state.options = data.options;
state.progressions = data.progressions;

state.testResults = "Hello. "

// checkTheWholeFile()

// function checkTheWholeFile(){
  // index that keeps track of how many errors
  var numberOfErrors = 0
// for every one of the items in .progressions
for (i in data.progressions) {
  // loop in their .chords array
  var currentChords = i.chords;
  // for each item in .chords, check its "symbol" key
  for (each in currentChords) {
    // make sure that the "symbol" vaule exists in state.options
    var currentSymbol = each.symbol
    if (SymbolIsInOptions(currentSymbol, state.options) = false) {
      numberOfErrors ++;
      state.testResults += String("Inconsistency Found In the following Progression:"+String(i))
      console.log("Inconsistency Found In the following Progression:", i)
    }
  }
}

      state.testResults += (String("total error found:" + String(numberOfErrors)))
      // console.log("total error found:", numberOfErrors)
      // console.log(JSON.stringify(state));

// }

// this function checks that "symbol" exists as a value in the optionsArray
// return false if it cannot find the symbol among any value
function SymbolIsInOptions(symbol, optionsArray) {
  var IsInOptions = false
  IsInOptions = optionsArray.includes(symbol)
  return IsInOptions

}

console.log(JSON.stringify(state.testResults));

// To run this, type:
// node checkProgressionForCoherency.js ../../data/505progressions-03.json >> testResults.json
// and check the testResults.json file
