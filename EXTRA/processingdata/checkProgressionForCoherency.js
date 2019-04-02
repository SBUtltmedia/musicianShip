var fs = require('fs');
var data = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
var state={}

state.options = data.options;
state.progressions = data.progressions;

// for every one of the items in .progressions
// loop in their .chords array
// for each item in .chords, check its "symbol" key
// make sure that the "symbol" vaule exists in state.options
for (i in data) {

var newChords= [];

  for (j in data[i].chords){
var newChord={}

newChord.symbol =data[i].chords[j]
newChord.notes=data[i].notes[j]

newChords.push(newChord);
}
newChords.chords=newChord;
state.progressions.push({key:data[i].key,chords:newChords});
}
  console.log(JSON.stringify(state));
