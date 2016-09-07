import React from "react"

import Frame from "scripts/render/Frame.js"
import Entity from "scripts/render/Entity.js"
import Camera from "scripts/render/Camera.js"

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
