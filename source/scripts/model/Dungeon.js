var Room = require("./Room.js")

class Dungeon {
    constructor() {
        this.rooms = new Array()
        this.rooms.push(new Room({
            position: {x: 1, y: 1},
            width: 7, height: 7,
            color: "#999"
        }))
        this.rooms.push(new Room({
            position: {x: 9, y: 1},
            width: 5, height: 5,
            color: "#888"
        }))
        this.rooms.push(new Room({
            position: {x: 15, y: 1},
            width: 2, height: 2,
            color: "#777"
        }))
    }
}

module.exports = Dungeon
