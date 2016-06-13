import DATA from "../DATA.js"

import ShortID from "shortid"

export default class Adventurer {
    constructor(protoadventurer) {
        protoadventurer = protoadventurer || {}

        this.position = protoadventurer.position || {x: 2, y: 5}
        this.inputs = protoadventurer.inputs
        this.game = protoadventurer.game
        this.transition = true

        this.color = DATA.COLORS._YELLOW
        this.sprite = DATA.IMAGES.ADVENTURER

        this.instance = ShortID.generate()
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
                if(movement.x < 0 && movement.y == 0) {
                    this.animation = "attack-westwards"
                } else if(movement.x > 0 && movement.y == 0) {
                    this.animation = "attack-eastwards"
                } else if(movement.x == 0 && movement.y < 0) {
                    this.animation = "attack-northwards"
                } else if(movement.x == 0 && movement.y > 0) {
                    this.animation = "attack-southwards"
                }
                movement.x = 0
                movement.y = 0
            }
        })

        // collision with the camera
        if(movement.x < 0 && this.position.x + movement.x < 0
        || movement.y < 0 && this.position.y + movement.y < 0
        || movement.x > 0 && this.position.x + movement.x >= DATA.FRAME.WIDTH
        || movement.y > 0 && this.position.y + movement.y >= DATA.FRAME.HEIGHT) {
            movement.x = 0
            movement.y = 0
        }

        // translation
        this.position.x += movement.x
        this.position.y += movement.y

        this.game.monsters.forEach((monster) => {
            if(monster.action instanceof Function) {
                monster.action()
            }
        })
    }
}
