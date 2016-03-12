let Space = require("./Space.js")

/**
 * Class represents an agent used to generate the random dungeon.
 * Encapsulates the space that is ultimately part of the dungeon.
 * @todo Ensure that the intersects method actually works...
 */
class Agent {
    /**
     * Creates an agent.
     * @param {Space} space - Space that this agent encapsulates.
     */
    constructor(space) {
        this.space = space
        this.velocity = {x: 0, y: 0}
        this.delete = false
    }
    /**
     * Determines the central point of the encapsulated space.
     * @return {x, y} Object containing x & y coordinates.
     */
    centroid() {
        return {
            x: this.space.position.x + this.space.width / 2,
            y: this.space.position.y + this.space.height / 2
        }
    }
    /**
     * Calculates the square of the distance between two agents.
     * @param {Agent} other - Agent from which to determine distance.
     * @return {number} square distance
     */
    distanceSquare(other) {
        let center1 = this.centroid()
        let center2 = other.centroid()

        return Math.pow(center1.x - center2.x, 2) +
            Math.pow(center1.y - center2.y, 2)
    }
    /**
     * Determines if another agent intersects this one.
     * @param {Agent} agent - Agent test
     * @return {bool} true if the other agent intersects this agent.
     */
    intersects(agent) {
        let r1 = {
            left: this.space.position.x,
            top: this.space.position.y,
            right: this.space.position.x + this.space.width,
            bottom: this.space.position.y + this.space.height
        }

        let r2 = {
            left: agent.space.position.x,
            top: agent.space.position.y,
            right: agent.space.position.x + agent.space.width,
            bottom: agent.space.position.y + agent.space.height
        }

        return (r1.left < r2.right &&
            r1.right > r2.left &&
            r1.top > r2.bottom &&
            r1.bottom < r2.top )

        //return !(r2.left > r1.right ||
        //   r2.right < r1.left ||
        //   r2.top > r1.bottom ||
        //   r2.bottom < r1.top);
	}
}

/**
 * Class to generate a random dungeon.
 * @todo Fix trimming
 * @todo Make more robust against islands
 */
class DungeonGenerator {
    /**
     * Constructs a random dungeon generator.
     * @param {integer} maxSpaces - Maximum number of random spaces to generate.
     * @param {width, height} minSpace - Minimum dimensions for a space.
     * @param {width, height} maxSpace - Maximum dimensions for a space.
     */
    constructor(maxSpaces = 30, minSpace = null, maxSpace = null) {
        // arbitrary default value because I'm testing
        this.maximumSpaces = maxSpaces
        this.minimumSpace = minSpace || {
            width: 3,
            height: 3
        }
        this.maximumSpace = maxSpace || {
            width: 20,
            height: 20
        }
        this.agents = new Array()

        // flocking radius for the flocking behavior simulation
        // can be changed to manipulate stuff
        this.flockingRadius = 20

        // flocking vector weights
        // can be changed to manipulate flocking behavior
        this.alignmentWeight = 2
        this.cohesionWeight = 0.95
        this.separationWeight = 1.1
    }
    /**
     * Generates a random dungeon.
     * @param {number} radius - Radius of random generation circle.
     * @return {Array<Space>} Array of Space objects that represent the dungeon.
     */
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

        // I hate all of these side effects, but development time is short :(
        this.flock()
        this.cull()
        this.buildGraph()
        this.linkSpaces()
        //this.trim()

        return this.agents.map(a => a.space)
    }
    /**
     * Simulates flocking behaviors to force agents to move away but kinda stay
     * near each other.
     * Updates this.agents.
     */
    flock() {
        let limit = Math.floor(this.maximumSpaces / 12)
        for (let i = 0; i < limit; ++i) {
            this.agents.forEach(a => this.flockStep(a))
        }
    }
    /**
     * Step of the flocking simulation.
     * Updates this.agents.
     * @param {Agent} agent - Agent on which to perform the flocking sim step.
     */
    flockStep(agent) {
        let {alignment, cohesion, separation} = this.computeFlock(agent)

        agent.velocity.x += this.alignmentWeight * alignment.x +
            this.cohesionWeight * cohesion.x +
            this.separationWeight * separation.x
        agent.velocity.y += this.alignmentWeight * alignment.y +
            this.cohesionWeight * cohesion.y +
            this.separationWeight * separation.y

        agent.space.position.x += agent.velocity.x
        agent.space.position.y += agent.velocity.y
    }
    /**
     * Normalize a vector.
     * @param {x, y} v - Object representing a vector.
     * @return {x, y} Object representing a normalized vector.
     */
    normalize(v) {
        if (v.x != 0 || v.y != 0) {
            let norm = Math.sqrt(v.x * v.x + v.y * v.y)
            v.x /= norm
            v.y /= norm
        }
        return v
    }
    /**
     * Compute the flocking vectors.
     * @param {Agent} agent - Agent for which this flocking sim step is being
     * computated.
     * @return {alignment: {x, y}, cohesion: {x, y}, separation: {x, y}} -
     * Flocking vectors.
     */
    computeFlock(agent) {
        let alignment = {x: 0, y: 0}
        let cohesion = {x: 0, y: 0}
        let separation = {x: 0, y: 0}

        let neighborCount = 0

        this.agents.forEach(other => {
            if (other != agent && agent.distanceSquare(agent) < this.flockingRadius) {
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
    /**
     * Removes agents containing spaces that are too small or too large.
     * Updates this.agents.
     */
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
    /**
     * Builds a relative neighborhood graph.
     * Updates this.adjacencyMatrix.
     */
    buildGraph() {
        this.adjacencyMatrix = new Array()

        for (let i = 0; i < this.agents.length; ++i) {
            this.adjacencyMatrix.push(new Array())

            for (let j = 0; j < this.agents.length; ++j) {
                this.adjacencyMatrix[i][j] = false
            }
        }

        for (let i = 0; i < this.agents.length; ++i) {
            for (let j = 0; j < this.agents.length; ++j) {
                let addEdge = true

                let agentI = this.agents[i]
                let agentJ = this.agents[j]

                if (!agentI.intersects(agentJ)) {
                    let dist = agentI.distanceSquare(agentJ)

                    for (let z = 0; z < this.agents.length; ++z) {
                        let agentZ = this.agents[z]
                        if (agentI.distanceSquare(agentZ) < dist &&
                            agentJ.distanceSquare(agentZ) < dist) {
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
    /**
     * Links the spaces as determined by the edges of the relative neighborhood
     * graph represented by this.adjacencyMatrix.
     * Updates this.agents.
     */
    linkSpaces() {
        let agentLength = this.agents.length

        for ( let i = 0; i < agentLength; ++i) {
            for ( let j = 0; j < agentLength; ++j) {
                if (i != j && this.adjacencyMatrix[i][j]) {
                    this.buildLink(this.agents[i], this.agents[j])
                }
            }
        }
    }
    /**
     * Builds the links between the spaces encapsulated by the two given agents.
     * Updates this.agents.
     * @todo Reduce the amount of duplicate code in this method (notably with
     *       the code to determine the position and dimensions of the bridges).
     * @todo Improve linking code--islands sometime remain and soem bridges don't
     *       seem to make much sense. Good enough for now, though...
     * @param {Agent} agent1 - First agent
     * @param {Agent} agent2 - Second agent
     */
    buildLink (agent1, agent2) {
        // if they're already intersecting, we good
        if (agent1.intersects(agent2)) {
            return
        }

        // helper function to make a new connecting agent
        let addLink = (x, y, width, height) => {
            let newAgent = new Agent(new Space({
                position: {x: x, y: y},
                width: width,
                height: height
            }))

            this.agents.push(newAgent)

            return newAgent
        }

        // I'm lazy
        let space1 = agent1.space
        let space2 = agent2.space

        // determine relative position
        // don't really need centroid2
        // would be better to develop algorithm that doesn't always start
        // building bridges from the centroid
        let centroid1 = agent1.centroid()
        let centroid2 = agent2.centroid()

        // random important dimension of bridges
        let offset = this.getRandom(2, 5)

        // cut space into four diagonal quadrants
        let x2 = space1.position.x + space1.width
        let y2 = space1.position.y + space1.height

        let m = Math.abs((y2 - space1.position.y) /
            (x2 - space1.position.x))

        let xc = (space1.position.x + x2) / 2
        let yc = (space1.position.y + y2) / 2

        // is space2 in the diagonal quadrant going above or below space1?
        let isVerticalCenter = Math.abs(space2.position.y - yc) >
            m * Math.abs(space2.position.x - xc)

        if (isVerticalCenter) {
            let top = space2
            let bottom = space1

            if (space1.position.y < space2.position.y) {
                top = space1
                bottom = space2
            }

            // dunno if the padding is really necessary for y and height
            let x = centroid1.x - offset / 2
            let y = top.position.y + top.height - 1
            let width = offset
            let height = bottom.position.y - y + 1

            var bridge = addLink(x, y, width, height)

            // do we need a second bridge?
            if (!bridge.intersects(agent2)) {
                let spaceB = bridge.space
                let left = space2
                let right = spaceB

                if (spaceB.position.x < space2.position.x) {
                    left = spaceB
                    right = space2
                }

                // spaceB should always come from the top
                // dunno if adding is necessary for x and width
                let x = left.position.x - 1
                let y = spaceB.position.y + spaceB.height - offset
                let width = right.position.x - x + 1
                let height = offset

                if (left != spaceB) {
                    // the new bridge should extend across the old one
                    x += left.width
                    width += spaceB.width - left.width
                }

                addLink(x, y, width, height)
            }

            return
        }

        // is space2 in the diagonal quadrant going left or right of space1?
        let isHorizontalCenter = Math.abs(space2.position.y - yc) <
            m * Math.abs(space2.position.x - xc)

        if (isHorizontalCenter) {
            let left = space2
            let right = space1

            if (space1.position.x < space2.position.x) {
                left = space1
                right = space2
            }

            // dunno if adding is necessary for x and width
            let x = left.position.x + left.width - 1
            let y = centroid1.y - offset / 2
            let width = right.position.x - x + 1
            let height = offset

            let bridge = addLink(x, y, width, height)

            // do we need a second bridge?
            if (!bridge.intersects(agent2)) {
                let spaceB = bridge.space
                let top = space2
                let bottom = spaceB

                if (spaceB.position.y < space2.position.y) {
                    top = spaceB
                    bottom = space2
                }

                // spaceB should always come from the left
                // dunno if padding is necessary for y and height
                let x = spaceB.position.x + spaceB.width - offset
                let y = top.position.y + top.height - 1
                let width = offset
                let height = bottom.position.y - y + 1

                if (top != spaceB) {
                    y += top.height
                    height += spaceB.height - top.height
                }

                addLink(x, y, width, height)
            }
            return
        }
    }
    /**
     * Attempts to trim the fat from the dungeon.
     * Updates this.agents.
     * @todo Revisit and try to think of ways to improve.
     * @todo Not convinced the intesection method is reliable...
     */
    trim() {
        this.agents.forEach(agent => {
            let intersected = false
            this.agents.forEach(other => {
                if (agent != other && other.intersects(agent)) {
                    intersected = true
                }
            })

            if (!intersected) {
                agent.delete = true
            }
        })

        this.agents = this.agents.filter(a => !a.delete)
    }
    /**
     * Generates a random point within the circle defined by the given radius.
     * @param {number} radius - Radius of the random generation circle.
     * @return {x, y} Coordinates of point inside circle.
     */
    getRandomPointInCircle(radius) {
        let t = 2 * Math.PI * Math.random()
        let u = Math.random() + Math.random()
        let r = u > 1 ? 2 - u : u
        return {x: radius * r * Math.cos(t), y: radius * r * Math.sin(t)}
    }
    /**
     * Generates random dimensions between this.minimumSpace and this.maximumSpace
     * @return {width, height} Random dimensions!
     */
    getRandomDimensions() {
        return {
            width: Math.floor(this.getRandom(this.minimumSpace.width, this.maximumSpace.width)),
            height: Math.floor(this.getRandom(this.minimumSpace.height, this.maximumSpace.height))
        }
    }
    /**
     * Gets some random number within the given range.
     * @param {number} minimum - Minimum number.
     * @param {number} maximum - Maximum number.
     * @return {number} Random number within range.
     */
    getRandom(minimum, maximum) {
        return Math.random() * (maximum - minimum) + minimum
    }
}

module.exports = DungeonGenerator
