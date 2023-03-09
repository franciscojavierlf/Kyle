'use strict'

class Kyle extends Mob {
    constructor() {
        super()
        this.speed = 2
        this.addLabel('player')

        this.jumpForce = 0
        // Helper for movement
        this._xMove = 0
        this._yMove = 0

        // The collider
        this.addBoxCollider(10, 0, 20, 60)

        // Animations
        let right = new Animation
        right.addSprite('0', 'kyle2d_right.png')
        right.addSprite('1', 'kyle2d_idle_0.png')
        right.speed = 10
        this._animator.addAnimation('right', right)
        let left = new Animation
        left.addSprite('0', 'kyle2d_left.png')
        left.addSprite('1', 'kyle2d_idle_0.png')
        left.speed = 10
        this._animator.addAnimation('left', left)

        let idle = new Animation
        idle.addSprite('0', 'kyle2d_idle_0.png')
        this._animator.addAnimation('idle', idle)
        
    }

    tick() {
        super.tick()

        this._xMove = 0
        this._yMove = 0
        if (Keyboard.isKeyPressed('ArrowRight'))
            this._xMove++
        if (Keyboard.isKeyPressed('ArrowLeft'))
            this._xMove--
        if (Keyboard.isKeyPressed('ArrowUp'))
            this._yMove--
        if (Keyboard.isKeyPressed('ArrowDown'))
            this._yMove++

        this.moveAnimated(this._xMove, this._yMove)
    
    }
}