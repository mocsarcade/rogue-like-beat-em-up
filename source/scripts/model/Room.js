class Room {
    constructor(protoroom = new Object()) {
        this.position = protoroom.position || {x: 0, y: 0}
        this.width = protoroom.width || 1
        this.height = protoroom.height || 1
        this.color = protoroom.color || "hotpink"
    }
    contains(position) {
        return position.x >= this.position.x
            && position.x < this.position.x + this.width
            && position.y >= this.position.y
            && position.y < this.position.y + this.height
    }
}

module.exports = Room
