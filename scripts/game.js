'use strict'

let Game = {
    debug: false,
    currentScene: null,

    _canvas: null,
    _screen: null,
    _running: false,

    isDebugging: function() {
        return this.debug
    },

    tick: function() {
        if (this.currentScene)
            this.currentScene.tick()
    },

    render: function() {
        // Clears the screen
        Game._screen.clearRect(0, 0, this._canvas.width, this._canvas.height);

        if (this.currentScene)
            this.currentScene.render(this._screen)
    },

    // Runs
    run: function() {
        let lastTime = 0
        let ticks = 0
        let fps = 0

        function loop() {
            // Will keep looping
            if (Game._running)
                window.requestAnimationFrame(loop)

            let currentTime = (new Date).getTime()
            let delta = (currentTime - lastTime) / 1000

            if (delta >= 1) {
                // Shows fps and ticks
                console.log('Ticks: ' + ticks + ', FPS: ' + fps)
                ticks = 0
                fps = 0
                lastTime = currentTime
            }
            ticks++
            fps++

            // Updates and render are glued
            Game.tick()
            Game.render()
        }
        loop()
    },

    // Starts the game
    start: function(canvas) {
        this._canvas = canvas
        this._screen = this._canvas.getContext('2d')
        this.play()
    },

    // Restarts the game only when it has already started
    play() {
        this._running = true
        this.run()
    },

    // Stops the game
    pause: function() {
        this._running = false
    }
}