var Space = require("./Space.js")

export class PlaygroundDungeon {
    constructor(dungeon) {
        this.spaces = [
            new Space({
                position: {x: 0, y: 0},
                width: 7, height: 7
            }),
            new Space({
                position: {x: 7, y: 2},
                width: 5, height: 5
            }),
            new Space({
                position: {x: 12, y: 0},
                width: 3, height: 5
            }),
            new Space({
                position: {x: 10, y: -7},
                width: 7, height: 7
            }),
            new Space({
                position: {x: 7, y: -7},
                width: 3, height: 3
            }),
            new Space({
                position: {x: 2, y: -6},
                width: 5, height: 5
            }),
            new Space({
                position: {x: -3, y: -3},
                width: 5, height: 3
            }),
            new Space({
                position: {x: 5, y: 7},
                width: 3, height: 3
            }),
        ]
    }
}

export class StupidRandomDungeon {
    constructor(dungeon = new Object()) {
        this.spaces = new Array()
        
        this.spaces.push(new Space({
            position: {x: -3, y: -3},
            width: 7, height: 7
        }))
        
        for(var i = 0; i < (dungeon.size || 7); i++) {
            this.spaces.push(new Space({
                position: {
                    x: Math.floor(Math.random() * 14) - 7,
                    y: Math.floor(Math.random() * 14) - 7,
                },
                width: 7, height: 7,
            }))
        }
    }
    canMove(position) {
        return this.spaces.some((space) => {
            return space.contains(position)
        })
    }
}
