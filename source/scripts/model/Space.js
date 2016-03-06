var Entity = require("./Entity.js")

class Space extends Entity {
    constructor(space) {
        super(space)
        
        this.color = space.color || "#444"
    }
    contains(position) {
        return position.x >= this.position.x
            && position.x < this.position.x + this.width
            && position.y >= this.position.y
            && position.y < this.position.y + this.height
    }
}

module.exports = Space
