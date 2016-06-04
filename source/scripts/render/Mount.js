import React from "react"

import Frame from "./Frame.js"
import Entity from "./Entity.js"

const WIDTH = 192 // 16 * 12
const HEIGHT = 288 // 24 * 12

export default class Mount extends React.Component {
    render() {
        if(!!this.state) {
            return (
                <Frame width={WIDTH} height={HEIGHT}>
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
