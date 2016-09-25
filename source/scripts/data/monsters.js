import DATA from "scripts/data"

export default {
    RED_SLIME: {
        sprite: DATA.SPRITES.MONSTERS.SLIME,
        color: DATA.COLORS.RED,
        health: 1,
        strength: 1,
        movement: function (target, current) {
            var dx = target.x - current.x
            var dy = target.y - current.y

            if(Math.abs(dx) > Math.abs(dy)) {
                if(dx > 0) return {x: +1}
                if(dx < 0) return {x: -1}
            } else {
                if(dy > 0) return {y: +1}
                if(dy < 0) return {y: -1}
            }
        }
    },
    BLUE_SLIME: {
        sprite: DATA.SPRITES.MONSTERS.SLIME,
        color: DATA.COLORS.BLUE,
        health: 2,
        strength: 1,
        movement: function (target, current) {
            var dx = target.x - current.x
            var dy = target.y - current.y

            if(Math.abs(dx) > Math.abs(dy)) {
                if(dx > 0) return {x: +1}
                if(dx < 0) return {x: -1}
            } else {
                if(dy > 0) return {y: +1}
                if(dy < 0) return {y: -1}
            }
        }
    },
    RED_BAT: {
        sprite: DATA.SPRITES.MONSTERS.BAT,
        color: DATA.COLORS.RED,
        health: 1,
        strength: 1,
        movement: function (target, current) {
            return [
                {x: -1},
                {x: +1},
                {y: -1},
                {y: +1}
            ][Math.floor((Math.random() * 4))]
        }
    },
    BLUE_BAT: {
        sprite: DATA.SPRITES.MONSTERS.BAT,
        color: DATA.COLORS.BLUE,
        health: 1,
        strength: 1,
        movement: function (target, current) {
            return [
                {x: -1},
                {x: +1},
                {y: -1},
                {y: +1}
            ][Math.floor((Math.random() * 4))]
        }
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
    GREEN_BAT: {
        sprite: DATA.SPRITES.MONSTERS.BAT,
        color: DATA.COLORS.GREEN,
        health: 1,
        strength: 1,
        movement: function (target, current) {
            return [
                {x: -1, y: -1},
                {x: -1, y: +1},
                {x: +1, y: -1},
                {x: +1, y: +1},
            ][Math.floor((Math.random() * 4))]
        }
    },
    FAST_BAT: {
        sprite: DATA.SPRITES.MONSTERS.BAT,
        color: DATA.COLORS.PINK,
        health: 1,
        strength: 1,
        movement: function (target, current) {
            return [
                {x: -2},
                {x: +2},
                {y: -2},
                {y: +2},
            ][Math.floor((Math.random() * 4))]
        }
    },
}
