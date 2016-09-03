////////////////////////////////////////////////////////
//    _____         _   _     _   _ _                //
//   |   __|___ ___| |_|_|___|_|_| |_|___ ___       //
//   |   __|   |  _|   | |  _| | . | | . |   |     //
//   |_____|_|_|___|_|_|_|_| |_|___|_|___|_|_|    //
//                                               //
//////////////////////////////////////////////////

import Game from "scripts/model/Game.js"
import Frame from "scripts/model/Frame.js"

var state = {
    frame: new Frame(),
    game: new Game(),
}

import Afloop from "afloop"

import Render from "scripts/utility/Render.js"

var render = new Render()
var loop = new Afloop((delta) => {
    state.game.update(delta)
    render(state)
})

// While  in development, we expose the game state
// to the window, so we can examine it from the
// javascript console. Please do not use this
// global variable elsewhere.

if(STAGE == "DEVELOPMENT") {
    window.state = state
}

// With every build, we include a "stats.json"
// that details the size of the build, the speed
// of the build, and most importantly, and errors
// that might have occurred during the build. We
// log them here.

if(STAGE == "DEVELOPMENT") {
    require("microajax")("stats.json", function(response) {
        var stats = JSON.parse(response.responseText)
        stats.errors.forEach((error) => {
            error = require("strip-ansi")(error)
            console.error(error)
        })
        stats.warnings.forEach((warning) => {
            warning = require("strip-ansi")(warning)
            console.warn(warning)
        })
    })
}
