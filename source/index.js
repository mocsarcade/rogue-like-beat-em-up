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

/////////////////////
///// Modeling /////
///////////////////

var Game = require("./scripts/model/Game.js")

var state = new Object({
    game: new Game({
        // ...
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

var Entity = require("./scripts/render/Entity")
var AspectRatioFrame = require("./scripts/render/AspectRatioFrame")

class Mount extends React.Component {
    render() {
        if(!!this.state) {
            return (
                <AspectRatioFrame width={320} height={180}>
                    {this.state.game.entities.map((entity, index) => {
                        return <Entity data={entity} key={index}/>
                    })}
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

var loop = new Afloop(function() {
    state.game.update()
    mount.setState(state)
})