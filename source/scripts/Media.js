import Spritesheet from "./utility/Spritesheet.js"
import AnimatedSprite from "./utility/AnimatedSprite.js"

var Media; export default Media = {
    images: {
        sprites: {
            entities: {
                "0x0": require("../images/shapes/entities/0.png"),
            }
        },
    },
}


// But 19 and 26 are magic numbers!! How do we know that
// is how many rows and columns are in this spritesheet?

for(var x = 0; x < 19; x += 1) {
    for(var y = 0; y < 26; y += 2) {
        Media.images.sprites.entities[x + "x" + (y / 2)] = new AnimatedSprite(undefined, 300)
    }
}

var spritesheet = new Spritesheet(require("../images/entities.png"), 16, 24, function(spritesheets) {
    for(var x = 0; x < spritesheet.rows; x += 1) {
        for(var y = 0; y < spritesheet.columns; y += 2) {
            Media.images.sprites.entities[x + "x" + (y / 2)].images = [
                spritesheet.images[x + "x" + y],
                spritesheet.images[x + "x" + (y + 1)],
            ]
        }
    }
})
