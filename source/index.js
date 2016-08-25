////////////////////////////////////////////////////////
//    _____         _   _     _   _ _                //
//   |   __|___ ___| |_|_|___|_|_| |_|___ ___       //
//   |   __|   |  _|   | |  _| | . | | . |   |     //
//   |_____|_|_|___|_|_|_|_| |_|___|_|___|_|_|    //
//                                               //
//////////////////////////////////////////////////

//////////////////////
///// Importing /////
////////////////////

var Keyb = require("keyb")
var React = require("react")
var ReactDOM = require("react-dom")
var Afloop = require("afloop")

/////////////////////////
///// Initializing /////
///////////////////////

var Game = require("./scripts/model/Game.js")

var state = new Object({
    game: new Game({
        dungeons: [
            {colors: ["#666", "#555"], size: 10},
            {colors: ["#400", "#500"], size: 25},
            {colors: ["#040", "#050"], size: 50},
            {colors: ["#004", "#005"], size: 100},
        ]
    })
})

// While developing, we expose the game state
// to the window, so we can examine it via the
// browser javascript console. Please do not
// try to use this global variable elsewhere.

if(STAGE == "DEVELOPMENT") {
    window.state = state
}

//////////////////////
///// Rendering /////
////////////////////

// This is where we declaratively define how
// the game will be rendered, given the state.

var Entity = require("./scripts/render/Entity")
var Camera = require("./scripts/render/Camera")
var AspectRatioFrame = require("./scripts/render/AspectRatioFrame")

class Mount extends React.Component {
    render() {
        if(!!this.state) {
            return (
                <AspectRatioFrame width={320} height={180} color={"#222"}>
                    <Camera data={this.state.game.camera}>
                        {this.state.game.entities.map((entity) => {
                            return <Entity data={entity} key={entity.id}/>
                        })}
                    </Camera>
                </AspectRatioFrame>
            )
        } else {
            return <div/>
        }
    }
}

var mount = ReactDOM.render(<Mount/>, document.getElementById("mount"))

////////////////////
///// Looping /////
//////////////////

var loop = new Afloop(function(delta) {
    state.game.onLoop(delta)
    mount.setState(state)
})
