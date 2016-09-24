import DATA from "scripts/data"

export default {
    RED_SLIME: {
        sprite: DATA.SPRITES.MONSTERS.SLIME,
        color: DATA.COLORS.RED,
        health: 1,
        strength: 1,
        movement: "simplechase"
    },
    BLUE_SLIME: {
        sprite: DATA.SPRITES.MONSTERS.SLIME,
        color: DATA.COLORS.BLUE,
        health: 2,
        strength: 1,
        movement: "simplechase"
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
        health: 2,
        strength: 1,
        movement: "wander-orthogonal"
    },
    PINK_BAT: {
        sprite: DATA.SPRITES.MONSTERS.BAT,
        color: DATA.COLORS.PINK,
        health: 1,
        strength: 2,
        movement: "wander-diagonal"
    }
}
