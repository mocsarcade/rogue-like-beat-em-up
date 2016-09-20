// This is a sample for you to
// copy and paste and rewrite for
// your own tests! Isn't that nice?

// If you want your tests to be run,
// make sure your file ends with either
// "Test" or "Tests". :]


// You should first import `expect.js`.
// It's our assertion library, and it's
// very minimalistic and unopinionated.
// You can read more about it on github:
// https://github.com/Automattic/expect.js

import Expect from "expect.js"

// You should probably also import any
// other modules within our codebase that
// you are testing. Most tests will be run
// from our container class, `Game`.

import Game from "scripts/model/Game.js"


// You should export a "named" function.
// If your test should fail, we log the
// error with the name of the function.
// So if you don't give it a name, we
// won't know which function failed!

// Also, by convention, we try to match
// the name of the file to the name of
// whatever it is exporting.

// So be sure to rename this function
// to something other than SampleTest!

export default function SampleTest() {


    // You should initialize
    // everything in your model.
    // Maybe pass in some parameters
    // into our `Game` class.
    var game = new Game({
        // your parameters
    })


    // You should write some different
    // assertions about the functionality
    // of your model. Remember, the code
    // from your tests will be included
    // in the code review!
    Expect(game).to.be(game)
}


// And when you're done copying and
// pasting and rewriting this sample,
// you should delete all these comments!
