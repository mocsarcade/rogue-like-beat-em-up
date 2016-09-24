import DATA from "scripts/data"

import Effect from "scripts/model/Effect.js"
import AnimatedSprite from "scripts/utility/AnimatedSprite.js"
import Movement from "scripts/utility/Movement.js"

import ShortID from "shortid"

export default class Monster {
    constructor(monster) {
        this.key = "monster" + "-" + ShortID.generate()
        this.color = monster.protomonster.color || DATA.COLORS.PINK
        this.basesprite = monster.protomonster.sprite || DATA.SPRITES.MONSTERS.SLIME
        this.sprite = this.pickSprite()

        this.game = monster.game

        this.position = monster.position
        this.transition = true
        this.movement = monster.protomonster.movement

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
        this.phase = !this.phase
        this.sprite = this.pickSprite()

        this.animation = false

        if(this.phase == true) {
            switch(this.movement) {
            case "simplechase":
                this.move(Movement.getSimpleChaseMovement(this.game.adventurer.position, this.position))
                break
            case "wander":
            case "wander-orthogonal":
            case "wander-diagonal":
                this.move(Movement.getWanderMovement(Movement[this.movement.slice(7)].apply()))
            }
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
        }
    }
}
