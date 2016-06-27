import React from "react"

import Frame from "./Frame.js"
import Entity from "./Entity.js"
import Camera from "./Camera.js"

export default class Mount extends React.Component {
    render() {
        if(!!this.state) {
            if(this.state.game.isReady) {
                return (
                    <Frame frame={this.state.frame}>
                        <Camera camera={this.state.game.camera}>
                            {this.state.game.entities.map((entity) => {
                                return <Entity data={entity} key={entity.key}/>
                            })}
                        </Camera>
                    </Frame>
                )
            } else {
                return (
                    <Frame frame={this.state.frame}>
                        <span>...</span>
                    </Frame>
                )
            }
        } else {
            return <div/>
        }
    }
}
