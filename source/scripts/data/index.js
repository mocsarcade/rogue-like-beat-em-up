export default {
    TILE: {
        WIDTH: 18,
        HEIGHT: 18,
    },
    FRAME: {
        WIDTH: 7,
        HEIGHT: 7,
    },
    COLORS: {
        WHITE: "#EEEEEE",
        YELLOW: "#F9D300",
        GREEN: "#0ECB3E",
        BLUE: "#00A7CB",
        RED: "#CB0000",
        BROWN: "#8D4633",
        GRAY: "#666666",

        BLACK: "#222222",
        PINK: "#FF69B4",
        YELLOW: "#DEB74A",
        RED: "#A52F22",
    },
    SPRITES: {
        MONSTERS: {
            ADVENTURER: [
                require("images/sprites/monsters/adventurer.png"),
            ],
            SLIME: {
                ALPHA: require("images/sprites/monsters/slime_alpha.png"),
                OMEGA:  require("images/sprites/monsters/slime_omega.png"),
            },
            ORC: {
                ALPHA: require("images/sprites/monsters/orc_alpha.png"),
                OMEGA:  require("images/sprites/monsters/orc_omega.png"),
            },
            TROLL: {
                ALPHA: require("images/sprites/monsters/troll_alpha.png"),
                OMEGA:  require("images/sprites/monsters/troll_omega.png"),
            },
            BAT: {
                ALPHA: require("images/bat_alpha.png"),
                OMEGA: require("images/bat_omega.png"),
            },
            SMALL_NECROMANCER: {
                ALPHA: require("images/sprites/monsters/necromancer_alpha.png"),
                OMEGA: require("images/sprites/monsters/necromancer_omega.png"),
            },
            BIG_NECROMANCER: {
                ALPHA: require("images/sprites/monsters/necromancer_alpha.png"),
                OMEGA: require("images/sprites/monsters/necromancer_omega.png"),
            },
            SKELETON: { 
                ALPHA: require("images/sprites/monsters/skeleton_alpha.png"),
                OMEGA: require("images/sprites/monsters/skeleton_omega.png"),
            },
            THIEF: {
                ALPHA: require("images/sprites/monsters/thief_alpha.png"),
                OMEGA:  require("images/sprites/monsters/thief_omega.png"),

            },
        },

        EFFECTS: {
            SLICE: [
                require("images/sprites/effects/slice-1.png"),
                require("images/sprites/effects/slice-2.png"),
                require("images/sprites/effects/slice-3.png"),
            ],
            SLASH: [
                require("images/sprites/effects/slash-1.png"),
                require("images/sprites/effects/slash-2.png"),
                require("images/sprites/effects/slash-3.png"),
            ],
        },
        TERRAIN: {
            OCTOTHORPE: [
                require("images/sprites/terrain/octothorpe.png"),
            ],
            DOT: [
                require("images/sprites/terrain/dot-1.png"),
                require("images/sprites/terrain/dot-2.png"),
            ],

            BLOOD: [
                require("images/sprites/terrain/Blood.png"),
               
            ],
        },

        
        BLOOD: [
            require("images/sprites/blood/0.png"),
            require("images/sprites/blood/1.png"),
            require("images/sprites/blood/2.png"),
            require("images/sprites/blood/3.png"),
            require("images/sprites/blood/4.png"),
            require("images/sprites/blood/5.png"),
            require("images/sprites/blood/6.png"),
            require("images/sprites/blood/7.png"),
            require("images/sprites/blood/8.png"),
            require("images/sprites/blood/9.png"),
            require("images/sprites/blood/10.png"),
            require("images/sprites/blood/11.png"),
            require("images/sprites/blood/12.png"),
            require("images/sprites/blood/13.png"),
        ],
    },
}

