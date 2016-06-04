var Keyb = require("keyb")
var ShortID = require("shortid")

var Media = require("../Media.js")
var IMAGE = Media.images.shapes.entities[1]
var COLOR = Media.colors.yellow

export default class Adventurer {
    constructor(protoadventurer) {
        protoadventurer = protoadventurer || {}

        this.transition = true
        this.position = protoadventurer.position || {x: 0, y: 0}
        this.game = protoadventurer.game

        this.shape = IMAGE
        this.color = COLOR

        this.key = ShortID.generate()
    }
    update() {
        if(Keyb.isJustDown("W")
        || Keyb.isJustDown("<up>")) {
            this.move({y: -1})
        }
        if(Keyb.isJustDown("S")
        || Keyb.isJustDown("<down>")) {
            this.move({y: +1})
        }
        if(Keyb.isJustDown("A")
        || Keyb.isJustDown("<left>")) {
            this.move({x: -1})
        }
        if(Keyb.isJustDown("D")
        || Keyb.isJustDown("<right>")) {
            this.move({x: +1})
        }
    }
    move(movement) {
        movement = movement || {}
        movement.x = movement.x || 0
        movement.y = movement.y || 0

        // var isInDungeon = this.game.dungeon.rooms.some((room) => {
        //     return room.contains({
        //         x: this.position.x + movement.x,
        //         y: this.position.y + movement.y
        //     })
        // })
        //
        // if(!isInDungeon) {
        //     movement.x = 0
        //     movement.y = 0
        //     return
        // }

        this.position.x += movement.x
        this.position.y += movement.y
    }
}
