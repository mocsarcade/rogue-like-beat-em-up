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
        this.grabCounter = monster.protomonster.grabCounter || function () {
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

        // collision with the camera
        if(movement.x < 0 && this.position.x + movement.x < 0
        || movement.y < 0 && this.position.y + movement.y < 0
        || movement.x > 0 && this.position.x + movement.x >= DATA.FRAME.WIDTH
        || movement.y > 0 && this.position.y + movement.y >= DATA.FRAME.HEIGHT) {
            movement.x = 0
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
    pursuit() {
          //Variables for the monster and hero positions
        var monX = this.position.x
        var monY = this.position.y
        var adX = this.game.adventurer.position.x 
        var adY = this.game.adventurer.position.y
        //Translate coordinates to movement directions
        if (monX <= adX && (Math.abs(this.game.adventurer.position.x - this.position.x) > Math.abs(this.game.adventurer.position.y - this.position.y)))  {      
           return {x: +1}
        }
       if (monX >= adX && (Math.abs(this.game.adventurer.position.x - this.position.x) > Math.abs(this.game.adventurer.position.y - this.position.y))) {         
           return {x: -1}
        }
       if (monY <= adY && (Math.abs(this.game.adventurer.position.y - this.position.y) > Math.abs(this.game.adventurer.position.x - this.position.x))) {         
           return {y: +1}
        }
       if (monY >= adY && (Math.abs(this.game.adventurer.position.y - this.position.y) > Math.abs(this.game.adventurer.position.x - this.position.x))) {      
           return {y: -1}
        }
   }
    flee() {
           //Variables for the monster and hero positions
       var monX = this.position.x
       var monY = this.position.y
       var adX = this.game.adventurer.position.x 
       var adY = this.game.adventurer.position.y
       //Translate coordinates to movement directions
       if (monX <= adX && (Math.abs(this.game.adventurer.position.x - this.position.x) > Math.abs(this.game.adventurer.position.y - this.position.y)))  {      
           return {x: -1}
       }
       if (monX >= adX && (Math.abs(this.game.adventurer.position.x - this.position.x) > Math.abs(this.game.adventurer.position.y - this.position.y))) {         
           return {x: +1}
       }
       if (monY <= adY && (Math.abs(this.game.adventurer.position.y - this.position.y) > Math.abs(this.game.adventurer.position.x - this.position.x))) {         
           return {y: -1}
       }
       if (monY >= adY && (Math.abs(this.game.adventurer.position.y - this.position.y) > Math.abs(this.game.adventurer.position.x - this.position.x))) {      
           return {y: +1}
       }
   }
    handleAttack(damage) {
        this.health = this.health || 0
        this.health -= damage
        if(this.health <= 0) {
            this.isDead = true
            if(!!this.game) {
                if(!!this.game.wave) {
                    this.game.wave.bumpKillcount()
                }
            }
            this.stack = -100
            this.opacity = 0.5
            this.color = DATA.COLORS.RED
            this.sprite = DATA.SPRITES.BLOOD[Math.floor(Math.random() * DATA.SPRITES.BLOOD.length)]
        }
    }
    getOffscreenMovement() {
        if (this.position.x < 0) return {x: +1}
        if (this.position.x >= DATA.FRAME.WIDTH) return {x: -1}
        if (this.position.y < 0) return {y: +1}
        if (this.position.y >= DATA.FRAME.HEIGHT) return {y: -1}
        return false
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
            if (this.outOfBounds(movementVector)) {
                choices = this.removeFromArray(choices, choice)
            }
        }
        return choices
    }
    outOfBounds(positionVector) {

        if (positionVector.x + this.position.x < 0) {
            return true
        }
        if (positionVector.x + this.position.x >= DATA.FRAME.WIDTH) {
            return true
        }
        if (positionVector.y + this.position.y < 0) {
            return true
        }
        if (positionVector.y + this.position.y >= DATA.FRAME.HEIGHT) {
            return true
        }
        return false
    }
    removeFromArray(myarray, value) {
        var temp = myarray
        var index = temp.indexOf(value)
        delete temp[index]
        if (index > -1) temp.splice(index, 1)
        return temp
    }
}
