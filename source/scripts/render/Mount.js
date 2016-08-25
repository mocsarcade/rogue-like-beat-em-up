import React from "react"

import Frame from "./Frame.js"
import Entity from "./Entity.js"
import Camera from "./Camera.js"

export default class Mount extends React.Component {
    render() {
        if(!!this.state) {
            return (
                <Frame frame={this.state.frame}>
                    {this.state.game.entities.map((entity) => {
                        return <Entity data={entity} key={entity.key}/>
                    })}
                </Frame>
            )
        } else {
            return <div/>
        }
    }
}
