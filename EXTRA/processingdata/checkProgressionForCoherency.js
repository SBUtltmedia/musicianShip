var fs = require('fs');
var data = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
var state = {}

state.options = data.options;
state.progressions = data.progressions;



func checkTheWholeFile(){
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
      console.log("Inconsistency Found In the following Progression:", i)
    }
  }
}

      console.log("total error found:", numberOfErrors)

}

// this function checks that "symbol" exists as a value in the optionsArray
// return false if it cannot find the symbol among any value
func SymbolIsInOptions(symbol, optionsArray) {
  var IsInOptions = false
  IsInOptions = optionsArray.includes(symbol)
  return IsInOptions

}
console.log(JSON.stringify(state));
