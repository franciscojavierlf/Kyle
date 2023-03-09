'use strict'

class Animator {
    constructor() {

        this._currentAnimation = null
        this._animationTags = []
        this._animations = {}
    }

    set currentAnimation(tag) {
        // Only changes when the tag exists and when
        // the tag is different from the current one,
        // thus avoiding resetting the same animation
        if (this._animationTags.indexOf(tag) >= 0 && 
            this._currentAnimation != tag) {
            this._currentAnimation = tag
            // Resets the animation
            this._animations[tag].reset()
        }
    }

    addAnimation(tag, animation) {
        // Can't add two animations with same name
        if (this._animationTags.indexOf(tag) >= 0)
            return

        this._animations[tag] = animation
        this._animationTags.push(tag)
        this._currentAnimation = tag
    }

    hasCurrentAnimation() {
        return this._currentAnimation != null
    }

    get currentAnimation() {
        if (this._currentAnimation)
            return this._animations[this._currentAnimation]
        return null
    }

    // Asks if the current animation has current sprite
    hasCurrentSprite() {
        return this.currentAnimation.hasCurrentSprite()
    }

    // Returns the current sprite of the current animation
    get currentSprite() {
        return this.currentAnimation.currentSprite
    }
}