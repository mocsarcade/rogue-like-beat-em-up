var Keyb = require("keyb")
var Media = require("../Media.js")
var Effect = require("./Effect.js")

class Adventurer {
    constructor(protoadventurer = new Object()) {
        this.position = protoadventurer.position || {x: 0, y: 0}
        this.game = protoadventurer.game || undefined
        
        this.anchor = {x: 0, y: 1}
        this.height = 2
        
        this.shape = Media.images.shapes.monsters[3]
        this.color = Media.colors.yellow
        this.transition = true
        this.stack = 2
        
        this.damage = 1
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
        
        // Handle collision between the adventurer
        // and the walls of the dungeon.
        
        var isOnSpace = this.game.dungeon.spaces.some((room) => {
            return room.contains({
                x: this.position.x + movement.x,
                y: this.position.y + movement.y
            })
        })
        
        if(!isOnSpace) {
            movement.x = 0
            movement.y = 0
        }
        
        // Handle collision between the adventurer
        // and the monsters in the dungeon.
        
        var monster = this.game.monsters.find((monster) => {
            if(this.position.x + movement.x == monster.position.x
            && this.position.y + movement.y == monster.position.y) {
                return true
            }
        })
        
        if(!!monster) {
            movement.x = 0
            movement.y = 0
            
            monster.takeDamage(this.damage)
            this.game.effects.push(new Effect({
                position: monster.position,
                game: this.game,
            }))
        }
        
        // Move the adventurer.
        
        this.position.x += movement.x
        this.position.y += movement.y
        
        if(this.game != undefined
        && this.game.camera != undefined) {
            this.game.camera.center(this.position)
        }
    }
}

module.exports = Adventurer
