import Keyb from "keyb"

export default class Input {
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

// You should use this MockInput as a replacement
// for an Input when testing your code. You can
// convince your code that the input is down by
// setting input.mock.isDown to true.

export class MockInput {
    constructor() {
        this.mock = {isDown: false}
    }
    isDown() {
        return this.mock.isDown === true
    }
}
