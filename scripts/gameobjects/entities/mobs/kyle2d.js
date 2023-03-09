'use strict'

class Kyle extends Mob {
    constructor() {
        super()
        this.speed = 3
        this.addLabel('player')

        this.jumpForce = 25
        // Helper for movement
        this._xMove = 0

        // The collider
        this.addBoxCollider(10, 0, 20, 60)

        // Animations
        let right = new Animation
        right.addSprite('0', 'kyle_side_right.png')
        right.addSprite('1', 'kyle_side_idle_0.png')
        right.speed = 10
        this._animator.addAnimation('right', right)
        let left = new Animation
        left.addSprite('0', 'kyle_side_left.png')
        left.addSprite('1', 'kyle_side_idle_0.png')
        left.speed = 10
        this._animator.addAnimation('left', left)

        let idle = new Animation
        idle.addSprite('0', 'kyle_side_idle_0.png')
        this._animator.addAnimation('idle', idle)
        
    }

    tick() {
        super.tick()

        this._xMove = 0
        if (Keyboard.isKeyPressed('ArrowRight'))
            this._xMove++
        if (Keyboard.isKeyPressed('ArrowLeft'))
            this._xMove--

        this.moveHorizontal(this._xMove)
        if (Keyboard.isKeyPressed(' '))
            this.jump()
    
    }
}