var Dungeon = require("./Dungeon.js")
var Space = require("./Space.js")

class Agent {
    constructor(space) {
        this.space = space
        this.velocity = {x: 0, y: 0}
    }

    centroid(space) {
        return {
            x: this.space.position.x + this.space.width / 2,
            y: this.space.position.y + this.space.height / 2
        }
    }

    distance(other) {
        var center1 = this.centroid(this.space)
        var center2 = this.centroid(other)

        return Math.pow(center1.x - center2.x, 2) +
            Math.pow(center1.y - center2.y, 2)
    }
}

class DungeonGenerator {
    constructor() {
        this.maximumSpaces = 250
        this.minimumSpace = {
            width: 2,
            height: 2
        }
        this.maximumSpace = {
            width: 20,
            height: 20
        }
        this.agents = new Array()
    }

    generate(radius) {
        // would be cool to parallelize this
        for (var i = 0; i < this.maximumSpaces; ++i) {
            var dimensions = this.getRandomDimensions()

            this.agents.push(new Agent(new Space({
                position: this.getRandomPointInCircle(radius),
                width: dimensions.width,
                height: dimensions.height
            })))
        }

        this.separate()
        this.cull()

        return this.agents.map(a => a.space)
    }

    separate() {
        for (var i = 0; i < 15; ++i) {
            this.agents.forEach(a => this.separationStep(a))
        }
    }

    separationStep(space) {
        var {alignment, cohesion, separation} = this.computeFlock(space)

        var alignmentWeight = 1
        var cohesionWeight = 0.95
        var separationWeight = 1

        space.velocity.x += alignmentWeight * alignment.x +
            cohesionWeight * cohesion.x +
            separationWeight * separation.x
        space.velocity.y += alignmentWeight * alignment.y +
            cohesionWeight * cohesion.y +
            separationWeight * separation.y

        if (this.space === undefined) {
            this.space = space
        }

        if (space == this.space) {
            //console.log(space.velocity)
        }

        space.space.position.x += space.velocity.x
        space.space.position.y += space.velocity.y

        //console.log(space.velocity)
    }

    normalize(v) {
        if (v.x != 0 || v.y != 0) {
            var norm = Math.sqrt(v.x * v.x + v.y * v.y)
            v.x /= norm
            v.y /= norm
        }
        return v
    }

    computeFlock(space) {
        var alignment = {x: 0, y: 0}
        var cohesion = {x: 0, y: 0}
        var separation = {x: 0, y: 0}

        var neighborCount = 0

        this.agents.forEach(agent => {
            //console.log(space.distance(agent))
            if (agent != space && space.distance(agent) < 25) {
                ++neighborCount

                alignment.x += agent.velocity.x
                alignment.y += agent.velocity.y

                cohesion.x += agent.space.position.x
                cohesion.y += agent.space.position.y

                separation.x += agent.space.position.x - space.space.position.x
                separation.y += agent.space.position.y - space.space.position.y
            }
        })

        if (neighborCount > 0) {
            //console.log(alignment)
            alignment.x /= neighborCount
            alignment.y /= neighborCount
            //console.log(alignment)
            alignment = this.normalize(alignment)

            cohesion.x /= neighborCount
            cohesion.y /= neighborCount
            cohesion.x -= space.space.position.x
            cohesion.y -= space.space.position.y
            cohesion = this.normalize(cohesion)

            separation.x /= -neighborCount
            separation.y /= -neighborCount
            separation = this.normalize(separation)
        }

        //cohesion = {x: 0, y: 0}

        return {alignment: alignment, cohesion: cohesion,
            separation: separation}
    }

    cull() {
        var AREA_MIN = 8
        var AREA_MAX = 30

        this.agents = this.agents.filter(s => {
            var area = s.space.width * s.space.height
            return area >= AREA_MIN && area <= AREA_MAX
        })
    }

    getRandomPointInCircle(radius) {
        var t = 2 * Math.PI * Math.random()
        var u = Math.random() + Math.random()
        var r = u > 1 ? 2 - u : u
        return {x: radius * r * Math.cos(t), y: radius * r * Math.sin(t)}
    }

    getRandomDimensions() {
        return {
            width: Math.floor(this.getRandom(this.minimumSpace.width, this.maximumSpace.width)),
            height: Math.floor(this.getRandom(this.minimumSpace.height, this.maximumSpace.height))
        }
    }

    getRandom(minimum, maximum) {
        return Math.random() * (maximum - minimum) + minimum
    }
}

module.exports = DungeonGenerator
