'use strict'

class Animation {
    constructor() {
        this.speed = 30

        this._currentSprite = null
        this._spriteTags = []
        this._sprites = {}
        this._time = 0
        this._paused = false
    }

    play() {
        this._paused = false
    }

    pause() {
        this._paused = true
    }

    stop() {
        this.pause()
        this._time = 0
        this._currentSprite = this._spriteTags[0]
    }

    reset() {
        this.stop()
        this.play()
    }

    set currentSprite(tag) {
        if (this._spriteTags.indexOf(tag) >= 0)
            this._currentSprite = tag
    }

    addSprite(tag, sprite) {
        // Can't add two sprites with same name
        if (this._spriteTags.indexOf(tag) >= 0)
            return

        // Facilitates the creation of a sprite
        if (typeof(sprite) === 'string')
            sprite = new Sprite(sprite)
        this._sprites[tag] = sprite
        // Saves the index
        this._spriteTags.push(tag)
        this._currentSprite = tag
    }

    // Goes to next sprite
    _nextSprite() {
        let i = this._spriteTags.indexOf(this._currentSprite)
        
        if (i >= 0) {
            // Goes to the next sprite
            if (i < this._spriteTags.length - 1)
                this._currentSprite = this._spriteTags[i + 1]
            // Was the last sprite
            else
                this._currentSprite = this._spriteTags[0]
        }
    }

    hasCurrentSprite() {
        return this._currentSprite != null
    }

    get currentSprite() {
        if (this._currentSprite)
            return this._sprites[this._currentSprite]
        return null
    }

    tick() {
        if (!this._paused) {
            this._time++
            this._time = this._time % 60

            // Changes sprite
            if (this._time % this.speed == 0)
                this._nextSprite()
        }
    }
}