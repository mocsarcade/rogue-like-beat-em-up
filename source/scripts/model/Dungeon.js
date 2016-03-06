var Space = require("./Space.js")

class Dungeon {
    constructor() {
        this.spaces = new Array()
        this.spaces.push(new Space({
            position: {x: 0, y: 0},
            width: 7, height: 7
        }))
        this.spaces.push(new Space({
            position: {x: 7, y: 2},
            width: 5, height: 5
        }))
        this.spaces.push(new Space({
            position: {x: 12, y: 0},
            width: 3, height: 5
        }))
        this.spaces.push(new Space({
            position: {x: 10, y: -7},
            width: 7, height: 7
        }))
        this.spaces.push(new Space({
            position: {x: 7, y: -7},
            width: 3, height: 3
        }))
        this.spaces.push(new Space({
            position: {x: 2, y: -6},
            width: 5, height: 5
        }))
        this.spaces.push(new Space({
            position: {x: -3, y: -3},
            width: 5, height: 3
        }))
        this.spaces.push(new Space({
            position: {x: 5, y: 7},
            width: 3, height: 3
        }))
    }
}

module.exports = Dungeon
