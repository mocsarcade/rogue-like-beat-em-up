var Space = require("./Space.js")

class Agent {
    constructor(space) {
        this.space = space
        this.velocity = {x: 0, y: 0}
        this.merged = false
    }

    centroid(space = null) {
        if (space == null) {
            space = this.space
        }

        return {
            x: space.position.x + space.width / 2,
            y: space.position.y + space.height / 2
        }
    }

    distance(other) {
        var center1 = this.centroid(this.space)
        var center2 = this.centroid(other.space)

        return Math.pow(center1.x - center2.x, 2) +
            Math.pow(center1.y - center2.y, 2)
    }

    intersects(agent) {
        var me = {
            x: this.space.position.x,
            y: this.space.position.y,
            width: this.space.width,
            height: this.space.height
        }

        var other = {
            x: agent.space.position.x,
            y: agent.space.position.y,
            width: agent.space.width,
            height: agent.space.height
        }

        return (other.x <= me.x + me.width &&
            me.x <= other.x + other.width &&
            other.y <= me.y + me.height &&
            me.y <= other.y + other.height);
	}
    merge(other) {
        var x1 = other.space.position.x
        var y1 = other.space.position.y
        var x2 = x1 + other.space.width
        var y2 = y1 + other.space.height;

        if (this.space.position.x > x1) {
            x1 = this.space.position.x
        }

        if (this.space.position.y > y1) {
            y1 = this.space.position.y
        }

        if (this.space.position.x + this.space.width < x2) {
            x2 = this.space.position.x + this.space.width
        }

        if (this.space.position.y + this.space.height < y2) {
            y2 = this.space.position.y + this.space.height
        }

        this.space.position.x = x1
        this.space.position.y = y1
        this.space.width = x2 - x1
        this.space.height = y2 - y1
    }
}

class DungeonGenerator {
    constructor() {
        this.maximumSpaces = 300
        this.minimumSpace = {
            width: 3,
            height: 3
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

        this.flock()
        this.cull()
        this.trim()
        this.buildGraph()
        //this.linkSpaces()

        return this.agents.map(a => a.space)
    }

    flock() {
        for (var i = 0; i < 25; ++i) {
            this.agents.forEach(a => this.flockStep(a))
        }
    }

    flockStep(agent) {
        var {alignment, cohesion, separation} = this.computeFlock(agent)

        var alignmentWeight = 2
        var cohesionWeight = 0.95
        var separationWeight = 1.1

        agent.velocity.x += alignmentWeight * alignment.x +
            cohesionWeight * cohesion.x +
            separationWeight * separation.x
        agent.velocity.y += alignmentWeight * alignment.y +
            cohesionWeight * cohesion.y +
            separationWeight * separation.y

        agent.space.position.x += agent.velocity.x
        agent.space.position.y += agent.velocity.y
    }

    normalize(v) {
        if (v.x != 0 || v.y != 0) {
            var norm = Math.sqrt(v.x * v.x + v.y * v.y)
            v.x /= norm
            v.y /= norm
        }
        return v
    }

    computeFlock(agent) {
        var alignment = {x: 0, y: 0}
        var cohesion = {x: 0, y: 0}
        var separation = {x: 0, y: 0}

        var neighborCount = 0

        this.agents.forEach(other => {
            if (other != agent && agent.distance(agent) < 20) {
                ++neighborCount

                alignment.x += other.velocity.x
                alignment.y += other.velocity.y

                cohesion.x += other.space.position.x
                cohesion.y += other.space.position.y

                separation.x += other.space.position.x - agent.space.position.x
                separation.y += other.space.position.y - agent.space.position.y
            }
        })

        if (neighborCount > 0) {
            alignment.x /= neighborCount
            alignment.y /= neighborCount
            alignment = this.normalize(alignment)

            cohesion.x /= neighborCount
            cohesion.y /= neighborCount
            cohesion.x -= agent.space.position.x
            cohesion.y -= agent.space.position.y
            cohesion = this.normalize(cohesion)

            separation.x /= -neighborCount
            separation.y /= -neighborCount
            separation = this.normalize(separation)
        }

        return {alignment: alignment, cohesion: cohesion,
            separation: separation}
    }

    cull() {
        var AREA_MIN = 50
        var AREA_MAX = 120

        //var meanArea = this.agents.map(
        //    (agent) => agent.space.width * agent.space.height).reduce(
        //    (prev, curr) => prev + curr) / this.agents.length

        this.agents = this.agents.filter(s => {
            var area = s.space.width * s.space.height
            return area >= AREA_MIN && area <= AREA_MAX
        })
    }

    trim() {
        this.agents.forEach(agent => {
            this.agents.forEach(other => {
                if (!agent.merged && !other.merged) {
                    if (agent.space.contains(other.space)) {
                        other.merged
                    } else if (agent.intersects(other)) {
                        agent.merge(other)
                        other.merged = true
                    }
                }
            })
        })

        this.agents.filter(agent => agent.merged)
    }

    // builds a relative neighbor graph
    buildGraph() {
        this.adjacencyMatrix = new Array()

        for (var i = 0; i < this.agents.length; ++i) {
            this.adjacencyMatrix.push(new Array())

            for (var j = 0; j < this.agents.length; ++j) {
                this.adjacencyMatrix[i][j] = false
            }
        }

        for ( var i = 0; i < this.agents.length; ++i) {
            for (var j = 0; j < this.agents.length; ++j) {
                var addEdge = true

                var agentI = this.agents[i]
                var agentJ = this.agents[j]

                var dist = agentI.distance(agentJ)

                if (!agentI.intersects(agentJ)) {
                    for (var z = 0; z < this.agents.length; ++z) {
                        var agentZ = this.agents[z]
                        if (agentI.distance(agentZ) < dist &&
                            agentJ.distance(agentZ) < dist) {
                                addEdge = false
                                break;
                        }
                    }

                    if (addEdge) {
                        this.adjacencyMatrix[i][j] = true
                    }
                }
            }
        }
    }

    linkSpaces() {
        var agentLength = this.agents.length

        for ( var i = 0; i < agentLength; ++i) {
            for ( var j = 0; j < agentLength; ++j) {
                if (this.adjacencyMatrix[i][j]) {
                    this.buildLink(this.agents[i], this.agents[j])
                }
            }
        }
    }

    buildLink (agent1, agent2) {
        if (agent1.intersects(agent2)) {
            return
        }

        var addLink = (x, y, width, height) => {
            this.agents.push(new Agent(new Space({
                position: {x: x, y: y},
                width: width,
                height: height,
                color: "#FFF"
            })))
        }

        var space1 = agent1.space
        var space2 = agent2.space

        // determine relative position
        var centroid1 = agent1.centroid()
        var centroid2 = agent2.centroid()

        var offset = 5

        // is reasonably above or below?
        var isVerticalLeft = space2.position.x + space2.width <=
            space1.position.x - offset
        var isVerticalRight = space2.position.x + offset <=
            space1.position.x + space1.width

        if (isVerticalRight || isVerticalLeft) {
            var top = space2
            var bottom = space1

            if (space1.position.y < space2.position.y) {
                top = space1
                bottom = space2
            }

            var x = (space2.position.x + space2.width + space1.position.x) / 2
            var width = 3

            if (isVerticalRight) {
                x = (space2.position.x + space1.position.x + space1.width) / 2
            }

            addLink(x, top.position.y + top.height - 1, width,
                bottom.position.y - top.position.y + top.height + 1)
            return
        }

        var isHorizontalTop = space2.position.y + space2.height <=
            space1.position.y - offset
        var isHorizontalBottom = space2.position.y + offset <=
            space1.position.y + space1.height

        if (isHorizontalTop || isHorizontalBottom) {
            var left = space2
            var right = space1

            var y = (space2.position.y + space2.height + space1.position.y) / 2
            var height = 3 //y - space1.position.y

            if (isHorizontalBottom) {
                y = (space2.position.y + space1.position.y + space1.height) / 2
                //height = y - space2.position.y
            }

            if (space1.position.x < space2.position.x) {
                left = space1
                right = space2
            }

            addLink(left.position.x + left.width - 1, y,
                right.position.x - left.position.x + left.width + 1, height)
            return
        }

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
