var fs = require('fs');
var data = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
var state={}

state.options = data.Options;
state.progressions = []
delete data.Options;

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
