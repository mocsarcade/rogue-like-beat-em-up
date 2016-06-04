// Given the name of a key, returns the value that is keyed
// by that name from the URL. So querying for "name" from
// "localhost:13821?name=Andrew" returns "Andrew".

export function QueryURL(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]")
    var results = new RegExp("[\\?&]" + name + "=([^&#]*)").exec(location.search)
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "))
}
