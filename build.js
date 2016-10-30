// Build, Version 5.x

var fs = require("fs")
var path = require("path")
var yargs = require("yargs")
var rimraf = require("rimraf")
var ip = require("internal-ip")
var filesize = require("filesize")
var dateformat = require("dateformat")
var chalk = require("chalk")

var Webpack = require("webpack")
var BrowserSync = require("browser-sync")

var WebpackStatsPlugin = require("stats-webpack-plugin")
var WebpackExtractPlugin = require("extract-text-webpack-plugin")
var WebpackProgressBarPlugin = require("progress-bar-webpack-plugin")
var WebpackDefinePlugin = require("extended-define-webpack-plugin")

var DATE_MASK = "hh:MM:TT"

var PORT = 4444
var NAME = require("./package.json").name
var VERSION = "v" + require("./package.json").version
var STAGE = yargs.argv.production ? "PRODUCTION" : "DEVELOPMENT"
var MODE = yargs.argv._.indexOf("server") != -1 ? "SERVER" : null

var build = new Object()

rimraf("./builds/web", function() {
    Webpack({
        resolve: {
            root: [
                path.resolve("./source"),
            ],
        },
        entry: {
            "index.html": "./source/index.html",
            "index.css": "./source/index.css",
            "index.js": "./source/index.js"
        },
        output: {
            filename: "[name]",
            path: "./builds/web/" + VERSION,
        },
        module: {
            preLoaders: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules)/i,
                    loader: "eslint-loader"
                },
                {
                    test: /\.json$/i,
                    exclude: /(node_modules)/i,
                    loader: "json-loader",
                },
            ],
            loaders: [
                {
                    test: /\.js$/i,
                    exclude: /(node_modules)/i,
                    loader: "babel-loader",
                },
                {
                    test: /\.css$/i,
                    loader: new WebpackExtractPlugin("name", "[name]").extract([
                        "css-loader", "postcss-loader",
                    ]),
                },
                {
                    test: /\.html$/i,
                    loader: new WebpackExtractPlugin("name", "[name]").extract([
                        "html-loader?interpolate"
                    ]),
                },
                {
                    test: /\.(ttf|woff|eot)$/i,
                    loader: "url-loader",
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/i,
                    loader: "url-loader",
                },
                {
                    test: /\.(mp3|wav|ogg)$/i,
                    loader: "url-loader"
                },
            ],
        },
        postcss: function() {
            return [
                require("precss"),
                require("autoprefixer"),
            ]
        },
        plugins: [
            new WebpackProgressBarPlugin({
                width: DATE_MASK.length,
                complete: chalk.green("O"),
                incomplete: chalk.red("0"),
                format: "[:bar] Building (:elapseds)",
                summary: false, customSummary: function() {},
            }),
            new WebpackDefinePlugin({
                NAME: NAME,
                VERSION: VERSION,
                STAGE: STAGE,
            }),
            new WebpackStatsPlugin("stats.json"),
            new WebpackExtractPlugin("name", "[name]"),
            // new Webpack.optimize.UglifyJsPlugin(),
        ],
        watch: (
            MODE == "SERVER"
        ),
    }, function(error, results) {
        results = results.toJson()

        var time = results.time / 1000 + "s"
        var size = filesize(results.assets.reduce(function(size, asset) {
            return size + asset.size
        }, 0), {spacer: ""})

        print("Building (" + time + ")(" + size + ")")

        results.errors.forEach(function(error) {console.log(error.toString())})
        results.warnings.forEach(function(warning) {console.log(warning.toString())})

        if(MODE == "SERVER") {
            if(build.server == null) {
                build.server = BrowserSync({
                    server: "./builds/web/" + VERSION,
                    logLevel: "silent",
                    notify: false,
                    host: "localhost",
                    port: PORT
                })

                print("Listening on " + chalk.underline("http://" + "127.0.0.1" + ":" + PORT))
                print("Listening on " + chalk.underline("http://" + ip.v4() + ":" + PORT))
            } else if(build.server != null) {
                build.server.reload()
            }
        }
    })
})

function print(message) {
    var time = dateformat(new Date(), DATE_MASK)
    console.log("[" + chalk.green(time) + "]", message)
}
