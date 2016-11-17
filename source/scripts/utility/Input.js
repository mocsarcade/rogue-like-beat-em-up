import Keyb from "keyb"

const STUTTER = 200

export default {
    getInputs: function(delta) {
        var inputs = {
            "north": false,
            "south": false,
            "west": false,
            "east": false,
            "action": false,
        }

        ///////////////
        // Keyboard //
        /////////////

        inputs.north = inputs.north || this.pollKeyboard("W", delta)
        inputs.south = inputs.south || this.pollKeyboard("S", delta)
        inputs.west = inputs.west || this.pollKeyboard("A", delta)
        inputs.east = inputs.east || this.pollKeyboard("D", delta)
        inputs.north = inputs.north || this.pollKeyboard("<up>", delta)
        inputs.south = inputs.south || this.pollKeyboard("<down>", delta)
        inputs.west = inputs.west || this.pollKeyboard("<left>", delta)
        inputs.east = inputs.east || this.pollKeyboard("<right>", delta)
        inputs.assert = inputs.assert || this.pollKeyboard("<space>", delta)

        ///////////////
        // Gamepads //
        /////////////

        var gamepads = navigator.getGamepads()
        for(var index = 0; index < gamepads.length; index += 1) {
            if(gamepads[index] != undefined) {
                if(gamepads[index].mapping != "standard") {
                    console.warn("Detected a gamepad that we don't support. :(")
                } else {
                    inputs.north = inputs.north || this.pollGamepad(gamepads[index], 12, delta)
                    inputs.south = inputs.south || this.pollGamepad(gamepads[index], 13, delta)
                    inputs.west = inputs.west || this.pollGamepad(gamepads[index], 14, delta)
                    inputs.east = inputs.east || this.pollGamepad(gamepads[index], 15, delta)
                    inputs.assert = inputs.assert || this.pollGamepad(gamepads[index], 0, delta)
                }
            }
        }

        return inputs
    },
    pollKeyboard(key, delta) {
        if(Keyb.isDown(key)) {
            if(this._.keyboard[key] === false) {
                this._.keyboard[key] = 0
                return true
            } else {
                this._.keyboard[key] += delta
                if(this._.keyboard[key] > STUTTER) {
                    this._.keyboard[key] -= STUTTER
                    return true
                }
            }
        } else {
            this._.keyboard[key] = false
        }
    },
    pollGamepad(gamepad, button, delta) {
        if(gamepad.buttons[button].pressed) {
            if(this._.gamepad[button] === false) {
                this._.gamepad[button] = 0
                return true
            } else {
                this._.gamepad[button] += delta
                if(this._.gamepad[button] > STUTTER) {
                    this._.gamepad[button] -= STUTTER
                    return true
                }
            }
        } else {
            this._.gamepad[button] = false
        }
    },
    _: {
        keyboard: {},
        gamepad: {},
    }
}
