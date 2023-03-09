'use strict'

class Scene {
    constructor(game) {
        this.gravity = 0.0981

        this._game = game
        this._entities = []
        this._camera = new Camera(900, 600)
    }

    get entities() {
        return this._entities
    }

    get camera() {
        return this._camera
    }

    isDebugging() {
        return this._game.isDebugging()
    }

    addEntity(entity) {
        entity.currentScene = this
        this._entities.push(entity)
    }

    tick() {
        this._entities.forEach(e => {
            e.tick()
        })
    }

    render(canvas) {
        this._entities.forEach(e => {
            e.render(canvas)
        })
    }
}