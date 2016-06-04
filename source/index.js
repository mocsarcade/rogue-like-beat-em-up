////////////////////////////////////////////////////////
//    _____         _   _     _   _ _                //
//   |   __|___ ___| |_|_|___|_|_| |_|___ ___       //
//   |   __|   |  _|   | |  _| | . | | . |   |     //
//   |_____|_|_|___|_|_|_|_| |_|___|_|___|_|_|    //
//                                               //
//////////////////////////////////////////////////

import Game from "./scripts/model/Game.js"
var game = new Game({
    // ...
})

// While  in development, we expose the game state
// to the window, so we can examine it from the
// javascript console. Please do not use this
// global variable elsewhere.

if(STAGE == "DEVELOPMENT") {
    window.game = game
}

import Loop from "./scripts/utility/Loop.js"
import {Input} from "./scripts/utility/Input.js"
import Render from "./scripts/utility/Render.js"

var render = new Render()
var loop = new Loop((delta) => {
    game.update(delta)
    render({
        "game": game
    })
})

//var images = require("../loaders/spritesheet-loader.js!./images/entities.png")
cutSpritesheet(require("./images/entities.png"), 16, 24, function(spritesheet) {
    var uberspritesheet = new Object()
    for(var x = 0; x < spritesheet.rows; x += 1) {
        for(var y = 0; y < spritesheet.columns; y += 2) {
            uberspritesheet[x + "x" + (y / 2)] = {
                0: spritesheet.images[x + "x" + y],
                1: spritesheet.images[x + "x" + (y + 1)],
            }
        }
    }
})

function cutSpritesheet(source, width, height, callback) {
    var spritesheet = new Object()

    var context = document.createElement("canvas").getContext("2d")

    context.canvas.width = width
    context.canvas.height = height

    var image = new Image()

    image.addEventListener("load", function() {
        spritesheet.images = new Object()
        spritesheet.rows = image.width / width
        spritesheet.columns = image.height / height
        for(var x = 0; x < spritesheet.rows; x += 1) {
            for(var y = 0; y < spritesheet.columns; y += 1) {
                context.clearRect(0, 0, width, height)
                context.drawImage(image, x * width, y * height, width, height, 0, 0, width, height)
                spritesheet.images[x + "x" + y] = context.canvas.toDataURL("image/png")
            }
        }
        if(callback instanceof Function) {
            callback(spritesheet)
        }
    })

    image.src = source

    return spritesheet
}
