import DATA from "scripts/data"

export default class Movement {
    static getSimpleChaseMovement(target, current) {
        var dx = target.x - current.x
        var dy = target.y - current.y

        if(Math.abs(dx) > Math.abs(dy)) {
            if(dx > 0) return {x: +1}
            if(dx < 0) return {x: -1}
        } else {
            if(dy > 0) return {y: +1}
            if(dy < 0) return {y: -1}
        }
    }

    static getWanderMovement(validLocations) {
        validLocations = validLocations || this.orthogonal()

        var diceroll = Math.floor((Math.random() * validLocations.length) + 0)

        return validLocations[diceroll]
    }

    static horizontal(speed) {
        speed = speed || 1
        return [
            {x: -speed},
            {x: +speed}
        ]
    }

    static vertical(speed) {
        speed = speed || 1
        return [
            {y: -speed},
            {y: +speed}
        ]
    }

    static orthogonal(speed) {
        return Movement.horizontal(speed).concat(Movement.vertical(speed))
    }

    static diagonal(speed) {
        speed = speed || 1
        return [
            {x: -speed, y: -speed},
            {x: +speed, y: -speed},
            {x: -speed, y: +speed},
            {x: +speed, y: +speed}
        ]
    }
}
