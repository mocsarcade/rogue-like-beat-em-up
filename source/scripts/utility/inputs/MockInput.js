// You should use this class as a replacement
// for an input when testing your code. You can
// convince your code that the input is down by
// setting `input.mock.isDown` to `true`.

export default class MockInput {
    constructor() {
        this.mock = {isDown: false}
    }
    isDown() {
        return this.mock.isDown === true
    }
}
