var Entity = require("./Entity.js")

class Creature extends Entity {
    constructor(creature) {
        super(creature)
        
        this.height = 2
        this.anchor = {x: 0, y: 1}
        
        this.health = creature.health || 1
        this.strength = creature.strength || 1
        
        this.transition = true
        this.stack = 1
    }
    move(movement = new Object()) {
        movement.x = movement.x || 0
        movement.y = movement.y || 0
        
        // Handle collision between the monster
        // and the walls of the dungeon.
        
        var isInSpace = this.game.dungeon.spaces.some((space) => {
            return space.contains({
                x: this.position.x + movement.x,
                y: this.position.y + movement.y
            })
        })
        
        if(!isInSpace) {
            movement.x = 0
            movement.y = 0
            
            if(!!this.onCollide) {
                this.onCollide("wall")
            }
        }
        
        // Handle collision between this monster
        // and the other monsters in the dungeon.
        
        var monster = this.game.dungeon.monsters.find((monster) => {
            if(monster != this) {
                if(monster.position.x == this.position.x + movement.x
                && monster.position.y == this.position.y + movement.y) {
                    return true
                }
            }
        })
        
        if(!!monster) {
            movement.x = 0
            movement.y = 0
            
            if(!!this.onCollide) {
                this.onCollide(monster)
            }
        }
        
        // Handle collision between the
        // monster and the adventurer.
        
        var adventurer = this.game.adventurer
        
        if(this.position.x + movement.x == adventurer.position.x
        && this.position.y + movement.y == adventurer.position.y) {
            movement.x = 0
            movement.y = 0
            
            if(!!this.onCollide) {
                this.onCollide(adventurer)
            }
        }
        
        // Move the creature.
        
        this.position.x += movement.x
        this.position.y += movement.y
        
        if(!!this.onHasMoved) {
            this.onHasMoved()
        }
    }
    takeDamage(damage = 0) {
        this.health -= damage
        if(this.health <= 0) {
            if(!!this.onDeath) {
                this.onDeath()
            }
        }
    }
}

module.exports = Creature
