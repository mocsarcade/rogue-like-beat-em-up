var Media = require("../Media.js")
var Space = require("./Space.js")
var Bat = require("./Monster.js").Bat
var VampireBat = require("./Monster.js").VampireBat
var VampireBatKing = require("./Monster.js").VampireBatKing
var TestMonster = require("./Monster.js").TestMonster

export class Dungeon {
    constructor(dungeon = new Object()) {
        this.game = dungeon.game || undefined
        
        this.size = dungeon.size || 5
        
        this.spaces = new Array()
        this.monsters = new Array()
    }
    canMove(position) {
        return this.spaces.some((space) => {
            return space.contains(position)
        })
    }
}

export class StaticDungeon extends Dungeon {
    constructor(dungeon) {
        super(dungeon)
        
        this.spaces = [
            new Space({
                position: {x: -3, y: -3},
                width: 7, height: 7,
                color: "#444",
            }),
            new Space({
                position: {x: -9, y: -6},
                width: 6, height: 6,
                color: "#555",
            }),
            new Space({
                position: {x: -3, y: -12},
                width: 9, height: 9,
                color: "#333",
            }),
            new Space({
                position: {x: 4, y: -3},
                width: 5, height: 5,
                color: "#666",
            }),
            new Space({
                position: {x: 6, y: -9},
                width: 6, height: 6,
                color: "#555",
            }),
            new Space({
                position: {x: -7, y: -10},
                width: 4, height: 4,
                color: "#444",
            }),
        ]
        this.monsters = [
            new TestMonster({
                game: this.game,
                position: {x: -3, y: -3},
            }),
            new TestMonster({
                game: this.game,
                position: {x: 0, y: -6},
            }),
            new TestMonster({
                game: this.game,
                position: {x: +6, y: -3},
            })
        ]
        
        this.stairs = {
            id: "stairs",
            color: "#222",
            position: {x: -6, y: -9},
            shape: Media.images.shapes.terrain.stairs[0],
        }
    }
}

export class StupidRandomDungeon extends Dungeon {
    constructor(dungeon = new Object()) {
        super(dungeon)
        
        for(var i = 0; i < this.size; i++) {
            this.spaces.push(new Space({
                color: dungeon.colors[i % 2],
                position: {x: -3, y: (i * -7) - 3},
                width: 7, height: 7,
            }))
            if(i != 0 && i != this.size - 1) {
                this.monsters.push(new Bat({
                    position: {x: 0, y: i * -7},
                    game: this.game,
                }))
            }
        }
        
        this.stairs = {
            id: "stairs",
            color: "#222",
            position: {x: 0, y: (this.size - 1) * -7},
            shape: Media.images.shapes.terrain.stairs[0],
        }
    }
}
