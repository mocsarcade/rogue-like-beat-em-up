// For more information about the architecture of our inputs, read at:
// https://github.com/mocsarcade/enchiridion/wiki/Architecture#inputs

// We're using Keyb, which you can find at:
// https://www.npmjs.com/package/keyb
import Keyb from "keyb"

export default class KeyboardInput {
    constructor(inputs) {
        if(inputs.constructor != Array) {
            this.inputs = [inputs]
        } else {
            this.inputs = inputs
        }
    }
    isDown(timeframe) {
        return this.inputs.some((input) => {
            return Keyb.isJustDown(input, timeframe)
        })
    }
}
