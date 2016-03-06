class Point {
    constructor(protopoint = new Object()) {
        this.x = protopoint.x || 0
        this.y = protopoint.y || 0
    }
    toString() {
        return this.x + "x" + this.y
    }
    toPoint(that) {
        return new Point({
            x: this.x + that.x,
            y: this.y + that.y
        })
    }
}

module.exports.Point = Point
