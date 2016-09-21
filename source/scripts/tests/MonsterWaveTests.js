import Expect from "expect.js"

import Game from "scripts/model/Game.js"
import MonsterWave from "scripts/model/MonsterWave.js"

export default function MonsterWaveTests() {
    var game = new Game()

    Expect(game.wave).not.to.be(undefined)
    Expect(game.wave).to.be.an(MonsterWave)

    Expect(game.monsters.length).to.be(0)
    game.wave.onAction()
    Expect(game.monsters.length).not.to.be(0)

    // expect(game.monsters.length).to.be(game.wave.capacity)
}
