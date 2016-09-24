import ShortID from "shortid"

import Adventurer from "scripts/model/Adventurer.js"
import MonsterWave from "scripts/model/MonsterWave.js"
// import Dungeon from "scripts/model/Dungeon.js"

import DATA from "scripts/data"
import MONSTERS from "scripts/data/monsters.js"

export default class Game {
    constructor(protogame) {
        protogame = protogame || new Object()

        this.adventurer = new Adventurer({
            position: {x: 3, y: 3},
            inputs: protogame.inputs,
            game: this,
        })

        this.wave = new MonsterWave({
            game: this,
            data: {
                capacity: 4,
                monsters: [
                    MONSTERS.RED_SLIME,
                    MONSTERS.BLUE_SLIME,
                    MONSTERS.RED_ORC,
                    MONSTERS.BLUE_ORC,
                    MONSTERS.GREEN_ORC,
                    MONSTERS.WHITE_TROLL,
                    MONSTERS.GREEN_BAT,
                    MONSTERS.PINK_BAT,
                ],
            }
        })

        this.monsters = new Array()

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
        ]
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
