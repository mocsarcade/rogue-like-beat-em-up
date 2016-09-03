import DATA from "scripts/data"

export default class Frame {
    constructor() {
        this.width = DATA.FRAME.WIDTH * DATA.TILE.WIDTH
        this.height = DATA.FRAME.HEIGHT * DATA.TILE.HEIGHT
        this.color = "#222"
    }
}
