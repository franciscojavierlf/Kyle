'use strict'

let Utils = {
    // Rounds to the nearest m multiple
    roundToMultiple: function(n, m) {
        if (m < 0 || m % 1 != 0) throw 'm must be a positive integer.'
        if (m == 0) return 0
        if (m == 1) return n
        n = Math.round(n)
        let h = m / 2 | 0
        let d = n % m
        if (d <= h) n -= d
        else n += h - d % h
        return n
    },

    // Floors to the nearest m multiple
    floorToMultiple: function(n, m) {
        if (m < 0 || m % 1 != 0) throw 'm must be a positive integer.'
        if (m == 0) return 0
        n = Math.round(n)
        return n - n % m
    },

    // Ceils to the nearest m multiple
    ceilToMultiple: function(n, m) {
        if (m < 0 || m % 1 != 0) throw 'm must be a positive integer.'
        if (m == 0) return 0
        if (m == 1) return n
        n = Math.round(n)
        return n + m - n % m
    }
}
