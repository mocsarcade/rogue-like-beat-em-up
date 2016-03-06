var Keyb = require("keyb")
var Media = require("../Media.js")
var Effect = require("./Effect.js")
var Creature = require("./Creature.js")

class Adventurer extends Creature {
    constructor(adventurer = new Object()) {
        adventurer.health = adventurer.health || 3
        super(adventurer)
        
        this.shape = Media.images.shapes.monsters[3]
        this.color = Media.colors.yellow
        this.transition = true
        this.stack = 2
        
        this.type = "Adventurer"
    }
    onLoop() {
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
        if(Keyb.isJustDown("<space>")) {
            this.move()
        }
    }
    onCollide(entity) {
        if(entity.type == "Monster") {
            entity.takeDamage(this.strength)
            this.game.effects.push(new Effect({
                position: entity.position,
                game: this.game
            }))
        }
    }
    onDeath() {
        var adventurer = new Adventurer({
            position: {x: 0, y: 0},
            game: this.game
        })
        this.game.adventurer = adventurer
        this.game.camera.center(adventurer.position)
    }
    onHasMoved() {
        this.game.camera.center(this.position)
        this.game.monsters.forEach((monster) => {
            if(!!monster.takeAction) {
                monster.takeAction()
            }
        })
    }
}

module.exports = Adventurer
