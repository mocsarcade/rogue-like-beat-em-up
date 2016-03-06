// Given the name of a key, returns the value that is keyed
// by that name from the URL. So querying for "name" from
// "localhost:13821?name=Andrew" returns "Andrew".
module.exports.queryURL = function(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]")
    var results = new RegExp("[\\?&]" + name + "=([^&#]*)").exec(location.search)
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "))
}


module.exports.Point = class Point {
    constructor(point = {}) {
        this.x = point.x || 0
        this.y = point.y || 0
    }
    toString() {
        return this.x + "x" + this.y
    }
    toPoint(that = {}) {
        return new Point({
            x: this.x + (that.x || 0),
            y: this.y + (that.y || 0)
        })
    }
}
