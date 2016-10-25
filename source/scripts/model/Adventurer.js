import DATA from "scripts/data"

import ShortID from "shortid"

import Effect from "scripts/model/Effect.js"
import AnimatedSprite from "scripts/utility/AnimatedSprite.js"

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
        
        this.wave = 0
        // this number changes depending on what room you actually move into
        // this number is used to lock your movement into this room
        // that movement is NOT locked to move up if you killed all the baddies
        // when you move up, it'll set this number again, moving the camera up
        // the wave of enemies is populated using this number.
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
        
        var didSomething = false
        
        // collision with room
        if(this.position.x + movement.x < DATA.FRAME.WIDTH * 0
        || this.position.x + movement.x >= DATA.FRAME.WIDTH * 1) {
            movement.x = 0
        }
        if(this.position.y + movement.y < DATA.FRAME.HEIGHT * this.wave) {
            if(!!this.game
            && !!this.game.waves
            && !!this.game.waves[this.wave]) {
                if(this.game.waves[this.wave] > 0) {
                    movement.y = 0
                }
            } else {
                movement.y = 0
            }
        }
        if(this.position.y + movement.y >= DATA.FRAME.HEIGHT * (this.wave + 1)) {
            movement.y = 0
        }

        // collision with monsters
        this.game.monsters.forEach((monster) => {
            if(this.position.x + movement.x == monster.position.x
            && this.position.y + movement.y == monster.position.y) {
                monster.handleAttack(1)
                
                didSomething = true
                
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
        this.position.x += movement.x
        this.position.y += movement.y
        
        // waves
        this.wave = Math.floor(this.position.y / DATA.FRAME.HEIGHT) * -1
        
        // camera
        if(!!this.game) {
            if(!!this.game.camera) {
                this.game.camera.position.x = DATA.FRAME.WIDTH * 0.5
                this.game.camera.position.y = DATA.FRAME.HEIGHT * (-1 * this.wave + 0.5)
            }
        }
        
        // signaling
        if(didSomething || movement.x != 0 || movement.y != 0) {
            this.game.onAction()
        }
    }
}
