import Tester from "scripts/utility/Tester.js"

// Here be black magic. We're asking webpack, our compiler, to
// import any and all modules that end with "Test". Weird, huh?
// If you add a file named "HelloWorldTest"
var context = require.context("scripts/tests", false, /Tests?$/)
var tests = context.keys().map((key) => {
    return context(key).default
})

console.log("Running " + tests.length + " tests.")

var time = window.performance.now()

tests.forEach((test) => {
    Tester(test)
})

time = (window.performance.now() - time) / 1000
time = time.toFixed(3) + " seconds"

console.log("Testing took " + time + ".")
