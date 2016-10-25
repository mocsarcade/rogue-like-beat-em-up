var fs = require("fs")
var path = require("path")
var ncp = require("ncp").ncp
ncp.limit = 16
ncp("./electron-bootstrap.js", "./builds/web/electron-bootstrap.js", function(err){
    if (err) {
        console.log("Make sure you've built the game before you electronify it.")
        process.exit()
    }
})
ncp("./package.json", "./builds/web/package.json")

var packager = require('electron-packager')
packager({
    "dir":"builds/web",
    "all":true
})
