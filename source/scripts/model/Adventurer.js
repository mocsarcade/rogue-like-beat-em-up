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
        this.stack = 5

        this.type = "Adventurer"
        this.stage = 0
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

            // code used to test space linking
            //if (state.game.dungeon.spaces.some(
            //        s => s.color == "#FFF" || s.color == "#F00")) {
            //    state.game.dungeon.spaces = state.game.dungeon.spaces.filter(
            //        s => s.color != "#FFF" && s.color != "#F00")
            //} else {
            //    state.game.dungeon.spaces = state.game.gen.agents.map(s => s.space)
            //}
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
            }
        })
    }
}

module.exports = Adventurer
