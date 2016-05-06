const BREATHE = 1000
const VOLUME = 0.5

export default class Jukebox {
    constructor(musics) {
        if(musics instanceof Array == false) {
            musics = new Array(musics)
        }

        this.musics = musics
        this.musics.forEach((music) => {
            if(music instanceof Audio == false) {
                throw new Error("Jukebox only accepts Audio")
            }

            music.volume = VOLUME
            music.onended = () => {
                window.setTimeout(() => {
                    this.musics.push(this.musics.shift())
                    this.musics[0].play()
                }, BREATHE)
            }
        })
    }
    play() {
        this.musics[0].play()
        return this
    }
    pause() {
        this.musics[0].pause()
        return this
    }
}
