import vkey from "vkey"

export var InputState = {
    isDown: function(key, time) {
        if(time == undefined) {
            return this.data[key] != undefined
        } else {
            return window.performance.now() - this.data[key] < (time || 1000 / 60)
        }
    },
    setDown: function(key) {
        this.data[key] = window.performance.now()
    },
    setUp: function(key) {
        delete this.data[key]
    },
    isUp: function(key) {
        if(this.data[key] == undefined) {
            this.data[key] = -1
        }
        return this.data[key] <= 0
    },
    data: new Object()
}

document.addEventListener("keydown", function(event) {
    if(!InputState.isDown(vkey[event.keyCode])) {
        InputState.setDown(vkey[event.keyCode])
    }
})

document.addEventListener("keyup", function(event) {
    InputState.setUp(vkey[event.keyCode])
})

export class Input {
    constructor(inputs) {
        if(inputs.constructor != Array) {
            this.inputs = [inputs]
        } else {
            this.inputs = inputs
        }
    }
    isDown(timeframe) {
        return this.inputs.some((input) => {
            return InputState.isDown(input, timeframe)
        })
    }
}

export class StutteredInput extends Input {
    constructor(inputs, stutter) {
        super(inputs)

        stutter = stutter || 250
        this.stutter = stutter
        this.maxstutter = stutter
    }
    update(delta) {
        if(super.isDown()) {
            this.stutter -= delta
        } else {
            this.stutter = this.maxstutter
        }
    }
    isDown(delta) {
        if(super.isDown(delta)) {
            this.stutter = this.maxstutter
            return true
        } else if(super.isDown() && this.stutter <= 0) {
            this.stutter = this.maxstutter
            return true
        }
    }
}
