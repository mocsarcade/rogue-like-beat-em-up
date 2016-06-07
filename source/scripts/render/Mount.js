import React from "react"

import Frame from "./Frame.js"
import Entity from "./Entity.js"
import Interface from "./Interface.js"

const WIDTH = 16 * 9
const HEIGHT = 24 * 9

export default class Mount extends React.Component {
    render() {
        if(!!this.state) {
            if(this.state.game.isReady) {
                return (
                    <Frame frame={this.state.frame}>
                        <Interface game={this.state.game}/>
                        {this.state.game.entities.map((entity) => {
                            return <Entity data={entity} key={entity.key}/>
                        })}
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
