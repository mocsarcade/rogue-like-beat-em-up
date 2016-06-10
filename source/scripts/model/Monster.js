import DATA from "../DATA.js"

export default class Monster {
    constructor(monster) {
        this.color = "#CB0000"
        this.sprite = DATA.IMAGES.GEL_ALPHA

        this.position = monster.position
    }
}
