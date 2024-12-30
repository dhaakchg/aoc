class GridCoord {
    constructor(row, col) {
        this.row = row
        this.col = col
    }

    isEqual(coord) {
        return this.row === coord.row && this.col === coord.col
    }

    toString() {
        return `${this.row},${this.col}`
    }
}

module.exports = GridCoord
