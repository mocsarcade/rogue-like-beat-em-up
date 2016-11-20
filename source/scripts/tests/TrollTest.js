import Expect from "expect.js"

import Game from "scripts/model/Game.js"

import MONSTERS from "scripts/data/monsters.js"

import DATA from "scripts/data/index.js"

export default function TrollTest() {

    // We are a testing a game.

    var game = new Game({

        // A game with an adventurer.
        adventurer: {
            position: {x: 3, y: 3},
        },

        // A game with an adventurer and a troll.

        monsters: [
            {
                position: {x: 1, y: 1},
                protomonster: MONSTERS.WHITE_TROLL
            }
        ]

    })

    game.monsters[0].onAction()
    Expect(game.monsters[0].position).to.eql({x: 1, y: 2})
    game.monsters[0].onAction()
    Expect(game.monsters[0].position).to.eql({x: 1, y: 2})
    game.monsters[0].onAction()
    expect(game.monsters[0].position).to.eql({x: 1, y: 2})
    game.monsters[0].onAction()
    expect(game.monsters[0].position).to.eql({x: 1, y: 2})
    game.monsters[0].onAction()

    Expect(game.monsters[0].position).not.to.eql({x: 1, y: 1})
    Expect(game.monsters[0].position.x).not.to.be.below(0)
    Expect(game.monsters[0].position.y).not.to.be.below(0)
    Expect(game.monsters[0].position.x).not.to.be.above(DATA.FRAME.WIDTH)
    Expect(game.monsters[0].position.y).not.to.be.above(DATA.FRAME.HEIGHT)

    // Put assertions here that test your code!
}
