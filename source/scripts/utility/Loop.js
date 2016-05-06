import raf from "raf"

export default function Loop(func) {
    (function loop(delta) {
        func(Math.min(window.performance.now() - delta, 1000))
        raf(loop.bind(this, window.performance.now()))
    })(window.performance.now())
}
