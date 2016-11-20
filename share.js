var ghpages = require("gh-pages")
var path = require("path")
var yargs = require("yargs")
var fs = require("fs")
var rimraf = require("rimraf")
var ncp = require("ncp").ncp

ncp.limit = 16
var NAME = yargs.argv._[0]

// Start off clearing the shares directory
rimraf("./shares", function() {

    // Make the "shares/name" directory
    fs.mkdirSync("shares/")
    fs.mkdirSync("shares/" + NAME)

    // Copy the build to the "shares/name" directory
    ncp("builds/web/", "shares/" + NAME + "/", function(err) {
        if (err) {
            // Log any errors in copying
            console.log("couldn't copy files: " + err)
        }
        else {
            // Publish the build to the gh-pages branch
            ghpages.publish(path.join(__dirname, 'shares/'), {
                add: true,
                repo: 'git@github.com:mocsarcade/enchiridion.git',
                logger: function(message) {
                    console.log(message);
                }
            })
        }
    })

})
