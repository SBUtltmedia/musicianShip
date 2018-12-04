$(function() {









  // Parse the data file of the harmonic progressions
  //var json = JSON.parse("data/progressions-06.json");
  // create a state that contains all arrays
  var state = {};
  // $.get( "data/progressions-06.json", function (data){console.log( data )});


  $.get("data/prog-06.json", loadData)

  function loadData(data) {
    // options will be number of colors
    state = data;
    state.unit = 6;
    start();
  }

  function start() {
    // clear the inside
    $('body').html("")
    $('body *').off()
    var progression = [];
    // pick a random Progression
    // this function generates the index for a random progression
    state.progressionIndex = Math.floor(Math.random() * state.progressions.length);
    // prints selected prog chord
    console.log("selected prog: ", state.progressions[state.progressionIndex].chords)
    // initialize user answer Array
    state.storedAnswer = new Array(state.progressions[state.progressionIndex].chords.length).fill(" X")
    // fill the array storedAnswer with dummy elements "X"
    // for (var i = 0, l = state.progressions[state.progressionIndex].chords.length; i < (l-1); ++i) {
    // state.storedAnswer.push(" X")
    //   // console.log("pushing X")
    // }
    console.log("state.storedAnswer: ", state.storedAnswer)
    // Initialize check flag
    // The check flag determines whether the answer will be colored depending if it's correct or not.
    state.check = false
    // Create titleSection
    var titleSection = $("<div/>", {
      id: "backBtn"
    });
    titleSection.addClass("bg-square")
    // create Back btn
    var backBtn = $("<div/>", {
      id: "backBtn"
    });
    backBtn.addClass("menuBtn")
    backBtn.append("<p> Back To Menu </p>")
    titleSection.append(backBtn)
    // create the title box
    var title = $("<div/>", {
      id: "title"
    });
    title.addClass("bg-square")
    title.addClass("textbox")
    title.append("<p>Harmonic Progression - Unit " + state.unit + "</p>")
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
      class: "menuBtn"
    });
    playBtn.append("<p> Play Progression </p>")
    topMenu.append(playBtn)
    // create check btn
    var checkBtn = $("<div/>", {
      id: "checkBtn"
    });
    checkBtn.addClass("menuBtn")
    checkBtn.append("<p> Check </p>")
    topMenu.append(checkBtn)
    // create next btn
    var nextBtn = $("<div/>", {
      id: "nextBtn"
    });
    nextBtn.removeClass("btnClicked")
    nextBtn.addClass("menuBtn")
    nextBtn.append("<p> Next Progression </p>")
    topMenu.append(nextBtn)
    // create the answerbox
    var answerBox = $("<div/>", {
      id: "answerBox",
      class: "bg-square",
      html: "<p>  </p>"
    });
    // initialize AnswerBox Text
    // answerBox.append("<p>"+ state.storedAnswer +"</p>")
    // create columns
    var columns = $("<div/>", {
      id: "columns"
    });
    columns.addClass("bg-square")
    //var column=createOptions(state.options)
    for (i of state.progressions[state.progressionIndex].chords) {
      columns.append(createOptions(state.options))
    }
    // Append elements of the page
    $('body').append(titleSection)
    $('body').append(topMenu)
    $('body').append(answerBox)
    $('body').append(columns)
    // Play Progression when you click play
    $('#playBtn').on("click", function(evt) {
      // state.clickeditem = [$(this).index(), $(this).parent().index()]
      // Highlight the button when click
      $(this).addClass("btnClicked")

      // Dummy Progression
      // var RandProgChordsArray = [["3C", "3E", "4C", "5C"],["3C", "3E", "4C", "5C"],["3C", "3E", "4C", "5C"]]

      ////////////// REVIEW WITH PAUL
      // console.log("state.progressions[state.progressionIndex].chords.notes",state.progressions[state.progressionIndex].chords.notes)
      // Construct the Array of chord notes for the random progression selected

      //   // commented from here
      console.log("state.progressions[state.progressionIndex].chords", state.progressions[state.progressionIndex].chords)
      var RandProgChordsArray = []

      for (var i of state.progressions[state.progressionIndex].chords) {
        console.log("i.notes", i.notes)
        RandProgChordsArray.push(i.notes)
      }

      // var chordsArray = state.progressions[state.progressionIndex].chords
      // for (var i = 0, len = chordsArray.length; i < len; i++) {
      //   console.log(`chordsArray${i}`, chordsArray[i])
      //   RandProgChordsArray.push(chordsArray[i].notes)
      // }
      console.log("array of chord notes RandProgChordsArray: ", RandProgChordsArray)
      playProgressionAndHighlightColumn(RandProgChordsArray)
      console.log("play progression")
    })


    // color each button gray.
    $("#columns div div").addClass("btnReady")
    // When user clicks on a button (columns div div), call is correct)
    $('#columns div div').on("click", function(evt) {
      state.clickeditem = [$(this).index(), $(this).parent().index()]
      // Toggle highlight off from all other buttons in the column
      $('#columns div:nth-child(' + ($(this).parent().index() + 1) + ')' + 'div div').removeClass("btnClicked")
      // Highlight the button when click
      $(this).addClass("btnClicked")
      // update the storedAnswer, which is what the user is selecting as progression
      //WIP
      // update storedAnswer with column number as first number and chordSymbol as second argument
      var columnNumb = $(this).parent().index()
      var chordSymb = state.options[$(this).index()]
      updateAnswer(columnNumb, chordSymb)
      // Log message about answer being correct
      console.log(state.clickeditem, isCorrect())
    })

    function isCorrect() {
      return state.progressions[state.progressionIndex].chords[state.clickeditem[1]].symbol == state.options[state.clickeditem[0]]
    }


    // When clicking on next, relaunch start after a short time out
    $('#nextBtn').on("click", function(evt) {
      $(this).addClass("btnClicked")
      setTimeout(function() {
        start()
      }, 300);
    })
    // When clicking on check, turn on the check flag
    $('#checkBtn').on("click", function(evt) {
      state.check = true
      $(this).addClass("btnClicked")
      // also update the Answer box with a "dummy" previous answer, since the function requires an argument
      console.log("state.check", state.check)
    })


    // This next bracket is the end of the function "Start()"
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

  // This function updates the StoredAnswer var in state,
  // Stored Answer is a dictionnary that for every column keeps track
  // of the last chord symbol indicated by the user when clicking on an element of the column
  function updateAnswer(columnNumber, chordSymbol) {
    // substitute item at position "column" in an array, with item "chordSymbol"
    state.storedAnswer[columnNumber] = chordSymbol
    console.log("state.storedAnswer", state.storedAnswer)
    if (state.check == false) {
      var AnswerText = " " + state.storedAnswer[0]
      for (var i = 0, l = state.storedAnswer.length; i < (l - 1); ++i) {
        AnswerText = AnswerText + ", " + state.storedAnswer[i + 1]
        console.log("pushing X")
      }
    }
    if (state.check == true) {
      var color = '"red"'
      if (state.progressions[state.progressionIndex].chords[0].symbol == state.storedAnswer[0]) {
        color = '"green"'
      }
      var AnswerText = " <font color=" + color + ">" + state.storedAnswer[0] + "</font>"
      for (var i = 1, l = state.storedAnswer.length; i < l; ++i) {
        console.log("i", i)
        console.log("progresson correct chord symbol", state.progressions[state.progressionIndex].chords[i].symbol)
        console.log("stored answer", state.storedAnswer[i])
        // check that the answer is correct, in that case changes the color to green
        // keeps into account that "A6" counts as "It6,Fr6,Ger6"
        var correctSym=state.progressions[state.progressionIndex].chords[i].symbol
        if ((correctSym == state.storedAnswer[i])|| ( (state.storedAnswer[i] == "A6" &&  ((correctSym == "It6")||(correctSym == "Fr6")||(correctSym == "Ger6")) ) ) ) {
          color = '"green"'
        // otherwise color is set to red
        } else {
          color = '"red"'
        }
        AnswerText = AnswerText + ", &nbsp;" + " <font color=" + color + "> " + state.storedAnswer[i] + "</font>"
        console.log("Answer Text", AnswerText)
        // WIP
      }
    }
    $('#answerBox').html(AnswerText)
  }


  // // this funcionts colors each chord in the answerBox according to the correction state
  // function checkAnswer(columnNumber, chordSymbol) {
  //   // substitute item at position "column" in an array, with item "chordSymbol"
  //   // state.storedAnswer.splice(0, columnNumber, chordSymbol)
  //   // state.storedAnswer.splice(columnNumber, 1, chordSymbol)
  //   state.storedAnswer[columnNumber] = chordSymbol
  //   // WIP (just verifies that it works)
  //   console.log("state.storedAnswer", state.storedAnswer)
  //   // WIP
  //   // $('#answerBox div').append("<p>try</p>")
  //
  //   // WIP
  //   var AnswerText = " "+state.storedAnswer[0]
  //   for (var i = 0, l = state.storedAnswer.length; i < (l-1); ++i) {
  //   AnswerText = AnswerText + ", " + state.storedAnswer[i+1]
  //   console.log("pushing X")
  // }
  // $('#answerBox').text(AnswerText)
  // }


  //  This function takes an array of chords (array of arrays) and plays them with a delay and highlights the rigth column
  //  ex of input:  ( [["3C", "3E", "4C", "5C"],["3C", "3E", "4C", "5C"],["3C", "3E", "4C", "5C"]], 2000, 2000 )
  // ex output: playing the chords and highlights the correct column
  function playProgressionAndHighlightColumn(arrayOfChords, durationOfEachChord = 1000, IntervalBetweenChords = 100) {


    function iterate(chordNum) {
      // Remove highlight from all columns
      $('#columns div div').removeClass("btnHighlighted")
      // Highlight the column indexed with number chordNum + 1
      $('#columns div:nth-child(' + (chordNum + 1) + ')' + 'div div').addClass("btnHighlighted")
      playChord(arrayOfChords[chordNum], durationOfEachChord).once("fade", function() {
        if (chordNum < arrayOfChords.length - 1) iterate(chordNum + 1)
      })
    }
    iterate(0)
    // HighlightColumn(0)

    // Highlight first column
    // play first chord
    //  console.log("about to play: arrayOfChords[0] ", arrayOfChords[0])
    //  playChord(arrayOfChords[0], durationOfEachChord)
    // after intervalBetweenChords msec, play each chord until the end of the array
    // var currentInterval=0;
    //     for (var i=0; i < arrayOfChords.length; i++) {
    //       // skipt the first element, because the first chord has already been played
    //       console.log(arrayOfChords.length)
    //       this.j=0;
    //         // Remove Highlight from previous Column
    //         setTimeout(function() {
    //
    //           // Highlight Current Column
    //           console.log("about to play: arrayOfChords [", this.j ,"] : ",arrayOfChords[this.j],typeof arrayOfChords[this.j])
    //           playChord(arrayOfChords[this.j], durationOfEachChord)
    //           this.j++;
    //         }, IntervalBetweenChords*i)
    //
    //       // when the final chord comes, remove highlight everywhere
    //       // WIP
    //     }
  }




})
