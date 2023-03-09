'use strict'

class Mob extends Entity {
    constructor() {
        super()
        this.speed = 1
        this.jumpForce = 20
    }

    moveAnimated(xAxis, yAxis) {
        this.move(xAxis * this.speed, yAxis * this.speed)

        // Animation
        if (xAxis != 0) {
            if (this.isStanding()) {
                if (xAxis < 0) this._animator.currentAnimation = 'left'
                if (xAxis > 0) this._animator.currentAnimation = 'right'
            }
        }
        else {
            // Does not save the extra spaces
            this.x = Utils.roundToMultiple(this.x, 10)
            this._animator.currentAnimation = 'idle'
        } 
    }


    jump() {
        if (this.isStanding())
            this._fallSpeed -= this.jumpForce / 5
    }

    tick() {
        super.tick()
    }
    
    render(screen) {
        super.render(screen)
    }
}