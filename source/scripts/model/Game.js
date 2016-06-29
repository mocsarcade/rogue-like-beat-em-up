import ShortID from "shortid"

import Monster from "./Monster.js"
import Adventurer from "./Adventurer.js"

import DATA from "../DATA"
import MONSTERS from "../MONSTERS.js"

import {StutteredInput} from "../utility/Input.js"

class Tile {
    constructor(tile) {
        this.position = tile.position
        this.color = tile.color
    }
}

class Camera {
    constructor() {
        this.position = {x: 0, y: 0}
    }
    lookAt(entity) {
        this.position.x = entity.position.x + ((entity.width || 1) / 2)
        this.position.y = entity.position.y + ((entity.height || 1) / 2)
    }
}

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

        this.monsters = []
        // this.add("monsters", undefined, new Monster({
        //     protomonster: MONSTERS.RED_SLIME,
        //     position: {x: 1, y: 1},
        // }))
        // this.add("monsters", undefined, new Monster({
        //     protomonster: MONSTERS.BLUE_SLIME,
        //     position: {x: 3, y: 1},
        // }))

        this.tiles = []
        this.add("tiles", undefined, new Tile({
            position: {x: 1, y: 1},
            color: "#C00"
        }))

        this.camera = new Camera()
        this.camera.lookAt(this.adventurer)
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
                .concat(this.tiles || [])
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
    }
    onAction() {
        this.camera.lookAt(this.adventurer)

        this.monsters.forEach((monster) => {
            if(monster.action instanceof Function) {
                monster.action()
            }
        })
    }
}
