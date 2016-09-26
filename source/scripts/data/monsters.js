import DATA from "scripts/data"

export default {
    RED_SLIME: {
        sprite: DATA.SPRITES.MONSTERS.SLIME,
        color: DATA.COLORS.RED,
        health: 1,
        strength: 1,
    },
    BLUE_SLIME: {
        sprite: DATA.SPRITES.MONSTERS.SLIME,
        color: DATA.COLORS.BLUE,
        health: 2,
        strength: 1,
    },
    RED_ORC: {
        sprite: DATA.SPRITES.MONSTERS.ORC,
        color: DATA.COLORS.RED,
        health: 1,
        strength: 1,
    },
    BLUE_ORC: {
        sprite: DATA.SPRITES.MONSTERS.ORC,
        color: DATA.COLORS.BLUE,
        health: 2,
        strength: 1,
    },
    GREEN_ORC: {
        sprite: DATA.SPRITES.MONSTERS.ORC,
        color: DATA.COLORS.GREEN,
        health: 3,
        strength: 1,
    },
    WHITE_TROLL: {
        sprite: DATA.SPRITES.MONSTERS.TROLL,
        color: DATA.COLORS.WHITE,
        health: 5,
        strength: 5,
    },
    RED_BAT: {
        sprite: DATA.SPRITES.MONSTERS.BAT,
        color: DATA.COLORS.RED,
        health: 1,
        strength: 1,
        movement: function () {
            if (this.moveOnScreen()) return this.moveOnScreen()

            var choices = [
                {x: -1},
                {x: +1},
                {y: -1},
                {y: +1}
            ]

            for(var monster of this.game.monsters) {
                if (monster.position.x == this.position.x - 1 && monster.position.y == this.position.y)
                    delete choices[choices.indexOf({x: -1})]
            }
            for(var monster of this.game.monsters) {
                if (monster.position.x == this.position.x + 1 && monster.position.y == this.position.y)
                    delete choices[choices.indexOf({x: +1})]
            }
            for(var monster of this.game.monsters) {
                if (monster.position.y == this.position.y - 1 && monster.position.x == this.position.x)
                    delete choices[choices.indexOf({y: -1})]
            }
            for(var monster of this.game.monsters) {
                if (monster.position.y == this.position.y + 1 && monster.position.x == this.position.x)
                    delete choices[choices.indexOf({y: +1})]
            }

            if (this.position.x == 0)
                delete choices[choices.indexOf({x: -1})]
            if (this.position.x == DATA.FRAME.WIDTH)
                delete choices[choices.indexOf({x: +1})]
            if (this.position.y == 0)
                delete choices[choices.indexOf({y: -1})]
            if (this.position.y == DATA.FRAME.HEIGHT)
                delete choices[choices.indexOf({y: +1})]

            return choices[Math.floor((Math.random() * choices.length))]
        }
    },
    BLUE_BAT: {
        sprite: DATA.SPRITES.MONSTERS.BAT,
        color: DATA.COLORS.BLUE,
        health: 1,
        strength: 1,
        turnCounter: function() {
            this.phase = true
        },
        movement: function () {
            if (this.moveOnScreen()) return this.moveOnScreen()

            var choices = [
                {x: -1},
                {x: +1},
                {y: -1},
                {y: +1}
            ]

            for(var monster of this.game.monsters) {
                if (monster.position.x == this.position.x - 1 && monster.position.y == this.position.y)
                    delete choices[choices.indexOf({x: -1})]
            }
            for(var monster of this.game.monsters) {
                if (monster.position.x == this.position.x + 1 && monster.position.y == this.position.y)
                    delete choices[choices.indexOf({x: +1})]
            }
            for(var monster of this.game.monsters) {
                if (monster.position.y == this.position.y - 1 && monster.position.x == this.position.x)
                    delete choices[choices.indexOf({y: -1})]
            }
            for(var monster of this.game.monsters) {
                if (monster.position.y == this.position.y + 1 && monster.position.x == this.position.x)
                    delete choices[choices.indexOf({y: +1})]
            }

            if (this.position.x == 0)
                delete choices[choices.indexOf({x: -1})]
            if (this.position.x == DATA.FRAME.WIDTH)
                delete choices[choices.indexOf({x: +1})]
            if (this.position.y == 0)
                delete choices[choices.indexOf({y: -1})]
            if (this.position.y == DATA.FRAME.HEIGHT)
                delete choices[choices.indexOf({y: +1})]

            return choices[Math.floor((Math.random() * choices.length))]
        }
    },
    GREEN_BAT: {
        sprite: DATA.SPRITES.MONSTERS.BAT,
        color: DATA.COLORS.GREEN,
        health: 1,
        strength: 1,
        turnCounter: function() {
            this.phase = true
        },
        movement: function () {
            if (this.moveOnScreen()) return this.moveOnScreen()

            var choices = [
                {x: -1, y: -1},
                {x: -1, y: +1},
                {x: +1, y: -1},
                {x: +1, y: +1},
            ]

            for(var monster of this.game.monsters) {
                if (monster.position.x == this.position.x - 1 && monster.position.y == this.position.y - 1)
                    delete choices[choices.indexOf({x: -1, y: -1})]
            }
            for(var monster of this.game.monsters) {
                if (monster.position.x == this.position.x - 1 && monster.position.y == this.position.y + 1)
                    delete choices[choices.indexOf({x: -1, y: +1})]
            }
            for(var monster of this.game.monsters) {
                if (monster.position.x == this.position.x + 1 && monster.position.y == this.position.y - 1)
                    delete choices[choices.indexOf({x: +1, y: -1})]
            }
            for(var monster of this.game.monsters) {
                if (monster.position.x == this.position.x + 1 && monster.position.y == this.position.y + 1)
                    delete choices[choices.indexOf({x: +1, y: +1})]
            }

            if (this.position.x == 0) {
                delete choices[choices.indexOf({x: -1, y: -1})]
                delete choices[choices.indexOf({x: -1, y: +1})]
            }
            if (this.position.x == DATA.FRAME.WIDTH) {
                delete choices[choices.indexOf({x: +1, y: -1})]
                delete choices[choices.indexOf({x: +1, y: +1})]
            }
            if (this.position.y == 0) {
                delete choices[choices.indexOf({x: -1, y: -1})]
                delete choices[choices.indexOf({x: +1, y: -1})]
            }
            if (this.position.y == DATA.FRAME.HEIGHT) {
                delete choices[choices.indexOf({x: -1, y: +1})]
                delete choices[choices.indexOf({x: +1, y: +1})]
            }

            return choices[Math.floor((Math.random() * choices.length))]
        }
    },
    FAST_BAT: {
        sprite: DATA.SPRITES.MONSTERS.BAT,
        color: DATA.COLORS.PINK,
        health: 1,
        strength: 1,
        movement: function () {
            if (this.moveOnScreen()) return this.moveOnScreen()

            var choices = [
                {x: -2},
                {x: +2},
                {y: -2},
                {y: +2}
            ]

            for(var monster of this.game.monsters) {
                if (monster.position.x == this.position.x - 2 && monster.position.y == this.position.y)
                    delete choices[choices.indexOf({x: -2})]
            }
            for(var monster of this.game.monsters) {
                if (monster.position.x == this.position.x + 2 && monster.position.y == this.position.y)
                    delete choices[choices.indexOf({x: +2})]
            }
            for(var monster of this.game.monsters) {
                if (monster.position.y == this.position.y - 2 && monster.position.x == this.position.x)
                    delete choices[choices.indexOf({y: -2})]
            }
            for(var monster of this.game.monsters) {
                if (monster.position.y == this.position.y + 2 && monster.position.x == this.position.x)
                    delete choices[choices.indexOf({y: +2})]
            }

            if (this.position.x == 0)
                delete choices[choices.indexOf({x: -2})]
            if (this.position.x == DATA.FRAME.WIDTH)
                delete choices[choices.indexOf({x: +2})]
            if (this.position.y == 0)
                delete choices[choices.indexOf({y: -2})]
            if (this.position.y == DATA.FRAME.HEIGHT)
                delete choices[choices.indexOf({y: +2})]

            return choices[Math.floor((Math.random() * choices.length))]
        }
    },
    STONE_BAT: {
        sprite: DATA.SPRITES.MONSTERS.BAT,
        color: DATA.COLORS.GRAY,
        health: 3,
        strength: 1,
        turnCounter: function() {
            this.turn = this.turn + (Math.floor((Math.random() * 3))) + 1 || 0
            if (this.turn >= 3) {
                this.phase = true
                this.turn = 0
            } else {
                this.phase = false
            }
        },
        movement: function () {
            if (this.moveOnScreen()) return this.moveOnScreen()

            var choices = [
                {x: -1},
                {x: +1},
                {y: -1},
                {y: +1}
            ]

            for(var monster of this.game.monsters) {
                if (monster.position.x == this.position.x - 1 && monster.position.y == this.position.y)
                    delete choices[choices.indexOf({x: -1})]
            }
            for(var monster of this.game.monsters) {
                if (monster.position.x == this.position.x + 1 && monster.position.y == this.position.y)
                    delete choices[choices.indexOf({x: +1})]
            }
            for(var monster of this.game.monsters) {
                if (monster.position.y == this.position.y - 1 && monster.position.x == this.position.x)
                    delete choices[choices.indexOf({y: -1})]
            }
            for(var monster of this.game.monsters) {
                if (monster.position.y == this.position.y + 1 && monster.position.x == this.position.x)
                    delete choices[choices.indexOf({y: +1})]
            }

            if (this.position.x == 0)
                delete choices[choices.indexOf({x: -1})]
            if (this.position.x == DATA.FRAME.WIDTH)
                delete choices[choices.indexOf({x: +1})]
            if (this.position.y == 0)
                delete choices[choices.indexOf({y: -1})]
            if (this.position.y == DATA.FRAME.HEIGHT)
                delete choices[choices.indexOf({y: +1})]

            return choices[Math.floor((Math.random() * choices.length))]
        }
    },

}
