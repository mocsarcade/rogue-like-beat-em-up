var Keyb = require("keyb")
var Media = require("../Media.js")

class Adventurer {
    constructor(protoadventurer = new Object()) {
        this.position = protoadventurer.position || {x: 0, y: 0}
        this.game = protoadventurer.game
        
        this.shape = Media.images.shapes.entities[1]
        this.color = Media.colors.yellow
        this.transition = true
        this.stack = 1
        
        this.height = 2
        this.anchor = {x: 0, y: 1}
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
    move(movement = new Object()) {
        movement.x = movement.x || 0
        movement.y = movement.y || 0
        
        var isInDungeon = this.game.dungeon.rooms.some((room) => {
            return room.contains({
                x: this.position.x + movement.x,
                y: this.position.y + movement.y
            })
        })
        
        if(!isInDungeon) {
            movement.x = 0
            movement.y = 0
            return
        }
        
        this.position.x += movement.x
        this.position.y += movement.y
        
        if(this.game != undefined
        && this.game.camera != undefined) {
            this.game.camera.center(this.position)
        }
    }
}

module.exports = Adventurer
