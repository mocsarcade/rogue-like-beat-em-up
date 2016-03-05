var Room = require("./Room.js")

class Dungeon {
    constructor() {
        this.rooms = new Array()
        this.rooms.push(new Room({
            position: {x: 0, y: 0},
            width: 7, height: 7,
            color: "#999"
        }))
        this.rooms.push(new Room({
            position: {x: 7, y: 2},
            width: 5, height: 5,
            color: "#888"
        }))
        this.rooms.push(new Room({
            position: {x: 12, y: 0},
            width: 3, height: 5,
            color: "#777"
        }))
        this.rooms.push(new Room({
            position: {x: 10, y: -7},
            width: 7, height: 7,
            color: "#666"
        }))
        this.rooms.push(new Room({
            position: {x: 7, y: -7},
            width: 3, height: 3,
            color: "#888"
        }))
        this.rooms.push(new Room({
            position: {x: 2, y: -6},
            width: 5, height: 5,
            color: "#777"
        }))
        this.rooms.push(new Room({
            position: {x: -3, y: -3},
            width: 5, height: 3,
            color: "#555"
        }))
        this.rooms.push(new Room({
            position: {x: 5, y: 7},
            width: 3, height: 3,
            color: "#777"
        }))
    }
}

module.exports = Dungeon
