'use strict'

class BoxCollider {
    constructor(entity, x = 0, y = 0, width = 0, height = 0) {
        this._entity = entity
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this._sideStatus = [true, true, true, true]
    }

    get realX() {
        return this.x + this._entity.x
    }

    get realY() {
        return this.y + this._entity.y
    }
    get realX0() {
        return this.realX
    }

    get realY0() {
        return this.realY
    }

    get realX1() {
        return this.realX0 + this.width
    }

    get realY1() {
        return this.realY0 + this.height
    }

    // Sets if a side is active or not
    setSideStatus(side, status) {
        let i = -1
        switch (side) {
            case 'left': i++
            case 'down': i++
            case 'right': i++
            case 'up': i++
        }
        if (i >= 0) 
            this._sideStatus[i] = Boolean(status)
    }

    // Enables a side and disables the other ones
    setUniqueSide(side) {
        let a = ['up', 'right', 'down', 'left']
        for (let i = 0; i < 4; i++)
            if (a[i] === side) this._sideStatus[i] == true
            else this._sideStatus[i] = false
    }

    isUpEnabled() {
        return Boolean(this._sideStatus[0])
    }

    isRightEnabled() {
        return Boolean(this._sideStatus[1])
    }

    isDownEnabled() {
        return Boolean(this._sideStatus[2])
    }

    isLeftEnabled() {
        return Boolean(this._sideStatus[3])
    }

    isCollidingBox(other) {
        return this.willCollide(other, 0, 0)
    }

    isCollidingBoxSide(other) {
        return this.willCollideSide(other, 0, 0)
    }

    // Checks if in the future the colliders will collide
    willCollideBox(other, dx, dy) {
        return this.realX0 + dx < other.realX1 && this.realX1 + dx > other.realX0 &&
        this.realY0 + dy < other.realY1 && this.realY1 + dy > other.realY0
    }

    // Checks the side in which the colliders are colliding
    willCollideBoxSide(other, dx, dy) {
        if (this.willCollideBox(other, dx, dy)) {
            // Up
            if (this.isDownEnabled() && other.isUpEnabled() && this.realY1 <= other.realY0)
                return 0
            // Right
            if (this.isLeftEnabled() && other.isRightEnabled() && this.realX0 >= other.realX1)
                return 1
            // Down
            if (this.isUpEnabled() && other.isDownEnabled() && this.realY0 >= other.realY1)
                return 2
            // Left
            if (this.isRightEnabled() && other.isLeftEnabled() && this.realX1 <= other.realX0)
                return 3
            // Error
            return -1
        }
        return -1
    }

    // Renders the collider
    render(screen) {
        // Up
        screen.strokeStyle = this.isUpEnabled() ? 'red' : 'green'
        screen.beginPath()
        screen.moveTo(this.realX0, this.realY0)
        screen.lineTo(this.realX1, this.realY0)
        screen.stroke()

        // Right
        screen.strokeStyle = this.isRightEnabled() ? 'red' : 'green'
        screen.beginPath()
        screen.moveTo(this.realX1, this.realY0)
        screen.lineTo(this.realX1, this.realY1)
        screen.stroke()

        // Down
        screen.strokeStyle = this.isDownEnabled() ? 'red' : 'green'
        screen.beginPath()
        screen.moveTo(this.realX1, this.realY1)
        screen.lineTo(this.realX0, this.realY1)
        screen.stroke()

        // Left
        screen.strokeStyle = this.isLeftEnabled() ? 'red' : 'green'
        screen.beginPath()
        screen.moveTo(this.realX0, this.realY1)
        screen.lineTo(this.realX0, this.realY0)
        screen.stroke()
    }
}