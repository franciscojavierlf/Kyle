'use strict'

class Entity extends GameObject {
    constructor() {
        this.mass = 1

        this._fallSpeed = 0
        this._onGround = false
    }

    /*
         WORKS WELL, BUT IT BOUNCES A LITTLE. TO BE FIXED.
     */
    // Moves the entity checking collisions
    move(dx, dy) {
        let move = 1
        let side
        // Will get the colliding entities and will
        // see which side they are colliding with
        for (let other of this._currentScene.entities) {
            // Ignores oneself
            if (this != other)
            for (let c0 of this._colliders)
            for (let c1 of other._colliders) {
                side = c0.willCollideBoxSide(c1, dx, dy)
                if (side >= 0) {
                    // Fixes the remaining pixels
                    switch (side) {
                        // Up
                        case 0:
                            this._fallSpeed = 0
                            break
                        // Right
                        case 1:
                            other.push(-1, 0)
                            break
                        // Down
                        case 2:
                            this._fallSpeed = 0
                            break
                        // Left
                        case 3:
                            other.push(1, 0)
                            break
                    }
                    move = 0
                    // Exits from the for
                    break
                }
            }
        }
        this.x += dx * move
        this.y += dy * move
    }

    // Moves the player having in mind the mass
    push(dx, dy) {
        if (this.mass != 0)
            this.move(dx / this.mass, dy / this.mass)
    }

    // Affected by gravity
    fall() {
        this._fallSpeed += this._currentScene.gravity * this.mass
        this.move(0, this._fallSpeed)
    }

    isFalling() {
        return this._fallSpeed > 0
    }

    isAscending() {
        return this._fallSpeed < 0
    }

    isStanding() {
        return this._fallSpeed === 0
    }

    tick() {
        super.tick()

        // Gravity
        this.fall()
    }
}