var sound
var spriteLength = 10000;

var octave = ["A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab"]
var sprite = {}
var keyArray = [];

for (i = 0; i < 88; i++) {

  //start on A0
  var oct = Math.floor((i + 9) / 12);
  //cycle note
  var note = octave[i % 12];
  sprite[oct + note] = [i * spriteLength, spriteLength]
  keyArray.push(oct + note)
  // # this creates a dictionnary notes in the format number+pitch,
  // # like {[0:0A],[1:7A], etc...}
  // var abs_note_i = (str(oct)+octave[note])
  // abs_note_dict[str(i)]= abs_note_i



}

// console.log(sprite)

// prepares the Howler.js backend and shows a loading screen
function makeHowl(){
//  The goal is to have the sprite as an object for which the keys are the notes and the values are the numbers for the position of the sprite
  sound = new Howl({
  autoplay: false,
  src: ['samples/output500.webm'],
  sprite: sprite

});

var loadingDiv = $("<div/>", {
  id: "loading"
}).append($("<div/>", {
  id: "loadingKeyboard"
}))

var loadingMessage = $("<div/>", {
  id: "loadingMessage"
});
loadingMessage.addClass("bg-square")
loadingMessage.addClass("textbox")
loadingMessage.append("<p>Loading...</p>")
loadingMessage.append("<p>(please wait)</p>")
loadingDiv.append(loadingMessage)

$('#stage').append(loadingDiv);
sound.on('load', function() {
loadingMessage.append("<p>Done!</p>")
$('#loading').hide(200);

});

}
function playChord(arr, duration = 1000, fadeDuration = 2000,callBack) {


  for (i of arr) {

    var mySound = i
    if (typeof i == 'number') {
      var mySound = keyArray[i]
    }

    var soundId=sound.play(mySound)

    // setTimeout(function() {

      sound.fade(1, 0, fadeDuration);
    // }, duration)

  }

  return sound;
}

//  This function takes an array of chords (array of arrays) and plays them with a delay
//  ex of input:  ( [["3C", "3E", "4C", "5C"],["3C", "3E", "4C", "5C"],["3C", "3E", "4C", "5C"]], 2000, 2000 )
// ex output: playing the chords
// function playProgression(arrayOfChords, durationOfEachChord, IntervalBetweenChords) {
//   // play first chord
//   playChord(arrayOfChords[0], durationOfEachChord)
//   // after intervalBetweenChords msec, play each chord until the end of the array
//   for (i in arrayOfChords.length) {
//     // skipt the first element, because the first chord has already been played
//     if (i > 0) {
//       setTimeout(function() {
//         playChord(arrayOfChords[i], durationOfEachChord)
//       }, IntervalBetweenChords)
//     }
//   }
// }
