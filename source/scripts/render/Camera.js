import React from "react"

import DATA from "scripts/data"

export default class Camera extends React.Component {
    render() {
        return (
            <div className="camera" style={this.style}>
                {this.props.children}
            </div>
        )
    }
    get style() {
        return {
            position: "absolute",
            left: -1 * (this.props.camera.position.x - (DATA.FRAME.WIDTH / 2)) * DATA.TILE.WIDTH + "px",
            top: -1 * (this.props.camera.position.y - (DATA.FRAME.HEIGHT / 2)) * DATA.TILE.HEIGHT + "px",
            transitionDuration: (this.props.camera.speed || 0.5) + "s",
            transitionProperty: "top, left",
        }
    }
}
