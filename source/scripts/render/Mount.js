import React from "react"
import ReactDOM from "react-dom"

var Entity = require("./Entity")
var AspectRatioFrame = require("./AspectRatioFrame")

class Mount extends React.Component {
    render() {
        if(!!this.state) {
            return (
                <AspectRatioFrame width={320} height={180}>
                    {this.state.game.entities.map((entity, key) => {
                        return <Entity data={entity} key={key}/>
                    })}
                </AspectRatioFrame>
            )
        } else {
            return <div/>
        }
    }
}

export default function Render() {
    var mount = ReactDOM.render(<Mount/>, document.getElementById("mount"))
    return function(state) {
        mount.setState(state)
    }
}
