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

function playChord(arr, duration = 1000, bassBoost = false, fadeDuration = 2000) {


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
    if (i == 0 && bassBoost == true) {
      sound.play(mySound)
    }


    // volume is reduced to 0.1 since piling up different sounds produces distortion
    sound.fade(0.1, 0, fadeDuration);
//     onEnd: function(){
//   if (this.volume == 0.6)
//     alert("Volume is currently 0.6!");
// }
//
// onVolume: function(){
//   if (this.volume == 0.1)
//     alert("Volume is currently 0.1!");
// }

  }

  return sound;
}




// This function picks a random root in the middle-low register

function pickRandomRoot() {
  // width of register from which a random note is generated
  var registerWidth = 15
  var randomNumberInRegister = Math.floor(Math.random() * registerWidth);
  // Lowest Random note chosen
  var registerLowerBound = 30
  var required_note = randomNumberInRegister + registerLowerBound
  return required_note
}




// This function generates and array of notes from a roo and a triadSymbol
// EX: ("4C","M64") --->  ["4C","5G","6C","6E"]

function convertSymbolToNotes(root, triadSymbol) {
  var triadNotesArray = []
  // var nature_nb = 0
  // triadNotesArray.push(root)
  // # Initialize error_check_flag
  var not_found = true
  // # take the root name
  var triad_root = root
  // # take the nature of the chord ( with appropriate function)
  var triad_nature = triadSymbol
  // # take the appropriate structure in nb that correspond to a chord nature
  // for nature_name in Triad_Names_Nb.keys() {
  // #		print("nature_name",nature_name)
  // if nature_name == triadSymbol:
  // # create an array of those nbs
  // #			print("Triad_Names_Nb",Triad_Names_Nb)
  // nature_nb = Triad_Names_Nb[nature_name]
  // not_found = false

  // }
  // console.log("eccolo", Triad_Names_Nb[triadSymbol])
  for (i in Triad_Names_Nb[triadSymbol]) {
    triadNotesArray.push(Triad_Names_Nb[triadSymbol][i] + root)



  }

  console.log(triadNotesArray)
  // # check if there was an error
  // if not_found:
  // console.log("Error, triad nature not found in Triad_Names_Nb")
  // # convert the array of nbs into an array of notes
  // #	print("nature_nb", nature_nb)

  // # return the array
  // #	print("tfn: ",triad_from_nomenclature)
  return triadNotesArray

}







///////// Triad_Names_Nb Library

var Triad_Names_Nb = {}

// ###############################################################
// #Create a Dictionnary Of Triad Names int_names: (name:relative pitches)
// ##############################################################
Triad_Names_Nb["M"] = [0, 4, 7]
Triad_Names_Nb["m"] = [0, 3, 7]
Triad_Names_Nb["d"] = [0, 3, 6]
Triad_Names_Nb["A"] = [0, 4, 8]
Triad_Names_Nb["M64"] = [0, 5, 9]
Triad_Names_Nb["m6"] = [0, 4, 9]
Triad_Names_Nb["M6"] = [0, 3, 8]
Triad_Names_Nb["m64"] = [0, 5, 8]
Triad_Names_Nb["d6"] = [0, 3, 9]
// # Add tetra as well
Triad_Names_Nb["MM7"] = [0, 4, 7, 11]
Triad_Names_Nb["Mm7"] = [0, 4, 7, 10]
Triad_Names_Nb["mM7"] = [0, 3, 7, 11]
Triad_Names_Nb["mm7"] = [0, 3, 7, 10]
