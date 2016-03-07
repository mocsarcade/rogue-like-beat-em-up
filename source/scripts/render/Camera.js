var React = require("react")

var UNIT = 20

class Camera extends React.Component {
    render() {
        return (
            <div className="camera" key={this.props.data.key} style={this.renderStyle()}>
                {this.props.children}
            </div>
        )
    }
    renderStyle() {
        return {
            // Position
            transform: [
                "scale(" + (this.props.data.zoom || 1) + ")",
                "translateX(" + (this.props.data.position.x * -1 * UNIT) + "px)",
                "translateY(" + (this.props.data.position.y * -1 * UNIT) + "px)",
            ].join(" "),
            transformOrigin: "top left",
            // Transition
            transitionDuration: "0.6s",
            transitionProperty: "transform",
            transitionTimingFunction: "ease",
        }
    }
}

module.exports = Camera
