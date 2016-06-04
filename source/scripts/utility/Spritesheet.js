export default class Spritesheet {
    constructor(source, width, height, callback) {
        var context = document.createElement("canvas").getContext("2d")

        context.canvas.width = width
        context.canvas.height = height

        var image = new Image()

        image.addEventListener("load", () => {
            this.images = new Object()
            this.rows = image.width / width
            this.columns = image.height / height
            for(var x = 0; x < this.rows; x += 1) {
                for(var y = 0; y < this.columns; y += 1) {
                    context.clearRect(0, 0, width, height)
                    context.drawImage(image, x * width, y * height, width, height, 0, 0, width, height)
                    this.images[x + "x" + y] = context.canvas.toDataURL("image/png")
                }
            }
            if(callback instanceof Function) {
                callback(this)
            }
        })

        image.src = source
    }
}
