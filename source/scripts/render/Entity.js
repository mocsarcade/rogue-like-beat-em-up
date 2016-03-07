var React = require("react")
var Media = require("../Media")

var UNIT = 20
var NULL_TEXTURE = Media.images.textures.null

class Entity extends React.Component {
    render() {
        return React.createElement("div", {
            // Identity
            className: "entity",
            id: this.props.data.id,
            key: this.props.data.key,
            style: {
                // Size
                width: Math.ceil(this.props.data.width || 1) * UNIT + "px",
                height: Math.ceil(this.props.data.height || 1) * UNIT + "px",
                // Position
                position: "absolute",
                left: Math.floor(this.props.data.position && this.props.data.position.x || 0) * UNIT + "px",
                top: Math.floor(this.props.data.position && this.props.data.position.y || 0) * UNIT + "px",
                marginLeft: this.props.data.anchor && this.props.data.anchor.x ? -1 * Math.floor((Math.ceil((this.props.data.width || 1) - 1) * Math.min(Math.max(this.props.data.anchor.x, 0), 1))) * UNIT + "px" : null,
                marginTop: this.props.data.anchor && this.props.data.anchor.y ? -1 * Math.floor((Math.ceil((this.props.data.height || 1) - 1) * Math.min(Math.max(this.props.data.anchor.y, 0), 1))) * UNIT + "px" : null,
                // Background
                backgroundRepeat: !!this.props.data.texture ? "repeat" : null,
                backgroundSize: !!this.props.data.texture ? UNIT + "px" : null,
                backgroundPosition: !!this.props.data.texture ? "bottom" : null,
                backgroundColor: !!this.props.data.color ? this.props.data.color : null,
                backgroundImage: !this.props.data.color ? "url(" + NULL_TEXTURE + ")" : null,
                WebkitMaskImage: !!this.props.data.shape ? "url(" + this.props.data.shape + ")" : null,
                WebkitMaskRepeat: !!this.props.data.shape ? "no-repeat" : null,
                WebkitMaskPosition: !!this.props.data.shape ? "bottom" : null,
                WebkitMaskSize: !!this.props.data.shape ? "contain" : null,
                // Transition
                transitionProperty: !!this.props.data.transition ? "top, left" : null,
                transitionTimingFunction: !!this.props.data.transition ? this.props.data.transition.timing || "ease" : null,
                transitionDuration: !!this.props.data.transition ? (this.props.data.transition.duration || 0.2) + "s" : null,
                transitionDelay: !!this.props.data.transition && !!this.props.data.transition.delay ? this.props.data.transition.delay + "s" : null,
                // Transforms
                transform: [
                    !!this.props.data.skew ? "skewX(" + (this.props.data.skew || 0) + "deg)" : null,
                    !!this.props.data.rotation ? "rotateZ(" + ((this.props.data.rotation || 0) % 360) + "deg)" : null,
                    !!this.props.data.direction ? "scaleX(" + ((this.props.data.direction || 1) > 0 ? +1 : -1) + ")" : null,
                ].join("") || null,
                transformOrigin: !!this.props.data.rotation || !!this.props.data.skew || !!this.props.data.direction ? "center" : null,
                // Miscellaneous
                zIndex: (this.props.data.position && this.props.data.position.y || 0) + (this.props.data.stack || 0),
                opacity: this.props.data.opacity,
                visibility: this.props.data.isHidden ? "hidden" : null
            },
            // Events
            onClick: this.onClick.bind(this),
            onDoubleClick: this.onDoubleClick.bind(this),
        })
    }
    onClick(event) {
        if(!!this.props.data.onClick) {
            this.props.data.onClick(event)
        }
    }
    onDoubleClick(event) {
        if(!!this.props.data.onDoubleClick) {
            this.props.data.onDoubleClick(event)
        }
    }
}

module.exports = Entity
