'use strict'

class Box extends Entity {
    constructor() {
        super()

        this.mass = 2

        this.addLabel('box')
        this.addBoxCollider(0, 0, 70, 70)

        let a = new Animation
        a.addSprite('0', 'box0.png')
        this._animator.addAnimation('0', a)
    }
}