import React from "react"

import Frame from "scripts/render/Frame.js"
import Entity from "scripts/render/Entity.js"
import Camera from "scripts/render/Camera.js"
import HUD from "scripts/render/HUD.js"

export default class Mount extends React.Component {
    render() {
        if(!!this.state) {
            return (
                <Frame frame={this.state.frame}>
                    <HUD game={this.state.game}/>
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
