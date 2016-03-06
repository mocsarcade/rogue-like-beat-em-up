var Dungeon = require("./Dungeon.js")
var Space = require("./Space.js")

class DungeonGenerator {
    constructor() {
        this.maximumSpaces = 100
        this.minimumSpace = {
            width: 2,
            height: 2
        }
        this.maximumSpace = {
            width: 20,
            height: 20
        }
        this.spaces = new Array()
    }

    generate(radius) {
        // would be cool to parallelize this
        for (var i = 0; i < this.maximumSpaces; ++i) {
            var dimensions = this.getRandomDimensions()

            this.spaces.push(new Space({
                position: this.getRandomPointInCircle(radius),
                width: dimensions.width,
                height: dimensions.height
            }))
        }

        return this.spaces
    }

    getRandomPointInCircle(radius) {
        var t = 2 * Math.PI * Math.random()
        var u = Math.random() + Math.random()
        var r = u > 1 ? 2 - u : u
        return {x: radius * r * Math.cos(t), y: radius * r * Math.sin(t)}
    }

    getRandomDimensions() {
        return {
            width: Math.floor(this.getRandom(this.minimumSpace.width, this.maximumSpace.width)),
            height: Math.floor(this.getRandom(this.minimumSpace.height, this.maximumSpace.height))
        }
    }

    getRandom(minimum, maximum) {
        return Math.random() * (maximum - minimum) + minimum
    }
}

module.exports = DungeonGenerator
