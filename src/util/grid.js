const {range} = require("./helpers");

class Grid {
  constructor(config) {
    config = { fill: '.', ...config}
    if('data' in config) {
      this.rows = config.data.length
      this.cols = config.data[0].length
      this.grid = config.data.map(row => row.split('')).flat()
    } else {
      this.rows = config.rows
      this.cols = config.cols
      this.grid = new Array(this.rows * this.cols).fill(config.fill)
    }
  }

  as1dArray() {
    return [...this.grid]
  }
  getIndex(row, col) {
    if((0 <= row && row < this.rows) && (0 <= col && col < this.cols)) {
      return (row * this.cols) + col
    } else {
      throw new Error(`Index out of Bounds for: [${row}][${col}]`)
    }
  }

  getAdjacent(row, col) {

  }

  getRowColFromIndex(index) {
    return { row: Math.floor(index / this.cols), col: index % this.cols }
  }

  get(row, col) {
    return this.grid[this.getIndex(row, col)]
  }

  set(row, col, value) {
    // console.log(`Setting grid[${row}][${col}] -> ${value}`)
    this.grid[this.getIndex(row, col)] = value
  }

  findValue(value) {
    const index = this.grid.indexOf(value)
    return index === -1 ? null : [Math.floor(index / this.cols), index % this.cols]
  }

  getRow(row) {
    if(0 <= row && row < this.rows) {
      return this.grid.slice(row * this.cols, (row * this.cols) + this.cols)
    } else {
      throw new Error(`Index out of Bounds for: [${row}][0-${this.cols}]`)
    }
  }

  getRows() {
    return range(0, this.rows - 1).map(r => {
      return this.grid.slice(r * this.cols, (r * this.cols) + this.cols)
    })
  }

  arePointsAdjacent(p1, p2) {
    /**
     *  x x x
     *  x p x
     *  x x x
     *
     *  TODO: refactor to [Math.round(Math.cos(Math.PI * 1 / 4)), Math.sin(Math.PI * 2 / 4)] usage
     */
    return (p2.row === p1.row - 1 && p2.col === p1.col) ||   // N
        (p2.row === p1.row - 1 && p2.col === p1.col + 1) || // NE
        (p2.row === p1.row && p2.col === p1.col + 1) || // E
        (p2.row === p1.row + 1 && p2.col === p1.col + 1) || // SE
        (p2.row === p1.row + 1 && p2.col === p1.col) || // S
        (p2.row === p1.row + 1 && p2.col === p1.col - 1) || // SW
        (p2.row === p1.row && p2.col === p1.col - 1) || // W
        (p2.row === p1.row - 1 && p2.col === p1.col - 1)    // NW
  }

  toString() {
    return range(0, this.rows - 1).map(r => {
      return this.grid.slice(r * this.cols, (r * this.cols) + this.cols).join('')
    }).join('\n')
  }

  drawLine(start, end, lineChar) {
    const [sr, sc] = start
    const [er, ec] = end
    // Draw vertical line
    if(sc === ec) {
      const rowRange = sr <= er ? range(sr, er) : range(er, sr) // in case coordinates are backwards
      // console.log(`Drawing vertical line from ${start} -> ${end} with range ${rowRange}`)
      rowRange.forEach(r => this.set(r, sc, lineChar))
    }
    // Draw horizontal line
    if(sr === er) {
      const rowRange = sc <= ec ? range(sc, ec) : range(ec, sc) // in case coordinates are backwards
      // console.log(`Drawing horizontal line from ${start} -> ${end} with range ${rowRange}`)
      rowRange.forEach(c => this.set(sr, c, lineChar))
    }
  }
}

module.exports = Grid
