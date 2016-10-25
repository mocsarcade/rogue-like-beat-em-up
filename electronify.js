var fs = require("fs")
var path = require("path")

var packager = require('electron-packager')
packager({
    "dir":"builds/web",
    "all":true
})
