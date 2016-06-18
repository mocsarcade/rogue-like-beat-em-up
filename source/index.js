    ////////////////////////////////////////////////////////
//    _____         _   _     _   _ _                //
//   |   __|___ ___| |_|_|___|_|_| |_|___ ___       //
//   |   __|   |  _|   | |  _| | . | | . |   |     //
//   |_____|_|_|___|_|_|_|_| |_|___|_|___|_|_|    //
//                                               //
//////////////////////////////////////////////////

import Game from "./scripts/model/Game.js"
import Frame from "./scripts/utility/Frame.js"

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

import Loop from "./scripts/utility/Loop.js"
import {Input} from "./scripts/utility/Input.js"
import Render from "./scripts/utility/Render.js"

var render = new Render()
var loop = new Loop((delta) => {
    if(state.game.isReady) {
        state.game.update(delta)
    }

    render(state)
})

// see monster death animation, or at least drop something
// see monster attack animations, move-forward-and-backwards
// monster ai, monster "tell" animation
// see tiled grid
// animate hero faster than animate monsters?
// monster ai sucks:
// - monster should move around other monster
// - monsters should move relative to where the others move?
