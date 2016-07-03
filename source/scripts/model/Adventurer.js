import DATA from "../DATA.js"

import ShortID from "shortid"

import Effect from "./Effect.js"
import AnimatedSprite from "../utility/AnimatedSprite.js"

export default class Adventurer {
    constructor(protoadventurer) {
        protoadventurer = protoadventurer || {}

        this.inputs = protoadventurer.inputs
        this.game = protoadventurer.game

        this.position = protoadventurer.position || {x: 0, y: 0}
        this.transition = true
        this.color = DATA.COLORS.YELLOW
        this.sprite = DATA.IMAGES.ADVENTURER
        this.instance = ShortID.generate()

        this.maxhealth = 3
        this.health = this.maxhealth
    }
    update(delta) {
        for(var key in this.inputs) {
            if(!!this.inputs[key].update) {
                this.inputs[key].update(delta)
            }
        }

        if(this.inputs.north.isDown(delta)) {
            this.move({y: -1})
        }
        if(this.inputs.south.isDown(delta)) {
            this.move({y: +1})
        }
        if(this.inputs.west.isDown(delta)) {
            this.move({x: -1})
        }
        if(this.inputs.east.isDown(delta)) {
            this.move({x: +1})
        }
        if(this.inputs.wait.isDown(delta)) {
            this.move()
        }
    }
    move(movement) {
        // initialization
        movement = movement || {}
        movement.x = movement.x || 0
        movement.y = movement.y || 0

        this.animation = false

        // collision with monsters
        this.game.monsters.forEach((monster) => {
            if(this.position.x + movement.x == monster.position.x
            && this.position.y + movement.y == monster.position.y) {
                monster.handleAttack(1)

                //this.instance = ShortID.generate()
                if(movement.x < 0 && movement.y == 0) {
                    this.animation = "attack-westwards"
                } else if(movement.x > 0 && movement.y == 0) {
                    this.animation = "attack-eastwards"
                } else if(movement.x == 0 && movement.y < 0) {
                    this.animation = "attack-northwards"
                } else if(movement.x == 0 && movement.y > 0) {
                    this.animation = "attack-southwards"
                }
                this.game.add("effects", undefined, new Effect({
                    sprite: new AnimatedSprite({
                        isLoop: false,
                        timing: 20,
                        images: [
                            DATA.IMAGES.SLASH_1,
                            DATA.IMAGES.SLASH_2,
                            DATA.IMAGES.SLASH_3,
                        ]
                    }),
                    position: {
                        x: this.position.x + movement.x,
                        y: this.position.y + movement.y,
                    }
                }))
                movement.x = 0
                movement.y = 0
            }
        })

        // collision with dungeon
        if(this.game.tiles.some((tile) => {
            return this.position.x + movement.x == tile.position.x
                && this.position.y + movement.y == tile.position.y
        }) == false) {
            movement.x = 0
            movement.y = 0
        }

        // translation
        this.position.x += movement.x
        this.position.y += movement.y

        this.game.onAction()
    }
}
