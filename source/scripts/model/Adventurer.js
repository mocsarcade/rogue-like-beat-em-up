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
        this.type = "adventurer"
        this.stage = 0
    }
    onLoop() {
        if (Keyb.isJustDown("W") ||
            Keyb.isJustDown("<up>")) {
            this.move({y: -1})
        }
        if (Keyb.isJustDown("S") ||
            Keyb.isJustDown("<down>")) {
            this.move({y: +1})
        }
        if (Keyb.isJustDown("A") ||
            Keyb.isJustDown("<left>")) {
            this.move({x: -1})
        }
        if (Keyb.isJustDown("D") ||
            Keyb.isJustDown("<right>")) {
            this.move({x: +1})
        }
        if (Keyb.isJustDown("<space>")) {
            this.move()
        }
    }
    onCollide(entity) {
        if(entity.type == "monster") {
            entity.takeDamage(this.strength)
            this.game.effects.push(new Effect({
                position: entity.position,
                game: this.game
            }))
        }
    }
    onDeath() {
        this.game.restart()
    }
    onHasMoved() {
        if(this.position.x == this.game.dungeon.stairs.position.x
        && this.position.y == this.game.dungeon.stairs.position.y) {
            this.game.advance()
        }

        this.game.camera.center(this.position)
        this.game.dungeon.monsters.forEach((monster) => {
            if(!!monster.takeAction) {
                monster.takeAction()
            } else if(!!monster.action) {
                monster.action()
            }
        })
    }
}

module.exports = Adventurer
