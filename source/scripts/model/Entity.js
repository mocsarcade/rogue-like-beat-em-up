var ID = require("shortid")

class Entity {
    constructor(entity = new Object()) {
        this.id = entity.id || ID.generate()
        this.game = entity.game || undefined
        
        entity.position = entity.position || {}
        this.position = {}
        this.position.x = entity.position.x || 0
        this.position.y = entity.position.y || 0
        this.width = entity.width || 1
        this.height = entity.height || 1
    }
    get type() {
        return this.constructor.name
    }
}

module.exports = Entity
