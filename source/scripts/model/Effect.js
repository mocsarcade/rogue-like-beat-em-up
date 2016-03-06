var Media = require("../Media.js")
var Geometry = require("./Geometry.js")
var ShortID = require("shortid")

class Effect {
    constructor(protoeffect = new Object()) {
        this.position = new Geometry.Point(protoeffect.position)
        this.game = protoeffect.game || undefined
        
        this.id = ShortID.generate()
        
        this.height = 2
        this.anchor = {x: 0, y: 1}
        
        this.shape = Media.images.shapes.effects.general[0]
        this.color = "#FFF"
        this.stack = 3
        
        this.time = 0.1
    }
    update(delta) {
        this.time -= delta
        if(this.time <= 0) {
            var index = this.game.effects.indexOf(this)
            this.game.effects.splice(index, 1)
        }
    }
}

module.exports = Effect
