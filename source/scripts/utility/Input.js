import vkey from "vkey"

export var Keyb = {
    isDown: function(key) {
        return this.data[key] != undefined
    },
    isJustDown: function(key, time) {
        return window.performance.now() - this.data[key] < (time || 1000 / 60)
    },
    isBeenDown: function(key, time) {
        return window.performance.now() - this.data[key] > time
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
    isJustUp: function(key) {
        if(this.data[key] == undefined) {
            this.data[key] = -1
        }
        if(this.data[key] == -1) {
            this.data[key] -= 1
            return true
        } else {
            return false
        }
    },
    data: new Object()
}

document.addEventListener("keydown", function(event) {
    if(Keyb.isUp(vkey[event.keyCode])) {
        Keyb.setDown(vkey[event.keyCode])
    }
})

document.addEventListener("keyup", function(event) {
    Keyb.setUp(vkey[event.keyCode])
})

export class Input {
    constructor(inputs) {
        if(inputs.constructor != Array) {
            this.inputs = new Array()
            this.inputs.push(inputs)
        } else {
            this.inputs = inputs
        }
    }
    static isDown(input) {
        return Keyb.isDown(input)
    }
    isDown() {
        return this.inputs.some((input) => {
            return Keyb.isDown(input)
        })
    }
    isJustDown(time) {
        return this.inputs.some((input) => {
            return Keyb.isJustDown(input, time)
        })
    }
    isStutteredDown() {
        return this.inputs.some((input) => {
            if(Keyb.isJustDown(input)) {
                return true
            } else if(Keyb.isBeenDown(input, 1000)) {
                return true
            }
        })
    }
}
