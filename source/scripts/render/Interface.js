import React from "react"

export default class Interface extends React.Component {
    render() {
        return (
            <div style={this.style}/>
        )
    }
    get style() {
        return {
            zIndex: 99,
            top: 4 + "px",
            left: 4 + "px",
            position: "absolute",
            width: 16 + 2 + 1 + "px",
            height: 24 + 2 + "px",
            backgroundColor: "#222",
            border: "solid #FFF 1px",
            backgroundRepeat: "no-repeat",
            //backgroundPosition: "1px 0px",
            backgroundImage: "url(" + this.props.game.adventurer.weapon + ")"
        }
    }
}
