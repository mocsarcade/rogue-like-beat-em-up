// This class is responsible for spawning the
// monsters to attack the adventurer. Each wave
// is given a limit of how many monsters it can
// spawn at any given time, how many monsters it
// can spawn before the wave is done, and an
// array of monsters to spawn.

// Someday, if we decide to pivot away from
// the arcade-like beat-em-up gameplay, we'll
// rewrite the dungeons to be responsible for
// instantiating the monsters. At that time,
// we can deprecate this class. But until
// then, enjoy the waves of monsters. :]

import DATA from "scripts/data"
import MONSTERS from "scripts/data/monsters.js"
import Monster from "scripts/model/Monster.js"

export default class MonsterWave {
    constructor(game, wave) {
        this.game = game

        // TODO: Change capacity from a variable
        // to a function of how many monsters have
        // already been killed, so the wave can
        // become more difficult during the wave.
        this._capacity = wave.capacity || 4
        this.monsters = wave.monsters || []

        this.killcount = wave.killcount
        if(this.killcount === undefined) {
            this.killcount = 10
        }

        this.message = wave.message
        this.specialMessage = wave.specialMessage
        this.isRespawnRoom = wave.isRespawnRoom
        this.tiles = wave.tiles || []
    }
    onAction() {
        if(this.monsters.length == 0) {
            return
        }

        // If attached to a game...
        if(this.game != undefined) {
            // If there are still monsters left to kill...
            if(this.getCapacity() < this.killcount) {
                // If, at the moment, the number of monsters is
                // less than the intended capacity of monsters...
                while(this.getCapacity() < this.capacity) {
                    // Then spawn a new monster in the game!
                    this.game.monsters.push(new Monster(this.game, {
                        protomonster: this.getRandomMonster(),
                        position: this.getRandomPosition(),
                    }))
                }
            }
        }
    }
    // Returns a random position to
    // spawn a monster, which should
    // generally be a position that
    // is just off-screen. This is
    // restricted to north, east
    // and west. Nothing will be
    // spawned to the south.
    getRandomPosition() {
        // TODO: Update this method to ensure it won't
        // collide with an already existing monster.
        if(Math.random() <= 0.333) {
            return {
                x: Math.floor(Math.random() * DATA.FRAME.WIDTH),
                y: (-1 * this.game.adventurer.wave * DATA.FRAME.HEIGHT) - 1,
            }
        } else {
            return {
                x: Math.random() < 0.5 ? -1 : DATA.FRAME.WIDTH,
                y: Math.floor(Math.random() * DATA.FRAME.HEIGHT) + (-1 * this.game.adventurer.wave * DATA.FRAME.HEIGHT)
            }
        }
    }
    // Returns a random monster
    // to be spawned. It randomizes
    // from the static pool of monsters
    // that was given for this wave.
    getRandomMonster() {
        // TODO: Update this method to optionally
        // use weighted randomness if a weight is
        // assigned to each monster in the wave.
        var index = Math.floor(Math.random() * this.monsters.length)
        return this.monsters[index]
    }
    bumpKillcount() {
        this.killcount -= 1
    }
    getCapacity() {
        return this.game.monsters.reduce((capacity, monster) => {
            return capacity + (monster.isDead ? 0 : 1)
        }, 0)
    }
    get capacity() {
        if(this._capacity instanceof Function) {
            return this._capacity()
        } else {
            return this._capacity
        }
    }
}
