import ShortID from "shortid"

import Monster from "./Monster.js"
import Adventurer from "./Adventurer.js"

import DATA from "../DATA"
import MONSTERS from "../MONSTERS.js"

import {StutteredInput} from "../utility/Input.js"

export default class Game {
    constructor() {
        this.add("adventurer", false, new Adventurer({
            inputs: {
                "north": new StutteredInput("<up>", 200),
                "south": new StutteredInput("<down>", 200),
                "west": new StutteredInput("<left>", 200),
                "east": new StutteredInput("<right>", 200),
                "wait": new StutteredInput("<space>", 200),
            }
        }))

        this.add("monsters", undefined, new Monster({
            protomonster: MONSTERS.RED_SLIME,
            position: {x: 1, y: 1},
        }))
        this.add("monsters", undefined, new Monster({
            protomonster: MONSTERS.BLUE_SLIME,
            position: {x: 3, y: 1},
        }))
    }
    add(name, key, entity) {
        entity.game = this
        entity.key = key != undefined ? key : ShortID.generate()

        if(key === false) {
            this[name] = entity
        } else {
            this[name] = this[name] || []
            this[name].push(entity)
        }
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
                .concat(this.monsters || [])
                .concat(this.adventurer)
                .concat(this.effects || [])
        )
    }
    // This method can be
    // conditionally return
    // true when all assets
    // have been loaded and
    // initialized.
    get isReady() {
        return true
    }
    update(delta) {
        this.adventurer.update(delta)
        if(!!this.effects) {
            this.effects.forEach((effect) => {
                effect.update(delta)
            })
        }

        if(this.monsters.length < 4) {
            this.add("monsters", undefined, new Monster({
                protomonster: getRandomMonster(),
                position: getRandomPosition(),
            }))
        }
    }
}

var index = 0
function getRandomMonster() {
    return MONSTERS[Object.keys(MONSTERS)[++index % Object.keys(MONSTERS).length]]
}

function getRandomPosition() {
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
}
