function makeProgressionUI() {
  // SOUNDTEST
  // var testarr= ["5C"]
  // playChord(testarr)

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
    class: "bg-square",
    html: "<p>  </p>"
  });
  // create columns
  var columns = $("<div/>", {
    id: "columns"
  });
  columns.addClass("bg-square")
  //var column=createOptions(state.options)
  for (i of stateContainer.data.progressions[stateContainer.data.progressionIndex].chords) {
    columns.append(createOptions(stateContainer.data.options))
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
  // Log the progresson to be played
  console.log("stateContainer.data.progressions[stateContainer.data.progressionIndex].chords", stateContainer.data.progressions[stateContainer.data.progressionIndex].chords)
  // Define the array of the progression
  var RandProgChordsArray = []
  // Build the array of chords taking them from the state function
  for (var i of stateContainer.data.progressions[stateContainer.data.progressionIndex].chords) {
    // log each chord
    // console.log("i.notes", i.notes)
    // Push chords from state to RandProgChordsArray
    RandProgChordsArray.push(i.notes)
  };
  // Play the progression and highlight the column
  playProgressionAndHighlightColumn(RandProgChordsArray).then(
    function() {
      console.log("Done!")
    })
}

// Play a progression of chords and highlight the correspondant column
function playProgressionAndHighlightColumn(arrayOfChords, durationOfEachChord = 1000, IntervalBetweenChords = 100) {
  var dfd = $.Deferred();

  function iterate(chordNum) {
    // Remove highlight from all columns
    $('#columns div div').removeClass("btnHighlighted")
    // Highlight the column indexed with number chordNum + 1
    $('#columns div:nth-child(' + (chordNum + 1) + ')' + 'div div').addClass("btnHighlighted")
    // Play the Chord corresponding to the column
    playChord(arrayOfChords[chordNum], durationOfEachChord).once("fade", function() {
        if (chordNum < arrayOfChords.length - 1) {
          iterate(chordNum + 1)
        } else {

          dfd.resolve("hurray");

        }
      }

    )
  }
  iterate(0)
  return dfd.promise();
}
