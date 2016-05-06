var Adventurer = require("./Adventurer.js")
var Room = require("./Room.js")

class Game {
    constructor() {
        this.adventurer = new Adventurer({
            position: {x: 2, y: 2},
            game: this
        })
        this.dungeon = {
            rooms: [
                new Room({
                    position: {x: 1, y: 1},
                    width: 7, height: 7,
                    color: "#999"
                }),
                new Room({
                    position: {x: 8, y: 1},
                    width: 5, height: 5,
                    color: "#888"
                }),
                new Room({
                    position: {x: 13, y: 1},
                    width: 2, height: 2,
                    color: "#777"
                }),
            ]
        }
        var media = {
            13: require("../../images/shapes/terrain/13.png"),
            32: require("../../images/shapes/terrain/32.png"), // transparent???
            39: require("../../images/shapes/terrain/39.png"),
            48: require("../../images/shapes/terrain/48.png"),
            49: require("../../images/shapes/terrain/49.png"),
            50: require("../../images/shapes/terrain/50.png"),
            165: require("../../images/shapes/terrain/165.png"),
        }
        var colors = {
            "white": "#EEEEEE",
            "yellow": "#F9D300",
            "green": "#0ECB3E",
            "blue": "#00A7CB",
            "red": "#CB0000",
            "brown": "#8D4633",
            "gray": "#666666",
            "black": "#000000",
        }
        this.tiles = new Array()
        for(var x = 2; x < 8; x++) {
            for(var y = 2; y < 6; y++) {
                this.tiles.push({
                    position: {x: x, y: y},
                    color: (x % 2 != y % 2) ? "#777" : "#666",
                    // color: Math.random() < 0.5 ? "#777" : "#888",
                    shape: media[13],
                })
                if(y == 2) {
                    this.tiles.push({
                        position: {x: x, y: y},
                        color: "#222",
                        shape: media[165],
                        opacity: 0.5
                    })
                }
            }
        }
        for(var x = 2; x < 8; x++) {
            var y = 1
            this.tiles.push({
                position: {x: x, y: y},
                shape: media[48 + (x % 3)],
                color: colors.brown,
            })
        }
        for(var x = 1; x < 9; x++) {
            var y = 6
            this.tiles.push({
                position: {x: x, y: y},
                shape: media[48 + (x % 3)],
                color: colors.brown,
            })
        }
        for(var x = 1; x < 9; x += 7) {
            for(var y = 1; y < 6; y++) {
                if(x == 8 && y == 4) {
                    continue
                }
                this.tiles.push({
                    position: {x: x, y: y},
                    color: colors.brown,
                })
            }
        }
        this.tiles.push({
            position: {x: 8, y: 4},
            color: colors.brown,
            shape: media[39],
        })
    }
    get entities() {
        // Returns a big list of every
        // entity in the game, which is
        // useful for rendering.
        return (
            new Array()
                .concat(this.tiles)
                .concat(this.adventurer)
                // .concat(this.dungeon.rooms)
        )
    }
    update() {
        this.adventurer.update()
    }
}

module.exports = Game
