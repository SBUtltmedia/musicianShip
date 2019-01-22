// Q: why did we create this function?
$(function() {
  var state = {};
  // Define progression units
  state.ProgressionUnits = [3, 4, 5, 6, 7]
  //  var unitNum = 7
  // loadProgressionUnit(unitNum)

  // Load the Menu UI
  loadMenuUI(state)
  makeHowl();
  resizeWindow()
})

function loadMenuUI(state) {
  console.log(state)
  // Make a clear screen
  clearStage();
  // create the title Section
  var titleSection = $("<div/>", {
    id: "backBtn"
  });
  titleSection.addClass("bg-square")
  // create the title box
  var title = $("<div/>", {
    id: "title"
  });
  title.addClass("bg-square")
  title.addClass("textbox")
  title.append("<p>Mus 505 Web App</p>")
  title.append("<p> Select the exercise and unit</p>")
  titleSection.append(title)
  // create the top menu section
  var topMenu = $("<div/>", {
    id: "topMenu",
    class: "bg-square"
  });
  var unitBtn = $("<div/>", {
    id: "unitBtn",
    class: "menuBtn button"
  })
  unitBtn.append("<p> Progression 7 </p>")
  topMenu.append(unitBtn)
  $('#stage').append([titleSection, topMenu])

  // enable event listeners
  Listener.helperFunctions.addEventListeners(state, "menu");

}
function clearStage() {

  $('#stage').html("")
  $('#stage *').off()

}
function loadProgressionUnit(unitNum) {
  clearStage()
  loadUnit(unitNum)

  function loadUnit(unitNum) {
    $.get(`data/prog-0${unitNum}.json`, loadData)

    function loadData(data) {
      // options will be number of colors
      state = data;
      state.unit = unitNum;
      start();
    }
  }



  function start() {
    // clear the inside

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

    // make Progression Interface
    makeProgressionUI(state)
    Listener.helperFunctions.addEventListeners(state, "progressions");



    console.log("play progression")



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

    // function isCorrect() {
    //   return state.progressions[state.progressionIndex].chords[state.clickeditem[1]].symbol == state.options[state.clickeditem[0]]
    // }

    // I COMMENTED OUT THIS ONE
    // When clicking on next, relaunch start after a short time out
    // $('#nextBtn').on("click", function(evt) {
    //   $(this).addClass("btnClicked")
    //   setTimeout(function() {
    //     start()
    //   }, 300);
    // })



  }






  // This function updates the StoredAnswer var inside of the global "state" var,
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
        console.log("adding element to the anser")
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
        var correctSym = state.progressions[state.progressionIndex].chords[i].symbol
        if ((correctSym == state.storedAnswer[i]) || ((state.storedAnswer[i] == "A6" && ((correctSym == "It6") || (correctSym == "Fr6") || (correctSym == "Ger6"))))) {
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
    // do we need this?
    state.AnswerText = AnswerText
    $('#answerBox').html(state.AnswerText)
  }

  function colorAnswerText(state) {
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
      var correctSym = state.progressions[state.progressionIndex].chords[i].symbol
      if ((correctSym == state.storedAnswer[i]) || ((state.storedAnswer[i] == "A6" && ((correctSym == "It6") || (correctSym == "Fr6") || (correctSym == "Ger6"))))) {
        color = '"green"'
        // otherwise color is set to red
      } else {
        color = '"red"'
      }
      AnswerText = AnswerText + ", &nbsp;" + " <font color=" + color + "> " + state.storedAnswer[i] + "</font>"
      console.log("Answer Text", AnswerText)
      // WIP
    }
    state.AnswerText = AnswerText
  }




}




// This works but it shouln'd be scoped like that
function colorAnswerText(state) {
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
    var correctSym = state.progressions[state.progressionIndex].chords[i].symbol
    if ((correctSym == state.storedAnswer[i]) || ((state.storedAnswer[i] == "A6" && ((correctSym == "It6") || (correctSym == "Fr6") || (correctSym == "Ger6"))))) {
      color = '"green"'
      // otherwise color is set to red
    } else {
      color = '"red"'
    }
    AnswerText = AnswerText + ", &nbsp;" + " <font color=" + color + "> " + state.storedAnswer[i] + "</font>"
    console.log("Answer Text", AnswerText)
    // WIP
  }
  state.AnswerText = AnswerText
}
