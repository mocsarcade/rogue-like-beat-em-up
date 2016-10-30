const Electron = require("electron")

var window = null

Electron.app.on("ready", function() {
    window = new Electron.BrowserWindow({width: 800, height: 600})
    window.loadURL("file://" + __dirname + "/builds/web/index.html")
    window.webContents.openDevTools({mode: "bottom"})

    window.on("closed", function() {
        window = null
    })
})

Electron.app.on("window-all-closed", function() {
    Electron.app.quit()
})
