import React from "react"

import DATA from "../DATA"

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
            left: -1 * (this.props.camera.position.x - (DATA.FRAME.WIDTH / 2) + 0.5) * DATA.TILE.WIDTH + "px",
            top: -1 * (this.props.camera.position.y - (DATA.FRAME.HEIGHT / 2) + 0.5) * DATA.TILE.HEIGHT + "px",
            transitionProperty: "top, left",
            transitionDuration: "1s",
        }
    }
}
