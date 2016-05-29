import React from "react"
import ReactDOM from "react-dom"

import Frame from "./OldFrame.js"
import Entity from "./Entity.js"

class Mount extends React.Component {
    render() {
        if(!!this.state) {
            return (
                <Frame width={320} height={180}>
                    {this.state.game.entities.map((entity, key) => {
                        return <Entity data={entity} key={key}/>
                    })}
                </Frame>
            )
        } else {
            return <div/>
        }
    }
}

export function Render() {
    var mount = ReactDOM.render(<Mount/>, document.getElementById("mount"))
    return function(state) {
        mount.setState(state)
    }
}
