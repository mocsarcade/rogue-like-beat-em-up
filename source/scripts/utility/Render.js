import React from "react"
import ReactDOM from "react-dom"

import Mount from "scripts/render/Mount.js"

export default function Render() {
    var mount = ReactDOM.render(<Mount/>, document.getElementById("mount"))
    return function(state) {
        mount.setState(state)
    }
}
