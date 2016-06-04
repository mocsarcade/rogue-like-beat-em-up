export default class AnimatedSprite {
    constructor(images, timing) {
        this.images = images || []
        this.index = 0
        this.time = timing || 1000
        this.timing = timing || 1000
    }
    update(delta) {
        this.time -= delta
        if(this.time <= 0) {
            this.time = this.timing
            this.index += 1
            this.index %= this.images.length || Infinity
        }
    }
    get isReady() {
        return this.images.length > 0
    }
    toString() {
        return this.isReady ? this.images[this.index] : ""
    }
}
