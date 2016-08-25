import DATA from "scripts/Data.js"

export default class Frame {
    constructor() {
        this.width = DATA.FRAME.WIDTH * DATA.TILE.WIDTH
        this.height = DATA.FRAME.HEIGHT * DATA.TILE.HEIGHT
        this.color = "#222"
    }
}
