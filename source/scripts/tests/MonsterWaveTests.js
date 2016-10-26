import Expect from "expect.js"

import Game from "scripts/model/Game.js"
import MonsterWave from "scripts/model/MonsterWave.js"

export default function MonsterWaveTests() {
    var game = new Game({
        waves: [
            {
                capacity: 4,
                monsters: [{}],
            }
        ]
    })

    Expect(game.waves[0]).not.to.be(undefined)
    Expect(game.waves[0]).to.be.an(MonsterWave)

    Expect(game.monsters.length).to.be(0)
    game.waves[0].onAction()
    Expect(game.monsters.length).not.to.be(0)

    // expect(game.monsters.length).to.be(game.wave.capacity)
}
