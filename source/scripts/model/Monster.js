var Media = require("../Media.js")

class Monster {
    constructor(protomonster = new Object()) {
        this.position = protomonster.position || {x: 0, y: 0}
        this.game = protomonster.game || undefined
        
        this.anchor = {x: 0, y: 1}
        this.height = 2
        
        this.shape = Media.images.shapes.monsters[127]
        this.color = Media.colors.red
        this.transition = true
        this.stack = 1
        
        this.life = 3
    }
    takeDamage(damage = 0) {
        this.life -= damage
        if(this.life <= 0) {
            var index = this.game.monsters.indexOf(this)
            this.game.monsters.splice(index, 1)
        }
    }
}

module.exports = Monster
