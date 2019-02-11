var sound
var spriteLength = 10000;

var octave = ["A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab"]
var sprite = {}
var keyArray = [];

// Divide the howl file into each sprite
for (i = 0; i < 88; i++) {

  //start on A0
  var oct = Math.floor((i + 9) / 12);
  //cycle note
  var note = octave[i % 12];
  // creating sprite, built like this:
// 0A: (2) [0, 10000]
// 0B: (2) [20000, 10000]
// 0Bb: (2) [10000, 10000]
// 1A: (2) [120000, 10000]
// 1Ab: (2) [110000, 10000]
// 1B: (2) [140000, 10000]
  sprite[oct + note] = [i * spriteLength, spriteLength]
  // creating a keyArray, built like this:
// 0: "0A"
// 1: "0Bb"
// 2: "0B"
// 3: "1C"
// 4: "1Db"
  keyArray.push(oct + note)
}
 console.log(sprite)
 console.log(JSON.stringify(keyArray).split(",").join(" "))

// prepares the Howler.js backend and shows a loading screen
function makeHowl() {
  //  The goal is to have the sprite as an object for which the keys are the notes and the values are the numbers for the position of the sprite
  sound = new Howl({
    autoplay: false,
    src: ['samples/output500.webm', 'samples/output500.mp3'],
    // src: ['samples/output500.mp3'],
    sprite: sprite

  });
  console.log(sound)

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

function playChord(arr, duration = 1000,bassBoost=false, fadeDuration = 2000) {


  for (i in arr) {

    var mySound = arr[i]
    if (typeof arr[i] == 'number') {
      var mySound = keyArray[arr[i]]
    }
    sound.play(mySound)

    // Add Bass bassBoost

    // Old Method
    // if(i==0 && bassBoost=2){
    // sound.play(mySound)
    // }

    // New Method

    // WIP
    if(i==0 && bassBoost==true){
    sound.play(mySound)
    }


    // volume is reduced to 0.1 since piling up different sounds produces distortion
    sound.fade(0.1, 0, fadeDuration);

  }

  return sound;
}

//MOVE THIS FUCNTION TO PROGRESSION!!!
function stopAllSound() {
  sound.stop()
  stateContainer.stopPlayback = true
  // Remove highlight from all columns
  $('#columns div div').removeClass("btnHighlighted")
  // Object.keys(howlerList).forEach(function(key) {
  //   howlerList[key].stop();
  // });
}
