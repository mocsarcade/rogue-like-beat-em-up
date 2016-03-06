var Media = require("../Media.js")
var Entity = require("./Entity.js")

class Effect extends Entity {
    constructor(effect) {
        super(effect)
        
        this.height = 2
        this.anchor = {x: 0, y: 1}
        
        this.shape = Media.images.shapes.effects.general[0]
        this.color = "#FFF"
        this.stack = 3
        
        this.time = 0.1
    }
    onLoop(delta) {
        this.time -= delta
        if(this.time <= 0) {
            var index = this.game.effects.indexOf(this)
            this.game.effects.splice(index, 1)
        }
    }
}

module.exports = Effect
