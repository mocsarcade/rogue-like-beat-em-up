import DATA from "scripts/data"

import Effect from "scripts/model/Effect.js"
import AnimatedSprite from "scripts/utility/AnimatedSprite.js"
import MONSTERS from "scripts/data/monsters.js"
import ShortID from "shortid"

export default class Monster {
    constructor(game, monster) {
        this.key = "monster" + "-" + ShortID.generate()
        this.color = monster.protomonster.color || DATA.COLORS.PINK
        this.basesprite = monster.protomonster.sprite || DATA.SPRITES.MONSTERS.SLIME
        this.sprite = this.pickSprite()

        this.game = game

        this.position = monster.position
        this.transition = true
        this.movement = monster.protomonster.movement || function () {
            var dx = this.game.adventurer.position.x - this.position.x
            var dy = this.game.adventurer.position.y - this.position.y

            if(Math.abs(dx) > Math.abs(dy)) {
                if(dx > 0) return {x: +1}
                if(dx < 0) return {x: -1}
            } else {
                if(dy > 0) return {y: +1}
                if(dy < 0) return {y: -1}
            }
        }
        this.turnCounter = monster.protomonster.turnCounter || function () {
            this.phase = !this.phase
        }

        this.health = monster.protomonster.health || 1


    }
    pickSprite() {
        if(this.phase == true) {
            return this.basesprite.ALPHA
        } else {
            return this.basesprite.OMEGA
        }
    }
    onAction() {
        this.phase = this.phase || false
        this.turnCounter()
        this.sprite = this.pickSprite()

        this.animation = false

        if(this.phase == true) {
            this.move(this.movement())
        }
    }
    move(movement) {
        // initialization
        movement = movement || {}
        movement.x = movement.x || 0
        movement.y = movement.y || 0

        // collision with other monsters
        this.game.monsters.forEach((monster) => {
            if(monster != this) {
                if(monster.position.x == this.position.x + movement.x
                && monster.position.y == this.position.y + movement.y) {
                    movement.x = 0
                    movement.y = 0
                }
            }
        })

        // collsiion with adventurer
        if(this.position.x + movement.x == this.game.adventurer.position.x
        && this.position.y + movement.y == this.game.adventurer.position.y) {
            if(movement.x < 0 && movement.y == 0) {
                this.animation = "attack-westwards"
            } else if(movement.x > 0 && movement.y == 0) {
                this.animation = "attack-eastwards"
            } else if(movement.x == 0 && movement.y < 0) {
                this.animation = "attack-northwards"
            } else if(movement.x == 0 && movement.y > 0) {
                this.animation = "attack-southwards"
            }
            this.game.add("effects", new Effect({
                sprite: new AnimatedSprite({
                    images: DATA.SPRITES.EFFECTS.SLASH,
                    isLoop: false,
                    timing: 20,
                }),
                position: {
                    x: this.position.x + movement.x,
                    y: this.position.y + movement.y,
                }
            }))
            movement.x = 0
            movement.y = 0
        }

        // translation
        this.position.x += movement.x
        this.position.y += movement.y
    }
    handleAttack(damage) {
        this.health = this.health || 0
        this.health -= damage
        if(this.health <= 0) {
            this.game.remove("monsters", this)
            if(this.basesprite == DATA.SPRITES.MONSTERS.BLUE_SLIME) {
                console.log("yay you killed a blue lime")
            }
            if(!!this.game) {
                if(!!this.game.waves && !!this.game.adventurer) {
                    if(!!this.game.waves[this.game.adventurer.wave]) {
                        this.game.waves[this.game.adventurer.wave].bumpKillcount()
                    }
                }
            }
        }
    }
    pruneMovement(choices) {
        for(var choice of choices) {
            var movementVector = {
                "x": choice.x || 0,
                "y": choice.y || 0
            }
            for(var monster of this.game.monsters) {
                if (monster.position.x == this.position.x + movementVector.x && monster.position.y == this.position.y + movementVector.y) {
                    choices = this.removeFromArray(choices, choice)
                }
            }
        }
        return choices
    }
    removeFromArray(myarray, value) {
        var temp = myarray
        var index = temp.indexOf(value)
        delete temp[index]
        if (index > -1) temp.splice(index, 1)
        return temp
    }
}
