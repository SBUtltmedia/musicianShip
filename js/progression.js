function makeProgressionUI() {
  // Initialize bass status
  stateContainer.enhanceBass = false
  // Initialize playing status
  stateContainer.playing = false
  //
  // CREATE UI DIVS
  //
  var titleSection = $("<div/>", {
    id: "backBtn"
  });
  titleSection.addClass("bg-square")
  // create backBtn
  var backBtn = $("<div/>", {
    id: "backBtn",
    class: "menuBtn button"
  });
  backBtn.append("<p> Back To Menu </p>")
  titleSection.append(backBtn)
  // create the title box
  var title = $("<div/>", {
    id: "title"
  });
  title.addClass("bg-square")
  title.addClass("textbox")
  title.append("<p>Harmonic Progression - Unit " + stateContainer.unit + "</p>")
  title.append("<p> Select the correct harmonic progression</p>")
  titleSection.append(title)
  // create the top menu section
  var topMenu = $("<div/>", {
    id: "topMenu",
    class: "bg-square"
  });
  //topMenu.addClass("bg-square")
  // create bass btn
  var bassBtn = $("<div/>", {
    id: "bassBtn",
    class: "menuBtn button"
  })
  bassBtn.append("<p> Enhance Bass </p>")
  topMenu.append(bassBtn)
  // create play btn
  var playBtn = $("<div/>", {
    id: "playBtn",
    class: "menuBtn button"
  })
  playBtn.append("<p> Play Progression </p>")
  topMenu.append(playBtn)
  // create check btn
  var checkBtn = $("<div/>", {
    id: "checkBtn",
    class: "button"
  })
  checkBtn.addClass("menuBtn")
  checkBtn.append("<p> Check </p>")
  topMenu.append(checkBtn)
  // create next btn
  var nextBtn = $("<div/>", {
    id: "nextBtn",
    class: "button"
  })
  nextBtn.addClass("menuBtn")
  nextBtn.append("<p> Next Progression </p>")
  topMenu.append(nextBtn)
  // create the answerbox
  var answerbox = $("<div/>", {
    id: "answerBox",
    class: "bg-square"

  });
  // create columns
  var columns = $("<div/>", {
    id: "columns"
  });
  columns.addClass("bg-square")

  // FOR REGULAR PROGRESSIONS
  if (stateContainer.progressionType == "progressions") {
    //
    //var column=createOptions(state.options)
    for (i of stateContainer.data.progressions[stateContainer.data.progressionIndex].chords) {
      columns.append(createOptions(stateContainer.data.options))
    }

  }
  // FOR TRIAD PROGRESSIONS
  if (stateContainer.progressionType == "triads") {

    for (var i = 0; i < stateContainer.triadColNumb; i++) {
      columns.append(createOptions(stateContainer.data.options))
    }


  }

  $('#stage').append([titleSection, topMenu, answerbox, columns])

}


function createOptions(options) {
  var optionsColumn = $("<div/>")
  for (i in options) {
    optionsColumn.append(
      $("<div/>", {
        class: options[i]
      }).append($('<p/>', {
        html: options[i]
      }))
    )
  }
  return optionsColumn
}


// Play Progression when you click play
function playSelectedProgression(evt) {
  // Highlight the PLAY button when click
  $(this).addClass("btnClicked")
  // Define the array of the progression
  stateContainer.RandProgChordsArray = []

  // FOR REGULAR PROGRESSIONS
  if (stateContainer.progressionType == "progressions") {

    // Log the progresson to be played
    console.log("stateContainer.data.progressions[stateContainer.data.progressionIndex].chords", stateContainer.data.progressions[stateContainer.data.progressionIndex].chords)

    // Build the array of chords taking them from the state function
    for (var i of stateContainer.data.progressions[stateContainer.data.progressionIndex].chords) {
      // log each chord
      // console.log("i.notes", i.notes)
      // Push chords from state to RandProgChordsArray
      stateContainer.RandProgChordsArray.push(i.notes)
    };

  }

  // FOR TRIAD PROGRESSIONS (TO BE DELETED)
  if (stateContainer.progressionType == "triads") {
// WWWWIIIIIIPPPP
// WIPWIP
    for (var i =0; i < stateContainer.triadColNumb; i++) {
    // for (var i of stateContainer.data.triadColNumb) {
    // for (var i of stateContainer.data.triads) {
      // log each chord
      // console.log("i.notes", i.notes)
      // Push chords from state to RandProgChordsArray
      stateContainer.RandProgChordsArray.push(stateContainer.data.triads.chords[i ])
      // stateContainer.RandProgChordsArray.push(i.chords)
      console.log("pushing item : ", i,"which is", stateContainer.data.triads.chords[i])
      // console.log("pushing item : ", i,"which is", stateContainer.data.triads.chords[i])
      // console.log("pushing item number: ", i,"which is", stateContainer.RandProgChordsArray.push(i.chords))
    };
    // var notes = []
    // // Build the array of notes generated from the corresponding triad
    // for (i in stateContainer.data.triads) {
    //   // pick a random root in the middle-low register
    //   // WIP
    //   var root = stateContainer.data.triadRoot
    //   console.log("root", root)
    //   // get the corresponding notes from the chord symbol
    //   notes = convertSymbolToNotes(root[i], stateContainer.data.triads[i])
    //   console.log("stateContainer.data.triads[i]", stateContainer.data.triads[i])
    //   // Push chords from state to stateContainer.RandProgChordsArray
    //   stateContainer.RandProgChordsArray.push(notes)
    //   console.log("stateContainer.RandProgChordsArray is:", stateContainer.RandProgChordsArray)
    // };

  }

  console.log(stateContainer.RandProgChordsArray)



  // Play the progression and highlight the column
  playProgressionAndHighlightColumn(stateContainer.RandProgChordsArray).then(
    function() {
      // Remove highlight from all columns
      $('#columns div div').removeClass("btnHighlighted")
      // untoggle play progression
      $("#playBtn").removeClass("btnClicked")
      // Remove "already playing" from Bass Boost
      $("#bassBtn").removeClass("btnDisabled")
      $("#bassBtn").html("<p> Enhance Bass </p>")
      // Log music played
      console.log("Progression Played")
    })




}

// Play a progression of chords and highlight the correspondant column
function playProgressionAndHighlightColumn(arrayOfChords, durationOfEachChord = 1500, bassBoost = stateContainer.enhanceBass, silenceBetweenChords = 1500) {
  var dfd = $.Deferred();

  // initialize StopPlayback flag
  stateContainer.soundChannels= stateContainer.soundChannels||[]

  function iterate(chordNum) {
	if(stateContainer.playing && (chordNum==0|| chordNum== stateContainer.previousChord+1)){
    // Remove highlight from all columns
    $('#columns div div').removeClass("btnHighlighted")
    // Highlight the column indexed with number chordNum + 1
    $('#columns div:nth-child(' + (chordNum + 1) + ')' + 'div div').addClass("btnHighlighted")
    // Play the Chord corresponding to the column
    stateContainer.soundChannels.push(playChord(arrayOfChords[chordNum], durationOfEachChord, bassBoost))


    // When the last chord has played (on "fade")
    stateContainer.soundChannels[stateContainer.soundChannels.length-1].once("fade", function() {
            // play each chord in the array, with a silence of length "silenceBetweenChords"
        if ((chordNum < arrayOfChords.length - 1)) {
	setTimeout(
		function(){
			stateContainer.previousChord=chordNum;
			iterate(chordNum + 1)
			  }
		,silenceBetweenChords)
        } else {

	stateContainer.playing=false;
          dfd.resolve("hurray");

        }
      }
    )
}
}
  iterate(0)
  return dfd.promise();

}


//MOVE THIS FUCNTION TO PROGRESSION!!!
function stopAllSound() {
  while(stateContainer.soundChannels &&  stateContainer.soundChannels.length)
{
var poppedChannel = stateContainer.soundChannels.pop();
poppedChannel.off("fade")
sound.stop(poppedChannel);
}
  // Remove highlight from all columns
  $('#columns div div').removeClass("btnHighlighted")
  // Object.keys(howlerList).forEach(function(key) {
  //   howlerList[key].stop();
  // });
}

function generateTriadNotesFromRootAndStoredAnswer() {
  // Initialize triads.chords
    stateContainer.data.triads.chords = []
  var notes = []
  // Build the array of notes generated from the corresponding triad
  for (i in stateContainer.data.triads) {
    // pick a random root in the middle-low register
    // WIP
    var root = stateContainer.data.triadRoot
    console.log("root", root)
    // get the corresponding notes from the chord symbol
    notes = convertSymbolToNotes(root[i], stateContainer.data.triads[i])
    console.log("stateContainer.data.triads[i]", stateContainer.data.triads[i])
    // Push chords from state to stateContainer.RandProgChordsArray
    stateContainer.data.triads.chords.push(notes)
    console.log("stateContainer.RandProgChordsArray is:", stateContainer.data.triads.chords)
  };
}
