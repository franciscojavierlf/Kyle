'use strict'

class Platform extends Entity {
    constructor() {
        super()
        
        this.mass = 0
        this.weight = 0
        let box = this.addBoxCollider(0, 0, 300, 30)
        box.setUniqueSide('up')

        let anim = new Animation
        anim.addSprite('0', 'platform.png')
        this._animator.addAnimation('0', anim)
    }
}