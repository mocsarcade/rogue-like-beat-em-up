import ShortID from "shortid"

import Adventurer from "scripts/model/Adventurer.js"
import Monster from "scripts/model/Monster.js"
import MonsterWave from "scripts/model/MonsterWave.js"
// import Dungeon from "scripts/model/Dungeon.js"
import Camera from "scripts/model/Camera.js"

import DATA from "scripts/data"

export default class Game {
    constructor(game = new Object(), state) {
        this.protogame = JSON.parse(JSON.stringify(game))
        this.state = state

        this.adventurer = new Adventurer(this, game.adventurer || {
            position: {x: 3, y: 3},
        })

        this.tiles = []
        if(!!game.waves) {
            game.waves.forEach((wave, index) => {
                if(wave.tiles instanceof Array) {
                    wave.tiles.forEach((tile) => {
                        tile.position.y += DATA.FRAME.HEIGHT * index * -1
                        tile.key = Math.floor(Math.random() * 1000)
                        this.tiles.push(tile)
                    })
                }
            })
            this.waves = game.waves.map((wave) => {
                return new MonsterWave(this, wave)
            })
        }

        this.monsters = new Array()
        if(game.monsters instanceof Array) {
            this.monsters = game.monsters.map((monster) => {
                return new Monster(this, monster)
            })
        }
        
        // TODO: Initialize this
        // from the parameters.
        this.rooms = [
            {
                position: {x: 3.5, y: 3.5},
                width: DATA.FRAME.WIDTH,
                height: DATA.FRAME.HEIGHT
            },
            {
                position: {x: 3.5, y: -3.5},
                width: DATA.FRAME.WIDTH,
                height: DATA.FRAME.HEIGHT
            },
        ]
        
        this.camera = new Camera({
            position: {x: 3.5, y: 3.5}
        })
    }
    add(name, entity) {
        entity.game = this
        entity.key = entity.key || ShortID.generate()

        this[name] = this[name] || []
        this[name].push(entity)
    }
    remove(name, entity) {
        this[name].splice(this[name].indexOf(entity), 1)
    }
    // Returns a big list of every
    // entity in the game, which
    // is used for rendering.
    get entities() {
        return (
            new Array()
                .concat(this.tiles || [])
                .concat(this.monsters || [])
                .concat(this.adventurer)
                .concat(this.effects || [])
        )
    }
    // This method is called
    // once every frame, and
    // is passed a delta in ms.
    onFrameLoop(delta, inputs) {

        // Update the adventurer.
        this.adventurer.update(delta, inputs)

        // Update any effects.
        if(!!this.effects) {
            this.effects.forEach((effect) => {
                effect.update(delta)
            })
        }

    }
    // This method is called
    // after the adventurer
    // has taken an action
    // for the turn.
    onAction() {

        // Update all the monsters
        if(this.monsters instanceof Array) {
            this.monsters.forEach((monster) => {
                if(!monster.isDead) {
                    if(monster.onAction instanceof Function) {
                        monster.onAction()
                    }
                }
            })
        }

        // Update the wave.
        if(!!this.waves) {
            if(!!this.waves[this.adventurer.wave]) {
                this.waves[this.adventurer.wave].onAction()
            }
        }

    }
    getKillcount() {
        if(!!this.adventurer && !!this.waves) {
            if(!!this.waves[this.adventurer.wave]) {
                return this.waves[this.adventurer.wave].killcount
            } else {
                return "X"
            }
        }
        return "!!"
    }
    get wave() {
        return this.waves[this.adventurer.wave]
    }
    get message() {
        if(this.wave.specialMessage) {
            return this.waves[this.adventurer.wave].specialMessage
        } else if(this.wave.killcount == "X") {
            return "You beat all the rooms!!\nThanks for playing!"
        } else if(this.wave.killcount <= 0) {
            return "↑↑↑↑↑↑\nRoom cleared!\nMove up to next room."
        } else if(this.wave.message) {
            return this.waves[this.adventurer.wave].message
        }
    }
    reset(position) {
        if(!!position) {
            this.protogame.adventurer.position = position
        }
        this.state.game = new Game(this.protogame, this.state)
        this.state.game.camera.lookAt(this.state.game.adventurer)
    }
}
