const {range} = require("./helpers");
const GridCoord = require('./gridCoord')

class Grid {
  constructor({ data, rows, cols, fill = '.', subGridOrigin = { row: 0, col: 0 } }) {
    if(data && data.length > 0 && data[0].length > 0) {
      this.rows = data.length
      this.cols = data[0].length
      this.grid = data.map(row => row.split('')).flat()
    } else {
      this.rows = rows
      this.cols = cols
      this.grid = new Array(this.rows * this.cols).fill(fill)
    }
    this.subGridOrigin = subGridOrigin
  }

  as1dArray() {
    return [...this.grid]
  }
  getIndex(coord) {
    if(this.coordInBounds(coord)) {
      return (coord.row * this.cols) + coord.col
    } else {
      throw new Error(`Index out of Bounds for: [${coord.row}][${coord.col}]`)
    }
  }

  rowInBounds(row) {
    return (0 <= row && row < this.rows)
  }

  colInbounds(col) {
    return (0 <= col && col < this.cols)
  }
  coordInBounds(coord) {
    return this.rowInBounds(coord.row) && this.colInbounds(coord.col)
  }
  getRowColFromIndex(index) {
    return new GridCoord(Math.floor(index / this.cols), index % this.cols)
  }

  get(coord) {
    return this.grid[this.getIndex(coord)]
  }

  set(coord, value) {
    this.grid[this.getIndex(coord)] = value
  }

  findValue(value) {
    const index = this.grid.indexOf(value)
    return index === -1 ? null : new GridCoord(Math.floor(index / this.cols), index % this.cols)
  }

  getRow(row) {
    if(this.rowInBounds(row)) {
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
    return (p2.row === p1.row - 1 && p2.col === p1.col) ||   // N = p1.row + Math.round(Math.sin(2/4 * Math.PI))
        (p2.row === p1.row - 1 && p2.col === p1.col + 1) || // NE
        (p2.row === p1.row && p2.col === p1.col + 1) || // E
        (p2.row === p1.row + 1 && p2.col === p1.col + 1) || // SE
        (p2.row === p1.row + 1 && p2.col === p1.col) || // S
        (p2.row === p1.row + 1 && p2.col === p1.col - 1) || // SW
        (p2.row === p1.row && p2.col === p1.col - 1) || // W
        (p2.row === p1.row - 1 && p2.col === p1.col - 1)    // NW
  }

  getAdajcentByRadian(coord, radian, radius = 1) {
    const row = coord.row + (radian === 0 ? 0 : Math.round(radius * Math.sin((radian / 4) * Math.PI))) // y-axis
    const col = coord.col + (radian === 0 ? 0 : Math.round(radius * Math.cos((radian / 4) * Math.PI))) // x-axis
    return new GridCoord(row, col) // TODO: Change to GridCoord
  }

  getAdjacentGrid(origin, radius = 1) {
    // include origin!
    // Edge cases of origin of 0, 0?
    // NW N NE 5 6 7 -- negative values in relation to origin
    // W  O  E 4 0 8 -- Not entirely sure why this has to be reversed. Math.
    // SW S SE 3 2 1 -- positive values in relation to origin
    const radians = [[5, 6, 7], [4, 0, 8],  [3, 2, 1]] // start at NW corner 3/4pi
    const adjacentCoords = radians.map(adjRow => adjRow.map(radian => this.getAdajcentByRadian(origin, radian, radius))
        // filter out of bounds coords.
        .filter(coord => this.coordInBounds(coord))
    )
    // Gross.
    const data = adjacentCoords.map(adjRow => adjRow.map(coord => this.get(coord)).join(''))
    return new Grid({ data, subGridOrigin: adjacentCoords.at(0).at(0) })
  }

  getCardinalDirsFromPoint(p) {
    const dirs = { N: 6, W: 4, S: 2, E: 8 }
    const compass = {}
    for (const [dir, radian] of Object.entries(dirs)) {
      const adj = this.getAdajcentByRadian(p, radian)
      if(this.coordInBounds(adj)) {
        compass[dir] = { val: this.get(adj), coord: adj }
      } else {
        compass[dir] = { val: null, coord: null }
      }
    }
    return compass
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
