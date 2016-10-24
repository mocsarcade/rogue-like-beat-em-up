import Expect from "expect.js"

import Game from "scripts/model/Game.js"

import MONSTERS from "scripts/data/monsters.js"

import DATA from "scripts/data/index.js"

export default function NecromancerTest() {

    // We are a testing a game.

    var game = new Game({

        // A game with an adventurer.
        adventurer: {
            position: {x: 3, y: 3},
        },

        // A game with an adventurer and a Necromancer.

        monsters: [
            {
                position: {x: 3, y: 2},
                protomonster: MONSTERS.SMALL_NECROMANCER
            }
        ]

    })

    //Initial Positions
    Expect(game.monsters[0].position).to.eql({x: 3, y: 2})
    Expect(game.adventurer.position).to.eql({x: 3, y: 3})

    //Flee the Adventurer
    game.monsters[0].onAction()
    game.adventurer.move({y: +1})

    Expect(game.monsters[0].position).to.eql({x: 3, y: 1})
    Expect(game.adventurer.position).to.eql({x: 3, y: 4})

    //Wait 6 more turns 
    game.monsters[0].onAction()
    game.monsters[0].onAction()
    game.monsters[0].onAction()
    game.monsters[0].onAction()
    game.monsters[0].onAction()
    game.monsters[0].onAction()

    //Summon Skeleton
    Expect(game.monster[1])
    
}
