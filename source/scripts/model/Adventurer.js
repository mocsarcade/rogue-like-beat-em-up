import DATA from "scripts/data"

import ShortID from "shortid"

import Effect from "scripts/model/Effect.js"
import AnimatedSprite from "scripts/utility/AnimatedSprite.js"
import MONSTERS from "scripts/data/monsters.js"

export default class Adventurer {
    constructor(game, protoadventurer) {
        protoadventurer = protoadventurer || {}

        this.inputs = protoadventurer.inputs || {}
        this.game = game

        this.key = "adventurer"

        this.position = protoadventurer.position || {x: 0, y: 0}

        this.transition = true
        this.color = DATA.COLORS.YELLOW
        this.sprite = DATA.SPRITES.MONSTERS.ADVENTURER[0]
        this.instance = ShortID.generate()

        this.maxhealth = 3
        this.health = this.maxhealth
        this.grabbed = false
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
            this.grabbed = monster.grabbed
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

                this.game.add("effects", new Effect({
                    sprite: new AnimatedSprite({
                        images: DATA.SPRITES.EFFECTS.SLICE,
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
        })

        // collision with dungeon
        if(this.game.tiles instanceof Array) {
            var key = (this.position.x + movement.x) + "x" + (this.position.y + movement.y)
            if(this.game.tiles[key] != undefined) {
                if(this.game.tiles[key].isCollideable) {
                    movement.x = 0
                    movement.y = 0
                }
            }
        }

        // translation


        //once i get this.grabbed to update properly i will uncomment the next two comments
        //if(!this.grabbed) {
        this.position.x += movement.x
        this.position.y += movement.y
        //}
        this.game.onAction()

    }
}
