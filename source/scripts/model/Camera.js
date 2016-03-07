class Camera {
    constructor(protocamera = new Object()) {
        this.width = protocamera.width || 16
        this.height = protocamera.height || 9
        this.position = protocamera.position || {x: 0, y: 0}
        this.zoom = protocamera.zoom || 1
        
        this.key = 0
    }
    // Fixes the camera to
    // center on a position.
    center(position) {
        this.position.x = position.x - (((this.width) / this.zoom) * 0.5)
        this.position.y = position.y - (((this.height) / this.zoom) * 0.5)
    }
    // Fixes the camera to fit
    // the inclusive positions.
    fit(position0, position1) {
        var x0 = position0.x
        var y0 = position0.y
        var x1 = position1.x
        var y1 = position1.y
        
        var x = Math.min(x0, x1)
        var y = Math.min(y0, y1)
        var w = Math.abs(x0 - x1)
        var h = Math.abs(y0 - y1)
        
        this.zoom = Math.min(this.width / w, this.height /  h)
        this.position.x = x - (((this.width / this.zoom) - w) / 2)
        this.position.y = y - (((this.height / this.zoom) - h) / 2)
    }
}

module.exports = Camera
