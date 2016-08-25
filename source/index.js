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

// While  in development, we expose the game state
// to the window, so we can examine it from the
// javascript console. Please do not use this
// global variable elsewhere.

if(STAGE == "DEVELOPMENT") {
    window.state = state
}

import Afloop from "afloop"

import Render from "./scripts/utility/Render.js"

var render = new Render()
var loop = new Afloop((delta) => {
    if(state.game.isReady) {
        state.game.update(delta)
    }

    render(state)
})
