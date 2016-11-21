import Expect from "expect.js"

import Game from "scripts/model/Game.js"

import MONSTERS from "scripts/data/monsters.js"
import DATA from "scripts/data/index.js"

export default function SpiderTest() {

    // Normal Spider test
    var game1 = new Game({
        adventurer: {
            position: {x: 3, y: 3},
        },
        monsters: [
            {
                position: {x: 1, y: 1},
                protomonster: MONSTERS.NORMAL_SPIDER
            }
        ]
    })

    Expect(game1.monsters[0].position).to.be.eql({x: 1,y: 1})
    game1.monsters[0].onAction()
    Expect(game1.monsters[0].position).to.be.eql({x: 2,y: 2})


    // Mother Spider test
    var game2 = new Game({
        adventurer: {
            position: {x: 3, y: 3},
        },
        monsters: [
            {
                position: {x: 2, y: 2},
                protomonster: MONSTERS.MOTHER_SPIDER
            }
        ]
    })

    Expect(game2.monsters[0].position).to.be.eql({x: 2,y: 2})
    game2.monsters[0].onAction()
    Expect(game2.monsters[0].position).to.be.eql({x: 1,y: 1})

}
