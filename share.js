var ghpages = require("gh-pages")
var path = require("path")

var VERSION = "v" + require("./package.json").version

ghpages.publish(path.join(__dirname, "builds/web"), {
    message: "Push " + VERSION,
    tag: VERSION,
    add: true,
    logger: function(log) {
        console.log(log)
    }
}, function(error) {
    if(error) {
        console.log(error)
    }
})
