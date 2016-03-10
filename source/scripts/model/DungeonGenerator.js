let Space = require("./Space.js")

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
        let center1 = this.centroid(this.space)
        let center2 = this.centroid(other.space)

        return Math.pow(center1.x - center2.x, 2) +
            Math.pow(center1.y - center2.y, 2)
    }

    intersects(agent) {
        let me = {
            x: this.space.position.x,
            y: this.space.position.y,
            width: this.space.width,
            height: this.space.height
        }

        let other = {
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
        let x1 = other.space.position.x
        let y1 = other.space.position.y
        let x2 = x1 + other.space.width
        let y2 = y1 + other.space.height;

        if (this.space.position.x < x1) {
            x1 = this.space.position.x
        }

        if (this.space.position.y < y1) {
            y1 = this.space.position.y
        }

        if (this.space.position.x + this.space.width > x2) {
            x2 = this.space.position.x + this.space.width
        }

        if (this.space.position.y + this.space.height > y2) {
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
        for (let i = 0; i < this.maximumSpaces; ++i) {
            let dimensions = this.getRandomDimensions()

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
        this.linkSpaces()
        //this.trim()

        return this.agents.map(a => a.space)
    }

    flock() {
        let limit = Math.floor(this.maximumSpaces / 12)
        for (let i = 0; i < limit; ++i) {
            this.agents.forEach(a => this.flockStep(a))
        }
    }

    flockStep(agent) {
        let {alignment, cohesion, separation} = this.computeFlock(agent)

        let alignmentWeight = 2
        let cohesionWeight = 0.95
        let separationWeight = 1.1

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
            let norm = Math.sqrt(v.x * v.x + v.y * v.y)
            v.x /= norm
            v.y /= norm
        }
        return v
    }

    computeFlock(agent) {
        let alignment = {x: 0, y: 0}
        let cohesion = {x: 0, y: 0}
        let separation = {x: 0, y: 0}

        let neighborCount = 0

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
        let AREA_MIN = 50
        let AREA_MAX = 120

        //let meanArea = this.agents.map(
        //    (agent) => agent.space.width * agent.space.height).reduce(
        //    (prev, curr) => prev + curr) / this.agents.length

        this.agents = this.agents.filter(s => {
            let area = s.space.width * s.space.height
            return area >= AREA_MIN && area <= AREA_MAX
        })
    }

    trim() {
        this.agents.forEach(agent => {
            this.agents.forEach(other => {
                if (!agent.merged && !other.merged && agent != other) {
                    if (agent.space.contains(other.space)) {
                        other.merged = true
                    } else if (agent.intersects(other)) {
                        // this just produces a few giant blobs
                        //agent.merge(other)
                        //other.merged = true
                    }
                }
            })
        })

        this.agents = this.agents.filter(agent => !agent.merged)
    }

    // builds a relative neighbor graph
    buildGraph() {
        this.adjacencyMatrix = new Array()

        for (let i = 0; i < this.agents.length; ++i) {
            this.adjacencyMatrix.push(new Array())

            for (let j = 0; j < this.agents.length; ++j) {
                this.adjacencyMatrix[i][j] = false
            }
        }

        for ( let i = 0; i < this.agents.length; ++i) {
            for (let j = 0; j < this.agents.length; ++j) {
                let addEdge = true

                let agentI = this.agents[i]
                let agentJ = this.agents[j]

                let dist = agentI.distance(agentJ)

                if (!agentI.intersects(agentJ)) {
                    for (let z = 0; z < this.agents.length; ++z) {
                        let agentZ = this.agents[z]
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
        let agentLength = this.agents.length

        for ( let i = 0; i < agentLength; ++i) {
            for ( let j = 0; j < agentLength; ++j) {
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

        let addLink = (x, y, width, height) => {
            let newAgent = new Agent(new Space({
                position: {x: x, y: y},
                width: width,
                height: height,
                color: "#FFF"
            }))

            this.agents.push(newAgent)

            return newAgent
        }

        let space1 = agent1.space
        let space2 = agent2.space

        // determine relative position
        let centroid1 = agent1.centroid()
        let centroid2 = agent2.centroid()

        let offset = Math.random() * (5 - 2) + 2

        // cut space into four diagonal quadrants
        let x2 = space1.position.x + space1.width
        let y2 = space1.position.y + space1.height

        let m = Math.abs((y2 - space1.position.y) /
            (x2 - space1.position.x))

        let xc = (space1.position.x + x2) / 2
        let yc = (space1.position.y + y2) / 2

        // is reasonably above or below?
        //let isVerticalCenter = centroid2.x >= centroid1.x - offset &&
        //    centroid2.x <= centroid1.x + offset
        let isVerticalCenter = Math.abs(space2.position.y - yc) >
            m * Math.abs(space2.position.x - xc)

        if (isVerticalCenter) {
            let top = space2
            let bottom = space1

            if (space1.position.y < space2.position.y) {
                top = space1
                bottom = space2
            }

            let x = centroid1.x - offset / 2
            let y = top.position.y + top.height - 1
            let width = offset
            let height = bottom.position.y - y + 1

            var bridge = addLink(x, y, width, height)

            if (!bridge.intersects(agent2)) {
                let spaceB = bridge.space
                let left = space2
                let right = spaceB

                if (spaceB.position.x < space2.position.x) {
                    left = spaceB
                    right = space2
                }

                let x = left.position.x - 1
                let y = spaceB.position.y
                let width = right.position.x - x + 1
                let height = offset

                if (left != spaceB) {
                    // the new bridge should extend across the old one
                    x += left.width
                    width += spaceB.width - left.width
                }

                let yay = addLink(x, y, width, height)
                yay.space.color = "#F00"
            }

            return
        }

        //let isHorizontalCenter = centroid2.y >= centroid1.y - offset &&
        //    centroid2.y <= centroid1.y + offset
        let isHorizontalCenter = Math.abs(space2.position.y - yc) <
            m * Math.abs(space2.position.x - xc)

        if (isHorizontalCenter) {
            let left = space2
            let right = space1

            if (space1.position.x < space2.position.x) {
                left = space1
                right = space2
            }

            let x = left.position.x + left.width - 1
            let y = centroid1.y - offset / 2
            let width = right.position.x - x + 1
            let height = offset

            let bridge = addLink(x, y, width, height)

            if (!bridge.intersects(agent2)) {
                let spaceB = bridge.space
                let top = space2
                let bottom = spaceB

                if (spaceB.position.y < space2.position.y) {
                    top = spaceB
                    bottom = space2
                }

                let x = spaceB.position.x
                let y = top.position.y + top.height - 1
                let width = offset
                let height = bottom.position.y - y + 1

                if (top != spaceB) {
                    y += top.height
                    height += spaceB.height - top.height
                }

                let yay = addLink(x, y, width, height)
                yay.space.color = "#F00"
            }
            return
        }

        // if here, then the connecting space is diagonally off-center
        // so, let's figure out if this thing is more vertial or more horizontal


    }

    getRandomPointInCircle(radius) {
        let t = 2 * Math.PI * Math.random()
        let u = Math.random() + Math.random()
        let r = u > 1 ? 2 - u : u
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
