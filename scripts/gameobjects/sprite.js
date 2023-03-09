'use strict'

class Sprite {
    constructor(path) {
        this._image = new Image
        this._image.src = 'res/' + path
    }

    get image() {
        return this._image
    }

    get width() {
        return this._image.naturalWidth
    }

    get height() {
        return this._image.naturalHeight
    }
}