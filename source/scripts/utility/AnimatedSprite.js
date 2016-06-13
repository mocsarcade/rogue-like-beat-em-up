export default class AnimatedSprite {
    constructor(sprite) {
        this.images = sprite.images || []
        this.isLoop = sprite.isLoop || false
        this.timing = sprite.timing || 1000
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
    toString() {
        return this.images.length > 0 ? this.images[0] : null
    }
}
