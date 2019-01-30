var Listener = {
  pages: {
    progressions: {
      checkBtnEvent: function(evt) {
        stateContainer.data.check = true
        //  console.log(this)
        $(evt.currentTarget).addClass("btnClicked")
        console.log("state.check", stateContainer)
        colorAnswerText()
        $('#answerBox').html(stateContainer.data.AnswerText)
      },
      menuBtnEvent: function(evt) {
        stateContainer.data.check = true
        //  console.log(this)
        $(evt.currentTarget).addClass("btnClicked")
        // also update the Answer box with a "dummy" previous answer, since the function requires an argument
        console.log("state.check", stateContainer)
      },
      playBtnEvent: function(evt) {
        console.log(evt, stateContainer)
        $(evt.currentTarget).addClass("btnClicked")
        stopAllSound()
        playSelectedProgression(evt)
      },
      backBtnEvent: function(evt) {
        $(evt.currentTarget).addClass("btnClicked")
        loadMenuUI()
      },
      nextBtnEvent: function(evt) {
        $(evt.currentTarget).addClass("btnClicked")
        setTimeout(function() {
          loadProgressionUnit(stateContainer.unit)
        }, 300);
      }
    },
    menu: {

      // dynamically load all progression units buttin
      progBtnEvent: function(evt) {
      var unitNum= evt.currentTarget.id.split("_")[1]
        console.log(evt)
        $(evt.currentTarget).addClass("btnClicked")

      loadProgressionUnit(unitNum)
      }

      // // Enable all button functions
      // for (var i = 0; i < 10; i++) {
      //
      // unitBtn7Event: function(evt, state) {
      //   $(evt.currentTarget).addClass("btnClicked")
      //   var unitNum = 7
      //   loadProgressionUnit(unitNum)
      // }

    // }

    }
  },
  helperFunctions: {
    addEventListeners: function(page) {
      // console.log(stateContainer)
      $('.button').on("click",function(evt){

      Listener["pages"][page][evt.currentTarget.id.split("_")[0]+"Event"](evt)


      })

    }
  }
}
