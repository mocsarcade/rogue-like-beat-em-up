import Expect from "expect.js"

import Game from "scripts/model/Game.js"

import MONSTERS from "scripts/data/monsters.js"

import DATA from "scripts/data/index.js"

export default function ThiefTest() {

    // We are a testing a game.

    var game = new Game({

        // A game with an adventurer.
        adventurer: {
            position: {x: 3, y: 3},
        },

        // A game with an adventurer and an orc.

        monsters: [
            {
                position: {x: 3, y: 2},
                protomonster: MONSTERS.BLUE_THIEF
            }
        ]

    })

    Expect(game.monsters[0].position).to.eql({x: 3, y: 2})
    Expect(game.adventurer.position).to.eql({x: 3, y: 3})

    game.monsters[0].onAction()
    game.adventurer.move({y: +1})

    Expect(game.monsters[0].position).to.eql({x: 3, y: 2})
    Expect(game.adventurer.position).to.eql({x: 3, y: 3})

    game.monsters[0].onAction()
    game.adventurer.move({y: +1})

    Expect(game.monsters[0].position).to.eql({x: 3, y: 2})
    Expect(game.adventurer.position).to.eql({x: 3, y: 3})

    game.monsters[0].onAction()
    game.adventurer.move({y: +1})

    Expect(game.monsters[0]).to.eql(undefined)
    Expect(game.adventurer.position).to.eql({x: 3, y: 3})

    game.adventurer.move({y: +1})

    Expect(game.monsters[0]).to.eql(undefined)
    Expect(game.adventurer.position).to.eql({x: 3, y: 4})
}
