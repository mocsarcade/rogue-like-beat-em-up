////////////////////////////////////////////////////////
//    _____         _   _     _   _ _                //
//   |   __|___ ___| |_|_|___|_|_| |_|___ ___       //
//   |   __|   |  _|   | |  _| | . | | . |   |     //
//   |_____|_|_|___|_|_|_|_| |_|___|_|___|_|_|    //
//                                               //
//////////////////////////////////////////////////

import Afloop from "afloop"

import Input from "scripts/utility/Input.js"
import Render from "scripts/utility/Render.js"

import Game from "scripts/model/Game.js"
import Frame from "scripts/model/Frame.js"

import MONSTERS from "scripts/data/monsters.js"

window.Input = Input

var state = {
    frame: new Frame(),
    game: new Game({
        adventurer: {
            position: {
                x: 3, y: 3
            }
        },
        waves: [
            {
                capacity: 1,
                killcount: 1,
                monsters: [
                    MONSTERS.RED_ORC,
                    // MONSTERS.BLUE_ORC,
                    // MONSTERS.GREEN_ORC,
                    // MONSTERS.WHITE_TROLL,
                    // MONSTERS.RED_BAT,
                    // MONSTERS.BLUE_BAT,
                    // MONSTERS.GREEN_BAT,
                    // MONSTERS.FAST_BAT,
                    // MONSTERS.STONE_BAT,
                    // MONSTERS.RED_THIEF,
                    // MONSTERS.BLUE_THIEF,
                ]
            },
            {
                capacity: 5,
                killcount: 5,
                monsters: [
                    MONSTERS.RED_ORC,
                ]
            },
            {
                capacity: 4,
                killcount: 10,
                monsters: [
                    MONSTERS.RED_ORC,
                    MONSTERS.BLUE_ORC,
                ]
            }
        ]
    }),
}

var render = new Render()
var loop = new Afloop((delta) => {
    var inputs = Input.getInputs(delta)
    state.game.onFrameLoop(delta, inputs)
    render(state)
})




if(STAGE == "PRODUCTION") {
    require(["scripts/utility/Jukebox.js"], function(require) {
    })
}

// While in development, we expose the game state
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

// We run our tests in the same environment we
// run our game, namely, the browser. :)

if(STAGE == "DEVELOPMENT") {
    require("scripts/tests")
}
