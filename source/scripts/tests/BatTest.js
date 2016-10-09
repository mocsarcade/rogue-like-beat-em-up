import Expect from "expect.js"

import Game from "scripts/model/Game.js"

import MONSTERS from "scripts/data/monsters.js"
import DATA from "scripts/data/index.js"

export default function BatTest() {

    // We are a testing a game.

    var game = new Game({

        // A game with an adventurer.
        adventurer: {
            position: {x: 3, y: 3},
        },

        // A game with an adventurer and a bat.

        monsters: [
            {
                position: {x: 1, y: 1},
                protomonster: MONSTERS.RED_BAT
            }
        ]

        // Also, by purposefully forgetting to
        // pass a "wave" to the game, our test
        // won't be interrupted by other monsters
        // being spawned in.
    })

    Expect(game.monsters[0].position).to.be.eql({x: 1,y: 1})
    game.monsters[0].onAction()
    Expect(game.monsters[0].position).not.to.be.eql({x: 1,y: 1})
    Expect(game.monsters[0].position.x).not.to.be.below(0)
    Expect(game.monsters[0].position.y).not.to.be.below(0)
    Expect(game.monsters[0].position.x).not.to.be.above(DATA.FRAME.WIDTH)
    Expect(game.monsters[0].position.y).not.to.be.above(DATA.FRAME.HEIGHT)

}
