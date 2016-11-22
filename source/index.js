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
import DATA from "scripts/data"

window.Input = Input

var state = {}
state.frame = new Frame(),
state.game = new Game({
    adventurer: {
        position: {
            x: 3, y: 3
        }
    },
    waves: [
        {
            killcount: 0,
            specialMessage: [
                "Welcome to Enchiridion!",
                "All art and designs are WIP",
                "Move ↑↑↑ to the next room."
            ].join("\n")
        },
        // orcs
        {
            capacity: function() {
                if(this.killcount >= 9) {
                    return 1
                } else if(this.killcount >= 7) {
                    return 2
                } else if(this.killcount >= 5) {
                    return 3
                } else if(this.killcount >= 2) {
                    return 4
                }
            },
            killcount: 10,
            monsters: [
                MONSTERS.GREEN_METALGOLEM,
            ],
            message: "Room 1: METAL GOLEM Boss",
        },
        {
            capacity: 4,
            killcount: 10,
            monsters: [
                MONSTERS.RED_BAT,
                MONSTERS.RED_ORC,
            ],
            message: "Room 2: Orcs.. and Bats",
        },
        {
            capacity: 4,
            killcount: 10,
            monsters: [
                MONSTERS.RED_ORC,
                MONSTERS.BLUE_ORC,
            ],
            message: "Room 3: Lots of Orcs",
        },
        {
            capacity: 1,
            killcount: 1,
            monsters: [
                MONSTERS.GREEN_ORC,
            ],
            message: "Room 4: The Green Orc",
        },
        {
            killcount: 0,
            specialMessage: [
                "This is a respawn room!",
                "If you die, you'll return here."
            ].join("\n"),
            tiles: [
                {
                    color: DATA.COLORS.YELLOW,
                    sprite: DATA.SPRITES.TERRAIN.OCTOTHORPE,
                    position: {x: 3, y: 3}
                },
            ],
            isRespawnRoom: true
        },
        // bats
        {
            capacity: 4,
            killcount: 10,
            monsters: [
                MONSTERS.RED_BAT,
                MONSTERS.RED_BAT,
                MONSTERS.RED_BAT,
                MONSTERS.BLUE_BAT,
            ],
            message: "Room 5: Lots of Bats",
        },
        {
            capacity: 4,
            killcount: 10,
            monsters: [
                MONSTERS.RED_BAT,
                MONSTERS.GREEN_BAT,
                MONSTERS.GREEN_BAT,
                MONSTERS.GREEN_BAT,
            ],
            message: "Room 6: WTF Bats",
        },
        {
            capacity: 1,
            killcount: 1,
            monsters: [
                MONSTERS.FAST_BAT,
            ],
            message: "Room 7: WTAF Bats",
        },
        {
            killcount: 0,
            specialMessage: [
                "This is a respawn room!",
                "If you die, you'll return here."
            ].join("\n"),
            tiles: [
                {
                    color: DATA.COLORS.GREEN,
                    sprite: DATA.SPRITES.TERRAIN.OCTOTHORPE,
                    position: {x: 3, y: 3}
                },
            ],
            isRespawnRoom: true
        },
        {
            capacity: 4,
            killcount: 10,
            monsters: [
                MONSTERS.RED_THIEF,
            ],
            message: "Room 8: Kobold Thieves"
        },
        {
            capacity: 4,
            killcount: 10,
            monsters: [
                MONSTERS.RED_THIEF,
                MONSTERS.RED_THIEF,
                MONSTERS.BLUE_THIEF,
            ],
            message: "Room 8: Lots of Thieves"
        },
        {
            capacity: 4,
            killcount: 10,
            monsters: [
                MONSTERS.RED_SLIME,
            ],
            message: "Room 9: Gelatinous Slimes"
        },
        {
            capacity: function() {
                if(this.killcount == 3) {
                    return 1
                } else {
                    return 2
                }
            },
            killcount: 3,
            monsters: [
                MONSTERS.WHITE_TROLL,
            ],
            message: "Room 10: The Troll"
        },
    ]
}, state)

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
