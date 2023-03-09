'use strict'

class GameObject {
    constructor() {

        this.x = 0
        this.y = 0

        this._currentScene = null
        this._camera = null
        this._labels = []
        this._animator = new Animator
        this._colliders = []
    }

    set currentScene(scene) {
        this._currentScene = scene
        this._camera = this._currentScene.camera
    }

    // Adds a label
    addLabel(label) {
        if (!this.hasLabel(label))
            this._labels.push(label)
    }

    // Checks if the entity has a label
    hasLabel(label) {
        return this._labels.indexOf(label) >= 0
    }

    // Looks if the entity is in the camera
    isInCamera() {
        if (this._animator.currentSprite)
            return this._camera.x < this.x + this._animator.currentSprite.width &&
                    this._camera.x + this._camera.width > this.x &&
                    this._camera.y < this.y + this._animator.currentSprite.height &&
                    this._camera.y + this._camera.height > this.y
        return false
    }
    
    // Adds a collider
    addBoxCollider(x, y, width, height) {
        let b = new BoxCollider(this, x, y, width, height)
        this._colliders.push(b)
        return b
    }

    // Gets all entities that have a label and colliding with this
    getCollidingList(label) {
        let res = []
        // Saves operation if there are no colliders
        if (this._colliders.length > 0)
            this._currentScene.entities.forEach(e => {
                if (label && e.hasLabel(label) && this.isColliding(e) ||
                    this.isColliding(e))
                    res.push(e)
            })
        return res
    }

    // Checks if two entities are colliding
    isColliding(other) {
        // Entities can have many colliders
        if (this != other)
            for (let c0 of this._colliders)
                for (let c1 of other._colliders)
                    if (c0.isColliding(c1))
                        return true
        return false
    }

    // Checks if two entities will collide
    willCollide(other, dx, dy) {
        // Entities can have many colliders
        if (this != other)
            for (let c0 of this._colliders)
                for (let c1 of other._colliders)
                    if (c0.willCollide(c1, dx, dy))
                        return true
        return false
    }

    tick() {
        // Animation
        if (this._animator.hasCurrentAnimation())
            this._animator.currentAnimation.tick()
    }

    render(screen) {
        // Only renders if it's inside the camera
        if (this.isInCamera()) {
            screen.drawImage(this._animator.currentSprite.image,
                Utils.roundToMultiple(this.x + this._camera.x, 10),
                Utils.roundToMultiple(this.y + this._camera.y, 10))
                if (this.hasLabel('player'))

            // Renders collider if debugging
            if (this._currentScene.isDebugging())
                this._colliders.forEach(c => {
                    c.render(screen)
                })
        }
    }
}