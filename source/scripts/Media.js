var Media = {
    images: {
        shapes: {
            monsters: {
                0: require("../images/shapes/monsters/0.png"),
                1: require("../images/shapes/monsters/1.png"),
                2: require("../images/shapes/monsters/2.png"),
                3: require("../images/shapes/monsters/3.png"),
                127: require("../images/shapes/monsters/127.png"),
                bats: {
                    0: require("../images/shapes/monsters/82.png"),
                    1: require("../images/shapes/monsters/101.png"),
                },
            },
            effects: {
                general: [
                    require("../images/shapes/effects/general/0.png"),
                ],
            },
            terrain: {
                stairs: [
                    require("../images/shapes/terrain/tiles/30.png"),
                    require("../images/shapes/terrain/tiles/31.png"),
                ],
            },
        },
        textures: {
            null: require("../images/textures/null.png"),
        },
    },
    sounds: {
        menu: {
            blip: require("../sounds/menu-blip.wav"),
            down: require("../sounds/menu-down.wav"),
            up: require("../sounds/menu-up.wav"),
            no: require("../sounds/menu-no.wav"),
        },
    },
    colors: {
        yellow: "#F9D300",
        white: "#EEEEEE",
        green: "#0ECB3E",
        blue: "#00A7CB",
        red: "#CB0000",
        brown: "#8D4633",
        gray: "#666666",
        black: "#000000",
    },
}

module.exports = Media
