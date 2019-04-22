// Init stateContainer. It will keep track of
// the full state of the app
var stateContainer = {};

// This function loads the very fist things
// once the website is loaded
$(function() {
  // Sets up constant proportions for CSS, based on rem units:
  resizeWindow()
  // Loads the Weclome Screen, where you can choose MUS class
  MUSChoice()
  // Load the sound files and obscurates everything with loaeding screen
  makeHowl()
  // Initialize MUS var
  stateContainer.Mus = "505"
})

// Creates the Welcome Screen, to choose between MUS505 or MUS506
function MUSChoice() {
  // Make a clear screen
  clearStage();
  // create the title Section
  var titleSection = $("<div/>", {
    id: "WelcomeTitleSection",
    class: "welcome-square"
  });
  titleSection.addClass("welcome-square")
  // create the title box
  var menuTitle = $("<div/>", {
    id: "menuTitle",
    class: "bigTitle"
  });
  // menuTitle.addClass("bg-square")
  menuTitle.addClass("textbox")
  menuTitle.append("<p>The MusicianShip App</p>")
  titleSection.append(menuTitle)
  // description
  var menuDesc = $("<div/>", {
    id: "menuDesc"
  });
  menuDesc.addClass("bg-square")
  menuDesc.addClass("comment")
  menuDesc.append("<p> Based on SBU Mus505 and Mus506 material, </p> <p> as taught by Prof. Perry Goldstein. </p>")
  titleSection.append(menuDesc)
  // create the MusMenu section
  var MusMenu = $("<div/>", {
    id: "MusMenu",
    class: "welcome-square"
  });
  // create the Mus title box
  var MusTitle = $("<div/>", {
    id: "MusTitle"
  });
  MusTitle.addClass("bg-square")
  MusTitle.addClass("textbox")
  MusTitle.append("<p>Choose Your Musicianship Class</p>")
  MusMenu.append(MusTitle)
  // create a menu of MUS options
  // MUS 505 Btn
  var Mus505Btn = $("<div/>", {
    id: "Mus505Btn",
    class: "progBtn button"
  })
  Mus505Btn.append("<p> Mus505 </p>")
  MusMenu.append(Mus505Btn)
  // MUS 506 Btn
  var Mus506Btn = $("<div/>", {
    id: "Mus506Btn",
    class: "progBtn button"
  })
  Mus506Btn.append("<p> Mus506 </p>")
  MusMenu.append(Mus506Btn)
  // FootNote
  var Footnote = $("<div/>", {
    id: "Footnote",
    class: "footnote"
  })
  Footnote.append("<p> 2019. App Developed in the <em> TLL - Stony Brook TLT Media Lab</em> by Alessandro Fadini, under the guide of Paul St-Denis.</p>")
  // MusMenu.append(Mus506Btn)
  // Add divs to the Page
  $('#stage').append([titleSection, MusMenu, Footnote])
  // enable event listeners
  Listener.helperFunctions.addEventListeners("menu");


}

// This function creates the MenuUI and loads JSON files
function loadMenuUI() {
  // Progression Units for 505
  var ProgressionUnits505 = [{
      "unit_nb": 2,
      "desc": 'Using I, i, ii6, N6, iv, ,IV, I6/4, i6/4, V'
    },
    {
      "unit_nb": 3,
      "desc": "Adding V7"
    },
    {
      "unit_nb": 4,
      "desc": "Adding I6, i6 and VI"
    },
    {
      "unit_nb": 5,
      "desc": "Using V6/4, V4/3, V4/2, V6 and V6/5"
    },
    {
      "unit_nb": 6,
      "desc": "Adding augmented chords, A6 (Fr6, It6, Ger6)"
    },
    {
      "unit_nb": 7,
      "desc": "Using VI during progressions"
    }
  ]
  var ProgressionUnits506 = [{
    "unit_nb": 09,
    "desc": 'ii7, IV7, vi7 in Major and Minor Keys (Under Constrution)'
    }, {
      "unit_nb": 10,
      "desc": 'Distinguishing V7, V6/5, V4/3 and vii&oslash;7, vii&oslash;6/5, vii&oslash;4/3'
  }
  ]
  // Define progression units
  var ProgressionUnits = []
  // Change ProgressionUnits according to MUS class
  if (stateContainer.Mus == "505") {
    ProgressionUnits = ProgressionUnits505
  }
  if (stateContainer.Mus == "506") {
    ProgressionUnits = ProgressionUnits506
  }

  // MUS 505 or MUS 506 SCREEN GEN
  // Define triad units
  var TriadUnits = [{
      "unit_nb": 1,
      "desc": 'Using M,m,d,A'
    },
    {
      "unit_nb": 2,
      "desc": "Adding M6 and m6"
    },
    {
      "unit_nb": 3,
      "desc": "Adding M64 and m64"
    },
    {
      "unit_nb": 4,
      "desc": "Mixing M64, m64, with M6, m6"
    },
    {
      "unit_nb": 5,
      "desc": "Adding d6"
    },
    {
      "unit_nb": 6,
      "desc": "Sevenths: MM7,mm7,Mm7,mM7"
    }
  ]
  // Make a clear screen
  clearStage();
  // create the title Section
  var titleSection = $("<div/>", {
    id: "MainMenuTitle"
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
  var menuTitle = $("<div/>", {
    id: "menuTitle",
    class: "bigTitle"
  });
  // menuTitle.addClass("bg-square")
  menuTitle.addClass("textbox")
  menuTitle.append("<p>Mus505 Section</p>")
  titleSection.append(menuTitle)
  // description
  var menuDesc = $("<div/>", {
    id: "menuDesc"
  });
  menuDesc.addClass("bg-square")
  menuDesc.addClass("textbox")
  menuDesc.append("<p> Select the exercise and unit</p>")
  titleSection.append(menuDesc)
  // create the progressions section
  var progMenu = $("<div/>", {
    id: "progMenu",
    class: "bg-square"
  });
  // create the progressions title box
  var progTitle = $("<div/>", {
    id: "progTitle"
  });
  progTitle.addClass("bg-square")
  progTitle.addClass("textbox")
  progTitle.append("<p>Progressions Units</p>")
  progMenu.append(progTitle)

  // create the triads section
  var triadMenu = $("<div/>", {
    id: "triadMenu",
    class: "bg-square"
  });
  // create the triads title box
  var triadTitle = $("<div/>", {
    id: "triadTitle"
  });
  triadTitle.addClass("bg-square")
  triadTitle.addClass("textbox")
  triadTitle.append("<p>Triad Units</p>")
  triadMenu.append(triadTitle)



  // create a dynamic menu of all progression units
  for (var i = 0; i < ProgressionUnits.length; i++) {
    var cur_unit = ProgressionUnits[i].unit_nb
    var cur_unit_desc = ProgressionUnits[i].desc
    //Do something
    var progBtn = $("<div/>", {
      id: "progBtn_" + cur_unit,
      class: "progBtn button"
    })
    // unitBtn.addClass("unitNumber"+cur_unit)
    progBtn.append("<p> UNIT " + cur_unit + ": <em> " + cur_unit_desc + "</em> </p>")
    progMenu.append(progBtn)
  }

  // create a dynamic menu of all progression units
  for (var i = 0; i < TriadUnits.length; i++) {
    var cur_unit = TriadUnits[i].unit_nb
    var cur_unit_desc = TriadUnits[i].desc
    //Do something
    var triadBtn = $("<div/>", {
      id: "triadBtn_" + cur_unit,
      class: "progBtn button"
    })
    // unitBtn.addClass("unitNumber"+cur_unit)
    triadBtn.append("<p> UNIT " + cur_unit + ": <em> " + cur_unit_desc + "</em> </p>")
    triadMenu.append(triadBtn)
  }

  // Non Dynamic menu of progressions
  // var unitBtn = $("<div/>", {
  //   id: "unitBtn",
  //   class: "menuBtn button"
  // })
  // unitBtn.append("<p> Progression 7 </p>")
  // topMenu.append(unitBtn)

  if (stateContainer.Mus == 505) {
  $('#stage').append([titleSection, progMenu, triadMenu])
}
if (stateContainer.Mus == 506) {
$('#stage').append([titleSection, progMenu])
}

  // enable event listeners
  Listener.helperFunctions.addEventListeners("menu");

}

function clearStage() {

  $('#stage').html("")
  $('#stage *').off()

}

function loadProgressionUnit(unitNum) {
  clearStage()
  loadUnit(unitNum)

  function loadUnit(unitNum) {

      $.get(`data/${stateContainer.Mus}${stateContainer.progressionType}-${pad2Z(unitNum)}.json`, loadData)
    }

    function loadData(data) {
      stateContainer.data = data;
      stateContainer.unit = unitNum;
      // console.log("STATE_check", state)
      start();
    }
  }




  function start() {
    // clear the inside
    var totalColumns;

    // FOR REGULAR PROGRESSIONS
    if (stateContainer.progressionType == "progressions") {
      // pick a random Progression
      // this function generates the index for a random progression
      stateContainer.data.progressionIndex = Math.floor(Math.random() * stateContainer.data.progressions.length);
      // prints selected prog chord


      // initialize user answer Array
      totalColumns= stateContainer.data.progressions[stateContainer.data.progressionIndex].chords.length

      // fill the array storedAnswer with dummy elements "X"
      // for (var i = 0, l = state.progressions[state.progressionIndex].chords.length; i < (l-1); ++i) {
      // state.storedAnswer.push(" X")
      //   // console.log("pushing X")
      // }
      console.log("state.storedAnswer: ", stateContainer.data.storedAnswer)


    }

    // FOR TRIAD PROGRESSIONS
    if (stateContainer.progressionType == "triads") {
      stateContainer.data.triads=[];
      stateContainer.triadColNumb = 4
      // pick 4 times one of the options at random and store it as a progression.
      // Ex, var progression should look like ["M","m","d","d"]
      stateContainer.data.progressions = []
      for (var i = 0; i < stateContainer.triadColNumb; i++) {
        // this function generates the index for a random progression
      //  Math.floor(Math.random() * stateContainer.data.options.length);
        stateContainer.data.triads.push(stateContainer.data.options[Math.floor(Math.random() * stateContainer.data.options.length)])

        // console.log("pushing X")
      }
      // Also pick a random root Array
      // Define Root Array
      stateContainer.data.triadRoot = []
      // Loop through Array
      for (var i = 0; i < stateContainer.triadColNumb; i++) {
        // generate a random root number in each element of root array
        stateContainer.data.triadRoot.push(pickRandomRoot())
      }
      // prints selected prog chord
      console.log("selected prog: ", stateContainer.data.triads)
      // initialize user answer Array
      totalColumns= stateContainer.triadColNumb;
      // fill the array storedAnswer with dummy elements "X"
      // for (var i = 0, l = state.progressions[state.progressionIndex].chords.length; i < (l-1); ++i) {
      // state.storedAnswer.push(" X")
      //   // console.log("pushing X")
      // }
      console.log("stateContainer.storedAnswer: ", stateContainer.data.storedAnswer)
      generateTriadNotesFromRootAndStoredAnswer()
    }



    // Initialize check flag
    // The check flag determines whether the answer will be colored depending if it's correct or not.
    stateContainer.data.check = false
    // make Progression Interface
    makeProgressionUI()
    stateContainer.data.storedAnswer = new Array(totalColumns).fill(" ")
    stateContainer.data.storedAnswer.forEach((item)=>{

console.log(totalColumns)


    $('#answerBox').append($('<div/>',{class:"answerBoxItem"}))



    })


    Listener.helperFunctions.addEventListeners("progressions");



    console.log("play progression")



    // color each button gray.
    $("#columns div div").addClass("btnReady")
    // When user clicks on a button (columns div div), call is correct)
    $('#columns div div').on("click", function(evt) {
      stateContainer.clickeditem = [$(this).index(), $(this).parent().index()]
      // Toggle highlight off from all other buttons in the column
      $('#columns div:nth-child(' + ($(this).parent().index() + 1) + ')' + 'div div').removeClass("btnClicked")
      // Highlight the button when click
      $(this).addClass("btnClicked")
      // update the storedAnswer, which is what the user is selecting as progression

      // update storedAnswer with column number as first number and chordSymbol as second argument
      var columnNumb = $(this).parent().index()

        var chordSymb = stateContainer.data.options[$(this).index()]


      // var chordSymb = stateContainer.data.options[$(this).index()]
      updateAnswer(columnNumb, chordSymb)
      // Log message about answer being correct
      // console.log(stateContainer.data.clickeditem, isCorrect())
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
    stateContainer.data.storedAnswer[columnNumber] = chordSymbol
    console.log("state.storedAnswer", stateContainer.data.storedAnswer)
    //   color = "green"

colorAnswerText($('#checkBtn').hasClass('btnClicked'))


    //  colorAnswerText()

      // var color = '"red"'
      // // FOR REGULAR PROGRESSIONS
      // if (stateContainer.progressionIsATriad == false) {
      //   //
      //
      //   if (stateContainer.data.progressions[stateContainer.data.progressionIndex].chords[0].symbol == stateContainer.data.storedAnswer[0]) {
      //     color = '"green"'
      //   }
      //
      // }
      //
      // // FOR TRIAD PROGRESSIONS
      // if (stateContainer.progressionIsATriad == true) {
      //   if (stateContainer.data.triads[0] == stateContainer.data.storedAnswer[0]) {
      //     color = '"green"'
      //   }
      // }


      // var AnswerText = " <font color=" + color + ">" + stateContainer.data.storedAnswer[0] + "</font>"
      // for (var i = 1, l = stateContainer.data.storedAnswer.length; i < l; ++i) {
      //   // console.log("i", i)
      //   // console.log("progresson correct chord symbol", stateContainer.data.progressions[state.progressionIndex].chords[i].symbol)
      //   console.log("stored answer", stateContainer.data.storedAnswer[i])
      //   // check that the answer is correct, in that case changes the color to green
      //   // keeps into account that "A6" counts as "It6,Fr6,Ger6"
      //   // FOR REGULAR PROGRESSIONS
      //   if (stateContainer.progressionIsATriad == false) {
      //     //
      //     var correctSym = stateContainer.data.progressions[stateContainer.data.progressionIndex].chords[i].symbol
      //   }
      //   // FOR TRIAD PROGRESSIONS
      //   if (stateContainer.progressionIsATriad == true) {
      //     var correctSym = stateContainer.data.triads[i]
      //   }
      //
      //   if ((correctSym == stateContainer.data.storedAnswer[i]) || ((stateContainer.data.storedAnswer[i] == "A6" && ((correctSym == "It6") || (correctSym == "Fr6") || (correctSym == "Ger6"))))) {
      //     color = '"green"'
      //     // otherwise color is set to red
      //   } else {
      //     color = '"red"'
      //   }
      //   AnswerText = AnswerText + ", &nbsp;" + " <font color=" + color + "> " + stateContainer.data.storedAnswer[i] + "</font>"
      //   console.log("Answer Text", AnswerText)
      //   // WIP
      // }
    }
    // do we need this?
    // stateContainer.data.AnswerText = AnswerText
    // $('#answerBox').html(stateContainer.data.AnswerText)




  // function colorAnswerText(state) {
  //   var color = '"red"'
  //
  // // FOR REGULAR PROGRESSIONS
  //     if (stateContainer.progressionIsATriad == false) {
  //   if (stateContainer.data.progressions[state.progressionIndex].chords[0].symbol == stateContainer.data.storedAnswer[0]) {
  //     color = '"green"'
  //   }
  // }
  //   var AnswerText = " <font color=" + color + ">" + stateContainer.data.storedAnswer[0] + "</font>"
  //   for (var i = 1, l = stateContainer.data.storedAnswer.length; i < l; ++i) {
  //     console.log("i", i)
  //     console.log("progresson correct chord symbol", stateContainer.data.progressions[state.progressionIndex].chords[i].symbol)
  //     console.log("stored answer", stateContainer.data.storedAnswer[i])
  //     // check that the answer is correct, in that case changes the color to green
  //     // keeps into account that "A6" counts as "It6,Fr6,Ger6"
  //     var correctSym = stateContainer.data.progressions[state.progressionIndex].chords[i].symbol
  //     if ((correctSym == stateContainer.data.storedAnswer[i]) || ((stateContainer.data.storedAnswer[i] == "A6" && ((correctSym == "It6") || (correctSym == "Fr6") || (correctSym == "Ger6"))))) {
  //       color = '"green"'
  //       // otherwise color is set to red
  //     } else {
  //       color = '"red"'
  //     }
  //     AnswerText = AnswerText + ", &nbsp;" + " <font color=" + color + "> " + stateContainer.data.storedAnswer[i] + "</font>"
  //     console.log("Answer Text", AnswerText)
  //     // WIP
  //   }
  //   stateContainer.data.AnswerText = AnswerText
  // }
  //








// This works but it shouln'd be scoped like that
function colorAnswerText(doCheck) {
console.log(doCheck)
for (var i = 0, l = stateContainer.data.storedAnswer.length; i < l; ++i) {




  var color = "red"
  var rightAnswer
  // FOR REGULAR PROGRESSIONS
  if (stateContainer.progressionType == "progressions") {
  rightAnswer= stateContainer.data.progressions[stateContainer.data.progressionIndex].chords[i].symbol
}
  // FOR REGULAR PROGRESSIONS
  if (stateContainer.progressionType == "triads") {
  rightAnswer=  stateContainer.data.triads[i]

}
    if (rightAnswer == stateContainer.data.storedAnswer[i]) {
      color = "green"
    }
if(!doCheck){
    color = "white"
}

$(`#answerBox div:nth-child(${i+1})`).html(stateContainer.data.storedAnswer[i])

$(`#answerBox div:nth-child(${i+1})`).css({"color":color})

}




  // var AnswerText = " <font color=" + color + ">" + stateContainer.data.storedAnswer[0] + "</font>"
  // for (var i = 1, l = stateContainer.data.storedAnswer.length; i < l; ++i) {
  //   console.log("i", i)
  //   // console.log("progresson correct chord symbol", stateContainer.data.progressions[state.progressionIndex].chords[i].symbol)
  //   console.log("stored answer", stateContainer.data.storedAnswer[i])
  //   // check that the answer is correct, in that case changes the color to green
  //   // keeps into account that "A6" counts as "It6,Fr6,Ger6"
  //   // FOR REGULAR PROGRESSIONS
  //   if (stateContainer.progressionIsATriad == false) {
  //     var correctSym = stateContainer.data.progressions[stateContainer.data.progressionIndex].chords[i].symbol
  //   }
  //   // FOR TRIAD PROGRESSIONS
  //   if (stateContainer.progressionIsATriad == true) {
  //     var correctSym = stateContainer.data.triads[i]
  //   }
  //   if (correctSym == mapChordSymbol(stateContainer.data.storedAnswer[i]))
  //     color = '"green"'
  //     // otherwise color is set to red
  //   } else {
  //     color = '"red"'
  //   }
  //   AnswerText = AnswerText + ", &nbsp;" + " <font color=" + color + "> " + stateContainer.data.storedAnswer[i] + "</font>"
  //   console.log("Answer Text", AnswerText)
  //   // WIP
  // }
  // stateContainer.data.AnswerText = AnswerText
}

function mapChordSymbol(chordSymbol){
var A6Map={};
["Fr6","Ger6","It6"].forEach((a)=>{A6Map[a]="A6"})
return A6Map[chordSymbol] || chordSymbol;
}

// pads a numer with leading zero to 2 digits (ex: 3=>03, 13=>13)
function pad2Z(n, width = 2, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
