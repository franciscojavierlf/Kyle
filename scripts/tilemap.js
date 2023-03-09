'use strict'

class TileMap {
    constructor(scene) {
        this._map = []
        this._tiles = []
        this._defaultTile = null
        this._camera = scene.camera
        this._maxSize = 0
    }

    addTile(tile) {
        // Updates the max size
        if (tile.size > this._maxSize)
            this._maxSize = tile.size
        // Sets a default tile
        if (!this._defaultTile)
            this._defaultTile = tile
        this._tiles.push(tile)
    }

    setDefaultTile(tileIndex) {
        if (tileIndex >= 0 && tileIndex < this._tiles.length)
            this._defaultTile = this._tiles[tileIndex]
    }

    setMap(map) {
        this._map = map
    }

    getTile(x, y) {
        if (y >= this.map.length || x >= this.map[y].length)
            return this._defaultTile
        return this._tiles[this._map[x][y]]
    }

    isTileInCamera(x, y) {
        let newX = x * this._maxSize
        let newY = y * this._maxSize
        return this._camera.x < newX + this._maxSize &&
                    this._camera.x + this._camera.width > newX &&
                    this._camera.y < newY + this._maxSize &&
                    this._camera.y + this._camera.height > newY
    }
}