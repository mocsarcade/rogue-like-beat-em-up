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
            if (this.getOffscreenMovement()) return this.getOffscreenMovement()
            var choices = [
                {x: -1},
                {x: +1},
                {y: -1},
                {y: +1}
            ]
            choices = this.pruneMovement(choices)
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
            if (this.getOffscreenMovement()) return this.getOffscreenMovement()
            var choices = [
                {x: -1},
                {x: +1},
                {y: -1},
                {y: +1}
            ]
            choices = this.pruneMovement(choices)
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
            if (this.getOffscreenMovement()) return this.getOffscreenMovement()
            var choices = [
                {x: -1, y: -1},
                {x: -1, y: +1},
                {x: +1, y: -1},
                {x: +1, y: +1}
            ]
            choices = this.pruneMovement(choices)
            return choices[Math.floor((Math.random() * choices.length))]
        }
    },
    FAST_BAT: {
        sprite: DATA.SPRITES.MONSTERS.BAT,
        color: DATA.COLORS.PINK,
        health: 1,
        strength: 1,
        movement: function () {
            if (this.getOffscreenMovement()) return this.getOffscreenMovement()
            var choices = [
                {x: -2},
                {x: +2},
                {y: -2},
                {y: +2}
            ]
            choices = this.pruneMovement(choices)
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
            if (this.getOffscreenMovement()) return this.getOffscreenMovement()
            var choices = [
                {x: -1},
                {x: +1},
                {y: -1},
                {y: +1}
            ]
            choices = this.pruneMovement(choices)
            return choices[Math.floor((Math.random() * choices.length))]
        }
    },
    SKELETON: {
        sprite: DATA.SPRITES.MONSTERS.SKELETON, //Temp until we get an image
        color: DATA.COLORS.WHITE,
        health: 1,
        strength: 1,
        movement: function () {
            if (this.getOffscreenMovement()) return this.getOffscreenMovement()
            var choices = [
                {x: -1},
                {x: +1},
                {y: -1},
                {y: +1}
            ]
            choices = this.pruneMovement(choices)
            return choices[Math.floor((Math.random() * choices.length))]
        }
    },
    NECROMANCER: {
        sprite: DATA.SPRITES.MONSTERS.NECROMANCER, //Temp until we get an image
        color: DATA.COLORS.WHITE,
        health: 1,
        strength: 1,
        turnCounter: function() {
            this.turn = this.turn +  1
            if (this.turn = 7) {
                this.phase = false
                this.turn = 0
                raiseSkeleton() //Need a raise skeleton function
            } else {
                this.phase = true
            }
        }
        movement: function () {
            if (this.getOffscreenMovement()) return this.getOffscreenMovement()
            var choices = [
                {x: -1},
                {x: +1},
                {y: -1},
                {y: +1}
            ]
            choices = this.pruneMovement(choices)
            return choices[Math.floor((Math.random() * choices.length))]
        }
    },
    NECROMANCER_BIG: {
        sprite: DATA.SPRITES.MONSTERS.NECROMANCER, //Temp until we get an image
        color: DATA.COLORS.BLACK,
        health: 2,
        strength: 1,
        turnCounter: function() {
            this.turn = this.turn +  1
            if (this.turn = 7) {
                this.phase = false
                this.turn = 0
                raiseSkeleton() //Need a raise skeleton function
            } else {
                this.phase = true
            }
        }
        movement: function () {
            if (this.getOffscreenMovement()) return this.getOffscreenMovement()
            var choices = [
                {x: -1},
                {x: +1},
                {y: -1},
                {y: +1}
            ]
            choices = this.pruneMovement(choices)
            return choices[Math.floor((Math.random() * choices.length))]
        }
    },

}
