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
        // If Music is not playing, allow Bass Boost to be toggled
        if (stateContainer.playing == false) {
          stateContainer.enhanceBass= !stateContainer.enhanceBass;
          $(evt.currentTarget).toggleClass("btnClicked")
        }
        // If Music is playing, add "already playing" Bass Boost
        if (stateContainer.playing == true) {
          // stateContainer.enhanceBass= !stateContainer.enhanceBass;
          // Add gray out class
          $(evt.currentTarget).addClass("btnDisabled")
          $(evt.currentTarget).html("<p> Stop Playback First </p>")
        }

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
          // stateContainer.resolvePromisePrematurely = true
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
        stateContainer.progressionIsATriad = false
        loadProgressionUnit(unitNum)
      },
      backBtnEvent: function(evt) {
        $(evt.currentTarget).addClass("btnClicked")
        MUSChoice()
      },
      // dynamically load all progression units buttin
      triadBtnEvent: function(evt) {
        var unitNum = evt.currentTarget.id.split("_")[1]
        console.log(evt)
        $(evt.currentTarget).addClass("btnClicked")
        stateContainer.progressionIsATriad = true
        loadProgressionUnit(unitNum)
      },

      // dynamically load all MUS selection buttin
      Mus505BtnEvent: function(evt) {
        console.log(evt)
        $(evt.currentTarget).addClass("btnClicked")
        stateContainer.Mus = "505"
        loadMenuUI()
      },
      Mus506BtnEvent: function(evt) {
        console.log(evt)
        $(evt.currentTarget).addClass("btnClicked")
        stateContainer.Mus = "506"
        loadMenuUI()
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
      $('.button').on("click", function(evt) {
        Listener["pages"][page][evt.currentTarget.id.split("_")[0] + "Event"](evt)
      })

    }
  }
}
