var ID = require("shortid")

class Entity {
    constructor(entity = new Object()) {
        this.id = entity.id || ID.generate()
        this.game = entity.game || undefined
        
        this.position = entity.position || {x: 0, y: 0}
        this.width = entity.width || 1
        this.height = entity.height || 1
        
        this.key = 0
    }
}

module.exports = Entity
