// The tiles are key'd by their position, so
// we must assume they are mutually exclusive
// at their position; there can never be more
// than one tile at a given position.

export default class Dungeon {
    constructor(protodungeon) {
        // ...
    }
    addTile(tile) {
        this.tiles[tile.position.x + "x" + tile.position.y] = tile
    }
    removeTile(tile) {
        delete this.tiles[tile.position.x + "x" + tile.position.y]
    }
    // Returns the tile at a given
    // position, or returns undefined
    // if no tile has been instantiated
    // at that position.
    getTile(position) {
        return this.tiles[position.x + "x" + position.y]
    }
    // Returns an array of all tiles,
    // which is useful when you want
    // to iterate over all of them.
    getAllTiles() {
        return Object.keys(this.tiles).map((key) => {
            return this.tiles[key]
        })
    }
}

class Point {
    constructor(point) {
        this.x = point.x || 0
        this.y = point.y || 0
    }
    toString() {
        return this.x + "x" + this.y
    }
}
