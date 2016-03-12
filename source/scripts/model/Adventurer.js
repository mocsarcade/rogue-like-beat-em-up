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
        this.turnsPerSecond = adventurer.turnsPerSecond || 5
        this.runningDelta = 0
    }
    onLoop(delta) {
        this.runningDelta += delta
        if (this.runningDelta >= 1 / this.turnsPerSecond) {
            this.runningDelta = 0

            if (Keyb.isDown("W") ||
                Keyb.isDown("<up>")) {
                this.move({y: -1})
            }
            if (Keyb.isDown("S") ||
                Keyb.isDown("<down>")) {
                this.move({y: +1})
            }
            if (Keyb.isDown("A") ||
                Keyb.isDown("<left>")) {
                this.move({x: -1})
            }
            if (Keyb.isDown("D") ||
                Keyb.isDown("<right>")) {
                this.move({x: +1})
            }
            if (Keyb.isDown("<space>")) {
                this.move()
            }
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
