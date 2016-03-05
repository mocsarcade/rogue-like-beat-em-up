function queryURL(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]")
    var results = new RegExp("[\\?&]" + name + "=([^&#]*)").exec(location.search)
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "))
}

module.exports = queryURL
