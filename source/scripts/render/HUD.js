import React from "react"

import DATA from "scripts/data"

export default class HUD extends React.Component {
    render() {
        return (
            <div id="hud">
                {this.bloodscreen}
                {this.killcount}
                {this.hearts}
            </div>
        )
    }
    get bloodscreen() {
        if(!!this.props.game.adventurer.bloodscreen) {
            return (
                <div id="bloodscreen"/>
            )
        }
    }
    get killcount() {
        return (
            <span id="killcount">
                {this.props.game.wave.killcount}
            </span>
        )
    }
    get hearts() {
        var hearts = new Array()

        for(var health = 1; health <= this.props.game.adventurer.maxhealth; health += 1) {
            hearts.push(<Heart key={health} fill={this.calculateHeartFill(health)}/>)
        }

        return (
            <div id="hearts">
                {hearts}
            </div>
        )
    }
    calculateHeartFill(health) {
        if(health <= this.props.game.adventurer.health) {
            return 100
        } else if(health < this.props.game.adventurer.health + 1) {
            return 50
        } else {
            return 0
        }
    }
}

class Heart extends React.Component {
    render() {
        return (
            <div className="heart" style={this.style}/>
        )
    }
    get style() {
        return {
            backgroundImage: "url(" + DATA.SPRITES.HUD.HEART[this.props.fill] + ")"
        }
    }
}
