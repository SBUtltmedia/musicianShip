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



function makeSound() {

  return new Howl({
    autoplay: false,
     // html5: true,
    src: ['samples/output500.ogg', 'samples/output500.mp3', 'samples/output500.webm'],
    // src: ['samples/output500.mp3'],
    sprite: sprite


  });


}


function makeHowl() {
  //  The goal is to have the sprite as an object for which the keys are the notes and the values are the numbers for the position of the sprite
  sound = makeSound()
  sound.once('load', function() {
    loadingMessage.append("<p>Done!</p>")
    $('#loading').hide(200);

  });


  function showSeek() {
    requestAnimationFrame(showSeek)

  }

  showSeek()

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
  loadingMessage.addClass("welcome-square")
  loadingMessage.addClass("textbox")
  loadingMessage.append("<p>Loading...</p>")
  loadingMessage.append("<p>(please wait)</p>")

  // ADD TITLE TO LOADING SCREEN
  // create the title Section
  var titleSection = $("<div/>", {
    id: "WelcomeTitleSection",
    class: "welcome-square"
  });
  titleSection.addClass("welcome-square")
  // create the title box
  var menuTitle = $("<div/>", {
    id: "menuTitle",
    class: "loadingTitle"
  });
  // menuTitle.addClass("bg-square")
  menuTitle.addClass("textbox")
  // menuTitle.append("<p>The </p> <p> MusicianShip</p> <p>App</p>")
  menuTitle.append("<p>The MusicianShip App</p>")
  // create Logo Div
  var logoDiv = $("<div/>", {
    id: "logoDiv"
  });
  // titleSection.append(logoDiv)
  // logoDiv.addClass("bg-square")
  logoDiv.append(SVGLogo)

  // append everyhing
  titleSection.append(menuTitle)
  titleSection.append(logoDiv)
  titleSection.append(loadingMessage)

  loadingDiv.append(titleSection)

  // loadingDiv.append(loadingMessage)
  // $('#theDiv').prepend('<img id="theImg" src="theImg.png" />')
  // loadingDiv.prepend('<img id="Logo" src="img/logo.png" />')
  $('#stage').append(loadingDiv);



}

function playChord(arr, duration = 1000, bassBoost = false) {
  sound.stop()
  var fadeDuration = 200;
  var soundItems = []

  for (i in arr) {

    var mySound = arr[i]
    if (typeof arr[i] == 'number') {
      var mySound = keyArray[arr[i]]
    }
    var soundIndex = soundItems.length
    soundItems[soundIndex] = sound.play(mySound)

    sound.volume(.1, soundItems[soundIndex])
    // Add Bass bassBoost


    // if (i == 0 && bassBoost == true) {
    //   sound.play(mySound)
    // }


    // volume is reduced to 0.1 since piling up different sounds produces distortion



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
  if (bassBoost == true) {
    sound.volume(.2, soundItems[0])
  }

  setTimeout(() => {

    soundItems.forEach(function(element) {
      sound.fade(.1, 0, fadeDuration, element);
      //sound.stop(element);
    });

  }, duration)



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


var SVGLogo = '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 733 733"><defs><style>.cls-1{fill:#fff;}</style></defs><title>musicianSHIP</title><circle cx="366.08" cy="366.08" r="366.08"/><path class="cls-1" d="M798.2,242.49,762.87,190s-29.8-36.37-29.62-97.09l-15.6-2L668.4,418.9l-4.21,28S617.76,412.11,556.74,448s-38.52,71.34-38.52,71.34,27.61,54.22,117.54,11.07c0,0,34.4-17.45,40.29-56.6l7.83-52.19L716,208c25.35,9.21,121.56,48.67,101.13,181.88,0,0-1,6.53,10.06-13.85C827.15,376.05,848.14,320.05,798.2,242.49Z" transform="translate(-245.92 -25)"/><path class="cls-1" d="M697,95.6S411.34,115.47,346,388.36c0,0,115.36-58.38,285.69,15C631.73,403.33,623,206.34,697,95.6Z" transform="translate(-245.92 -25)"/><path class="cls-1" d="M383.75,578.28c34.88-5.13,96.53-12.27,146.35-15-15.93-7.62-36.05-26.12-41.49-47.34,0,0-17.41-58.23,58.23-91.42,3.15-1.38-150.19-21.22-274.26,6C272.58,430.53,321.65,531.75,383.75,578.28Z" transform="translate(-245.92 -25)"/><path class="cls-1" d="M708.44,457.74c0,61-48.15,93.6-78.35,106.66,52.28,2.06,132.2,7,192.68,15.28,35.09-22.24,76.14-64.8,76.14-64.8C814,474.61,708.44,457.74,708.44,457.74ZM757,536a19.86,19.86,0,1,1,19.86-19.86A19.86,19.86,0,0,1,757,536Z" transform="translate(-245.92 -25)"/><path class="cls-1" d="M907.79,606.77h0c-317.07-51-507.09-21.74-591.63-.06,90.93,128,229.72,143.94,229.72,143.94C703,689.78,858,653.49,869.38,650.85l.06-.06c-139.56,22.2-250.13,51.37-336.25,81Q518.35,727.18,505,722c182-56.59,374.55-82.12,375.65-82.26h0c-179.28,11.62-313.14,38.8-409.57,67.47q-12.68-6.19-23.75-12.63c202.82-54,442.47-66.25,443.51-66.31h0C674.2,624.84,520.42,649.37,418.64,676c-7.41-5.33-14-10.56-19.92-15.58C610.42,611.09,887.4,617,899.39,617.32l0,0c-252.21-23.17-422.09-1.86-523.24,21.62a190.89,190.89,0,0,1-12.88-15.39C586.06,576.64,906.69,606.67,907.79,606.77Z" transform="translate(-245.92 -25)"/></svg>'
