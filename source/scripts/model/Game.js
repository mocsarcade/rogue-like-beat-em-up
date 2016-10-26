import ShortID from "shortid"

import Adventurer from "scripts/model/Adventurer.js"
import Monster from "scripts/model/Monster.js"
import MonsterWave from "scripts/model/MonsterWave.js"
// import Dungeon from "scripts/model/Dungeon.js"
import Camera from "scripts/model/Camera.js"

import DATA from "scripts/data"

export default class Game {
    constructor(game = {}) {

        this.adventurer = new Adventurer(this, game.adventurer || {
            position: {x: 3, y: 3},
        })

        if(!!game.waves) {
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
        this.tiles = [
            {
                key: "1x1",
                color: DATA.COLORS.WHITE,
                sprite: DATA.SPRITES.TERRAIN.DOT[0],
                position: {x: 1, y: 1}
            },
            {
                key: "5x5",
                color: DATA.COLORS.WHITE,
                sprite: DATA.SPRITES.TERRAIN.DOT[1],
                position: {x: 5, y: 5}
            },
            {
                key: "3x-3",
                color: DATA.COLORS.WHITE,
                sprite: DATA.SPRITES.TERRAIN.DOT[1],
                position: {x: 3, y: -4}
            },
        ]
        
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
                return "YOU WIN"
            }
        }
        return "!!"
    }
}
