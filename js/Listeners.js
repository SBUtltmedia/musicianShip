var Listener = {
  pages: {
    progressions: {
      checkBtnEvent: function(evt, state) {
        state.check = true
        //  console.log(this)
        $(evt.currentTarget).addClass("btnClicked")
        console.log("state.check", state)
        colorAnswerText(state)
        $('#answerBox').html(state.AnswerText)
      },
      menuBtnEvent: function(evt, state) {
        state.check = true
        //  console.log(this)
        $(evt.currentTarget).addClass("btnClicked")
        // also update the Answer box with a "dummy" previous answer, since the function requires an argument
        console.log("state.check", state)
      },
      playBtnEvent: function(evt, state) {
        $(evt.currentTarget).addClass("btnClicked")
        playSelectedProgression(evt, state)
      },
      backBtnEvent: function(evt, state) {
        $(evt.currentTarget).addClass("btnClicked")
        loadMenuUI(state)
      },
      nextBtnEvent: function(evt, state) {
        $(evt.currentTarget).addClass("btnClicked")
        setTimeout(function() {
          loadProgressionUnit(state.unit)
        }, 300);
      }
    },
    menu: {
      unitBtnEvent: function(evt, state) {
        $(evt.currentTarget).addClass("btnClicked")
        var unitNum = 7
        loadProgressionUnit(unitNum)
      }
    }
  },
  helperFunctions: {
    addEventListeners: function(state, page) {
      $('.button').each(function(index) {
        $(this).on("click", function(evt) {
          Listener.pages[page][this.id + "Event"](evt, state)
        })
      })
    }
  }
}
