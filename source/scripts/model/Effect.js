export default class Effect {
    constructor(effect) {
        this.position = effect.position
        this.sprite = effect.sprite
        this.color = "#FFF"
    }
    update(delta) {
        if(!!this.sprite.update) {
            this.sprite.update(delta)
            if(this.sprite.isFinished) {
                this.game.remove("effects", this)
            }
        }
    }
}
