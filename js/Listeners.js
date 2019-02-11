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
      bassBtnEvent: function(evt) {
          stateContainer.enhanceBass= !stateContainer.enhanceBass;
          $(evt.currentTarget).toggleClass("btnClicked")

        // if (stateContainer.enhanceBass == true) {
        //   console.log("removeClass")
        //   $(evt.currentTarget).removeClass("btnClicked")
        //   stateContainer.enhanceBass = false
        // }
        // else {
        //   $(evt.currentTarget).addClass("btnClicked")
        //   console.log("addClass")
        //   stateContainer.enhanceBass = true
        // }
      },
      playBtnEvent: function(evt) {
        // console.log(evt, stateContainer)
        // $(evt.currentTarget).toggleClass("btnClicked")
        // return (this.tog = !this.tog) ? playSelectedProgression(evt) : stopAllSound();
        // stopAllSound()
        // playSelectedProgression(evt)
        if (stateContainer.playing == true) {
          // console.log("removeClass")
                stopAllSound()
          $(evt.currentTarget).removeClass("btnClicked")
          stateContainer.playing = false
        }
        else {
                  playSelectedProgression(evt)
          $(evt.currentTarget).addClass("btnClicked")
          // console.log("addClass")
          stateContainer.playing = true
        }

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
        var unitNum = evt.currentTarget.id.split("_")[1]
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
      $('.button').on("click", function(evt) {

        Listener["pages"][page][evt.currentTarget.id.split("_")[0] + "Event"](evt)


      })

    }
  }
}
