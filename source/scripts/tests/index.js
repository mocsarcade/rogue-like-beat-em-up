import Tester from "scripts/utility/Tester.js"

// Here be black magic. We're asking webpack, our compiler, to
// import any and all modules that end with "Test". Weird, huh?
// If you add a file named "HelloWorldTest"
var context = require.context("scripts/tests", false, /Tests?$/)
var tests = context.keys().map((key) => {
    return context(key).default
})

// Run all the tests!!
console.log("Running " + tests.length + " tests.")
tests.forEach((test) => {
    Tester(test)
})
