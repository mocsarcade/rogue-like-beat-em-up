import DATA from "../DATA.js"

export default class Monster {
    constructor(monster) {
        this.color = DATA.COLORS._RED
        this.sprite = DATA.IMAGES.GEL_ALPHA

        this.position = monster.position
        this.transition = true
    }
    action() {
        this.move({
            y: +1
        })
    }
    move(movement) {
        // initialization
        movement = movement || {}
        movement.x = movement.x || 0
        movement.y = movement.y || 0

        // collision with the camera
        if(movement.x < 0 && this.position.x + movement.x < 0
        || movement.y < 0 && this.position.y + movement.y < 0
        || movement.x > 0 && this.position.x + movement.x >= DATA.FRAME.WIDTH
        || movement.y > 0 && this.position.y + movement.y >= DATA.FRAME.HEIGHT) {
            movement.x = 0
            movement.y = 0
        }

        if(this.position.x + movement.x == this.game.adventurer.position.x
        && this.position.y + movement.y == this.game.adventurer.position.y) {
            // console.log("ATTACK!")
            movement.x = 0
            movement.y = 0
        }

        this.position.x += movement.x
        this.position.y += movement.y
    }
}
