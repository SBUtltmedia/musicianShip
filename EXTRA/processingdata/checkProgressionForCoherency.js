var fs = require('fs');
var data = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
var state={}

state.options = data.options;
state.progressions = data.progressions;

// for every one of the items in .progressions
for (i in data.progressions) {
  // loop in their .chords array
  var currentChords= i.chords;
  // for each item in .chords, check its "symbol" key
for (each in currentChords) {
  // make sure that the "symbol" vaule exists in state.options
   var currentSymbol = each.symbol
  if (SymbolIsInOptions(currentSymbol) = false) {

  }
}
}

func SymbolIsInOptions(symbol){

}
  console.log(JSON.stringify(state));
