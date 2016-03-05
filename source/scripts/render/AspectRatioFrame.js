var React = require("react")

class AspectRatioFrame extends React.Component {
    render() {
        return (
            <div className="frame" style={this.renderStyle()}>
                {this.props.children}
            </div>
        )
    }
    renderStyle() {
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
            transform: "scale(" + Math.min(
                window.innerWidth / this.props.width,
                window.innerHeight / this.props.height
            ) + ")",
        }
    }
}

module.exports = AspectRatioFrame
