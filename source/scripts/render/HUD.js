import React from "react"

export default class HUD extends React.Component {
    render() {
        return (
            <div id="hud">
                <span>{this.props.game.wave.countdown}</span>
            </div>
        )
    }
}
