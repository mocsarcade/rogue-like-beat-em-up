var build = require("./build.js")
var fs = require("fs")
var path = require("path")
var ncp = require("ncp").ncp
ncp.limit = 16
ncp("./electron-bootstrap.js", "./builds/web/electron-bootstrap.js")
ncp("./package.json", "./builds/web/package.json")

var packager = require('electron-packager')
packager({
    "dir":"builds/web",
    "all":true
})
