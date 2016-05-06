////////////////////////////////////////////////////////
//    _____         _   _     _   _ _                //
//   |   __|___ ___| |_|_|___|_|_| |_|___ ___       //
//   |   __|   |  _|   | |  _| | . | | . |   |     //
//   |_____|_|_|___|_|_|_|_| |_|___|_|___|_|_|    //
//                                               //
//////////////////////////////////////////////////

var Game = require("./scripts/model/Game.js")

var state = new Object({
    game: new Game({
        // ...
    })
})

// While developing, we expose the game state
// to the window, so we can examine it via the
// browser javascript console. Please do not
// try to use this global variable elsewhere.
if(STAGE == "DEVELOPMENT") {
    window.state = state
}

import Loop from "./scripts/utility/Loop.js"
import {Input} from "./scripts/utility/Input.js"
import Render from "./scripts/render/Mount.js"

var inputs = {
    "move west": new Input(["D", "<right>"])
}

var render = new Render()
var loop = new Loop((delta) => {

    if(inputs["move west"].isStutteredDown()) {
        console.log("!")
    }

    state.game.update()
    render(state)
})

if(STAGE == "PRODUCTION") {
    document.addEventListener("keydown", function(event) {
        event.preventDefault()
    })
}
