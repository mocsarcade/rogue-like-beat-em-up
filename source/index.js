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

////////////////////
///// Loading /////
//////////////////

class Spritesheet {
    constructor(source, width, height, callback) {
        var context = document.createElement("canvas").getContext("2d")

        context.canvas.width = width
        context.canvas.height = height

        var image = new Image()

        image.addEventListener("load", () => {
            this.images = new Object()
            this.rows = image.width / width
            this.columns = image.height / height
            for(var x = 0; x < this.rows; x += 1) {
                for(var y = 0; y < this.columns; y += 1) {
                    context.clearRect(0, 0, width, height)
                    context.drawImage(image, x * width, y * height, width, height, 0, 0, width, height)
                    this.images[x + "x" + y] = context.canvas.toDataURL("image/png")
                }
            }
            if(callback instanceof Function) {
                callback(this)
            }
        })

        image.src = source
    }
}

class AnimatedSprite {
    constructor(images, timing) {
        this.images = images
        this.index = 0
        this.delta = timing
        this.timing = timing
    }
    update(delta) {
        this.delta -= delta
        if(this.delta <= 0) {
            this.delta = this.timing
            this.index += 1
            this.index %= this.images.length
        }
    }
    toString() {
        return this.images[this.index]
    }
}

var animations = new Object()
var spritesheet = new Spritesheet(require("./images/entities.png"), 16, 24, function(spritesheets) {
    for(var x = 0; x < spritesheet.rows; x += 1) {
        for(var y = 0; y < spritesheet.columns; y += 2) {
            animations[x + "x" + (y / 2)] = new AnimatedSprite([
                spritesheet.images[x + "x" + y],
                spritesheet.images[x + "x" + (y + 1)],
            ], 300)
        }
    }
})

window.animations = animations
