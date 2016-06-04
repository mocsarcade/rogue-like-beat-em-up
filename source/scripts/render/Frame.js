import React from "react"

export default class Frame extends React.Component {
    render() {
        return (
            <div className="frame" style={this.style}>
                {this.props.children}
            </div>
        )
    }
    get style() {
        return {
            top: "0px",
            left: "0px",
            right: "0px",
            bottom: "0px",
            margin: "auto",
            position: "fixed",
            overflow: "hidden",
            width: this.props.width + "px",
            height: this.props.height + "px",
            backgroundColor: this.props.color || "#222",
            transform: "scale(" + this.scale + ")",
            transformOrigin: "center",
        }
    }
    get scale() {
        return Math.min(
            window.innerWidth / this.props.width,
            window.innerHeight / this.props.height
        )
    }
}
