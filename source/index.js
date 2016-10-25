////////////////////////////////////////////////////////
//    _____         _   _     _   _ _                //
//   |   __|___ ___| |_|_|___|_|_| |_|___ ___       //
//   |   __|   |  _|   | |  _| | . | | . |   |     //
//   |_____|_|_|___|_|_|_|_| |_|___|_|___|_|_|    //
//                                               //
//////////////////////////////////////////////////

import Afloop from "afloop"

import Render from "scripts/utility/Render.js"
import KeyboardInput from "scripts/utility/inputs/KeyboardInput"

import Game from "scripts/model/Game.js"
import Frame from "scripts/model/Frame.js"

import MONSTERS from "scripts/data/monsters.js"

import DATA from "scripts/data"

var state = {
    frame: new Frame(),
    game: new Game({
        adventurer: {
            inputs: {
                // TODO: Save and load these inputs, so the
                // players can configure their inputs.
                north: new KeyboardInput(["<up>", "W"]),
                south: new KeyboardInput(["<down>", "S"]),
                west: new KeyboardInput(["<left>", "A"]),
                east: new KeyboardInput(["<right>", "D"]),
                wait: new KeyboardInput("<space>")
            },
            position: {
                x: 3, y: 3
            }
        },
        wave: {
            capacity: 4,
            monsters: [
                MONSTERS.RED_SLIME,
                MONSTERS.BLUE_SLIME,
                // MONSTERS.RED_ORC,
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
        }
    }),
}

var render = new Render()
var loop = new Afloop((delta) => {
    state.game.onFrameLoop(delta)
    render(state)
})




if(STAGE == "PRODUCTION") {
    var redTrack = new Audio(DATA.AUDIO.RED)
    var yellowTrack = new Audio(DATA.AUDIO.YELLOW)
    var purpleTrack = new Audio(DATA.AUDIO.PURPLE)


    //1.0 is normal speed
    //0.5 is half speed (slower)
    //2.0 is double speed (faster)
    //-1.0 is backwards, normal speed
    //-0.5 is backwards, half speed
    //when you switch rooms you should speed up or slow down the music to match the pace of the room
    redTrack.playbackRate = 1
    yellowTrack.playbackRate = 1
    purpleTrack.playbackRate = 1

    redTrack.play()

    redTrack.onended = function() {
        yellowTrack.play()
    }

    yellowTrack.onended = function() {
        purpleTrack.play()
    }

    purpleTrack.onended = function() {
        redTrack.play()
    }

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
