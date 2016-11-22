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
        this.isSpawned = true


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
        this.grabCounter = monster.protomonster.grabCounter || function () {
        }
        this.turnCounter = monster.protomonster.turnCounter || function () {
            this.phase = !this.phase
        }
        this.onDeath = monster.protomonster.onDeath || function () {}

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

    getPosition() {
        return this.position
    }
    move(movement) {
        // initialization
        movement = movement || {}
        movement.x = movement.x || 0
        movement.y = movement.y || 0



        // collision with the camera
        if(this.position.x + movement.x < DATA.FRAME.WIDTH * 0
        || this.position.x + movement.x >= DATA.FRAME.WIDTH * 1) {
            movement.x = 0
        }
        if(this.position.y + movement.y < DATA.FRAME.HEIGHT * this.game.adventurer.wave * -1
        || this.position.y + movement.y >= DATA.FRAME.HEIGHT * (this.game.adventurer.wave * -1 + 1)) {
            movement.y = 0
        }

        // collision with other monsters
        this.game.monsters.forEach((monster) => {
            if(monster != this) {
                if(!monster.isDead) {
                    if(monster.position.x == this.position.x + movement.x
                    && monster.position.y == this.position.y + movement.y) {
                        movement.x = 0
                        movement.y = 0
                    }
                }
            }
        })

        // collsiion with adventurer
        if(this.position.x + movement.x == this.game.adventurer.position.x
        && this.position.y + movement.y == this.game.adventurer.position.y) {
            this.game.adventurer.beAttacked()
            this.grabCounter()
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
            this.onDeath()
            this.isDead = true
            if(!!this.game) {
                if(!!this.game.waves && !!this.game.adventurer) {
                    if(!!this.game.waves[this.game.adventurer.wave]) {
                        this.game.waves[this.game.adventurer.wave].bumpKillcount()
                    }
                }
            }
            this.stack = -100
            this.opacity = 0.5
            this.color = DATA.COLORS.RED
            this.sprite = DATA.SPRITES.BLOOD[Math.floor(Math.random() * DATA.SPRITES.BLOOD.length)]
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
            if(this.outOfBounds(movementVector)) {
                choices = this.removeFromArray(choices, choice)
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
    outOfBounds(positionVector) {
        if (positionVector.x + this.position.x < 0) {
            return true
        }
        if (positionVector.x + this.position.x >= DATA.FRAME.WIDTH) {
            return true
        }
        if (positionVector.y + this.position.y < DATA.FRAME.HEIGHT * this.game.adventurer.wave * -1) {
            return true
        }
        if (positionVector.y + this.position.y >= DATA.FRAME.HEIGHT * (this.game.adventurer.wave * -1 + 1)) {
            return true
        }
        return false
    }
    getOffscreenMovement() {
        if(this.position.x < 0) {
            return {x: +1}
        }
        if(this.position.x >= DATA.FRAME.WIDTH) {
            return {x: -1}
        }
        if(this.position.y < DATA.FRAME.HEIGHT * this.game.adventurer.wave * -1) {
            return {y: +1}
        }
        if(this.position.y >= DATA.FRAME.HEIGHT * (this.game.adventurer.wave * -1 + 1)) {
            return {y: -1}
        }
        return false
    }
}
