var AUDIO = {
    RED: require("audio/red.mp3"),
    YELLOW: require("audio/yellow.mp3"),
    PURPLE: require("audio/purple.mp3"),
}

var redTrack = new Audio(AUDIO.RED)
var yellowTrack = new Audio(AUDIO.YELLOW)
var purpleTrack = new Audio(AUDIO.PURPLE)

//1.0 is normal speed
//0.5 is half speed (slower)
//2.0 is double speed (faster)
//-1.0 is backwards, normal speed
//-0.5 is backwards, half speed
//when you switch rooms you should speed up or slow down the music to match the pace of the room
redTrack.playbackRate = 1
yellowTrack.playbackRate = 1
purpleTrack.playbackRate = 1

redTrack.volume = 0.5
yellowTrack.volume = 0.5
purpleTrack.volume = 0.5

redTrack.play()

redTrack.onended = function() {
    yellowTrack.play()
}

yellowTrack.onended = function() {
    purpleTrack.play()
}

purpleTrack.onended = function() {
    redTrack.play()
}
