import ShortID from "shortid"

import Monster from "./Monster.js"
import Adventurer from "./Adventurer.js"
import Camera from "./Camera.js"

import DATA from "scripts/data"
import MONSTERS from "scripts/data/monsters.js"

import {StutteredInput} from "../utility/Input.js"

const MINIMUM_MONSTER_COUNT = 4

export default class Game {
    constructor() {
        this.adventurer = new Adventurer({
            position: {x: 3, y: 3},
            game: this,
            inputs: {
                north: new StutteredInput("<up>"),
                south: new StutteredInput("<down>"),
                west: new StutteredInput("<left>"),
                east: new StutteredInput("<right>"),
                wait: new StutteredInput("<space>")
            },
        })

        this.monsters = []
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
    update(delta) {
        this.adventurer.update(delta)
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
        if(this.monsters instanceof Array) {
            this.monsters.forEach((monster) => {
                if(monster.action instanceof Function) {
                    monster.action()
                }
            })
            if(this.monsters.length < MINIMUM_MONSTER_COUNT) {
                this.add("monsters", new Monster({
                    protomonster: function getRandomMonster() {
                        return MONSTERS[Object.keys(MONSTERS)[Math.floor(Math.random() * Object.keys(MONSTERS).length)]]
                    }(),
                    position: function getRandomPosition() {
                        if(Math.random() < 0.5) {
                            return {
                                x: Math.random() < 0.5 ? -1 : DATA.FRAME.WIDTH,
                                y: Math.floor(Math.random() * DATA.FRAME.HEIGHT),
                            }
                        } else {
                            return {
                                x: Math.floor(Math.random() * DATA.FRAME.WIDTH),
                                y: Math.random() < 0.5 ? -1 : DATA.FRAME.HEIGHT,
                            }
                        }
                    }(),
                }))
            }
        }
    }
}
