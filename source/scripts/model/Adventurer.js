export default class Adventurer {
    constructor(protoadventurer) {
        protoadventurer = protoadventurer || {}

        this.position = protoadventurer.position || {x: 4, y: 6}
        this.inputs = protoadventurer.inputs
        this.game = protoadventurer.game
        this.transition = true

        this.shape = protoadventurer.sprite

        this.color = "#DEB74A"
    }
    update(delta) {
        for(var key in this.inputs) {
            if(!!this.inputs[key].update) {
                this.inputs[key].update(delta)
            }
        }

        if(this.inputs.north.isDown(delta)) {
            this.move({y: -1})
        }
        if(this.inputs.south.isDown(delta)) {
            this.move({y: +1})
        }
        if(this.inputs.west.isDown(delta)) {
            this.move({x: -1})
        }
        if(this.inputs.east.isDown(delta)) {
            this.move({x: +1})
        }
    }
    move(movement) {
        movement = movement || {}
        movement.x = movement.x || 0
        movement.y = movement.y || 0

        if(this.position.x + movement.x == this.game.monster.position.x
        && this.position.y + movement.y == this.game.monster.position.y) {
            movement.x = 0
            movement.y = 0
        }

        // var isInDungeon = this.game.dungeon.rooms.some((room) => {
        //     return room.contains({
        //         x: this.position.x + movement.x,
        //         y: this.position.y + movement.y
        //     })
        // })
        //
        // if(!isInDungeon) {
        //     movement.x = 0
        //     movement.y = 0
        //     return
        // }

        this.position.x += movement.x
        this.position.y += movement.y
    }
}
