import ShortID from "shortid"

import Input from "scripts/utility/Input.js"

import Adventurer from "scripts/model/Adventurer.js"
import MonsterWave from "scripts/model/MonsterWave.js"

import MONSTERS from "scripts/data/monsters.js"

export default class Game {
    constructor() {
        this.adventurer = new Adventurer({
            position: {x: 3, y: 3},
            game: this,
            inputs: {
                north: new Input("<up>"),
                south: new Input("<down>"),
                west: new Input("<left>"),
                east: new Input("<right>"),
                wait: new Input("<space>")
            },
        })

        this.wave = new MonsterWave({
            game: this,
            data: {
                capacity: 4,
                monsters: [
                    MONSTERS.RED_SLIME,
                    MONSTERS.BLUE_SLIME,
                ],
            }
        })

        this.monsters = new Array()
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
    onFrameLoop(delta) {

        // Update the adventurer.
        this.adventurer.update(delta)

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
                if(monster.onAction instanceof Function) {
                    monster.onAction()
                }
            })
        }

        // Update the wave.
        this.wave.onAction()

    }
}
