import ShortID from "shortid"

export default class AnimatedSprite {
    constructor(sprite) {
        this.images = sprite.images.slice() || []
        this.isLoop = sprite.isLoop || false
        this.timing = sprite.timing || 1000

        this.key = "effect" + "-" + ShortID.generate()
    }
    update(delta) {
        this.time = (this.time || 0) + delta
        if(this.time > this.timing) {
            this.time = 0
            if(this.isLoop) {
                this.images.push(this.images.shift())
            } else {
                this.images.shift()
            }
        }
    }
    get isFinished() {
        return this.images.length == 0
    }
    toString() {
        return this.images.length > 0 ? this.images[0] : null
    }
}
