let Keyboard = {

    _keys: {},

    isKeyPressed: function(key) {
        return this._keys[key] ? true : false
    }
}
Object.freeze(Keyboard)

// Will change states of the keys
document.onkeydown = e => {
    Keyboard._keys[e.key] = true
}
document.onkeyup = e => {
    Keyboard._keys[e.key] = false
}