const {range} = require("./helpers");
const GridCoord = require('./gridCoord')

class Grid {
  constructor({ data, rows, cols, fill = '.', primitiveType = String, subGridOrigin = { row: 0, col: 0 } }) {
    if(data && data.length > 0 && data[0].length > 0) {
      this.rows = data.length
      this.cols = data[0].length
      this.grid = data.map(row => row.split('')).flat().map(primitiveType)
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

  deepCopy() {
    const tmp = new Grid({ rows: this.rows, cols: this.cols })
    tmp.grid = this.as1dArray()
    return tmp
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

  findAll(searchValue) {
    const coords = []
    this.grid.forEach((gridValue, index) => {
      if(gridValue === searchValue) {
        coords.push(new GridCoord(Math.floor(index / this.cols), index % this.cols))
      }
    })
    return coords
  }

  getRow(row) {
    if(this.rowInBounds(row)) {
      return this.grid.slice(row * this.cols, (row * this.cols) + this.cols)
    } else {
      throw new Error(`Index out of Bounds for: [${row}][0-${this.cols - 1}]`)
    }
  }

  getRows() {
    return range(0, this.rows - 1).map(row => this.getRow(row))
  }

  getCol(col) {
    if(this.colInbounds(col)) {
      return range(0, this.rows - 1).map(row => this.grid[(row * this.cols) + col])
    } else {
      throw new Error(`Index out of Bounds for: [0-${this.rows - 1}][${col}]`)
    }
  }

  getCols() {
    return range(0, this.cols - 1).map(col => this.getCol(col))
  }

  getDiagonal(startRow, startCol, direction) {
    const diagonal = []
    let row = startRow
    let col = startCol
    while(this.coordInBounds(new GridCoord(row, col))) {
      diagonal.push(this.get(new GridCoord(row, col)))
      row += Math.sign(direction.row)
      col += Math.sign(direction.col)
    }
    return diagonal
  }

  getRightToLeftDiags() {
    /**
     * S . X
     * . X .
     * X . F
     */
    const diags = []
    // top left corner to main diagonal, top to bottom
    for (let i = 0; i < this.cols; i++) {
      const diag1 = this.getDiagonal(0, i, { row: 1, col: -1 })
      diags.push(diag1)
    }
    // main diagonal to bottom right corner, top to bottom
    for(let i = 1; i < this.rows; i++) {
      const diag2 = this.getDiagonal(i, this.cols - 1, { row: 1, col: -1 })
      diags.push(diag2)
    }
    return diags
  }

  getLeftToRightDiags() {
    /**
     * X . F
     * . X .
     * S . X
     */
    const diags = []
    // bottom left corner to main diagonal
    for (let i = this.rows - 1; i >= 0; i--) {
      const diag1 = this.getDiagonal(i, 0, { row: 1, col: 1 })
      diags.push(diag1)
    }
    // main diagonal to top right corner
    for(let i = 1; i < this.cols; i++) {
      const diag2 = this.getDiagonal(0, i, { row: 1, col: 1 })
      diags.push(diag2)
    }
    return diags
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

  getAdjacentByRadian(coord, radian, radius = 1) {
    const row = coord.row + (radian === 0 ? 0 : Math.round(radius * Math.sin((radian / 4) * Math.PI))) // y-axis
    const col = coord.col + (radian === 0 ? 0 : Math.round(radius * Math.cos((radian / 4) * Math.PI))) // x-axis
    return new GridCoord(row, col)
  }

  getAdjacentGrid(origin, radius = 1) {
    // include origin!
    // Edge cases of origin of 0, 0?
    // NW N NE 5 6 7 -- negative values in relation to origin
    // W  O  E 4 0 8 -- Not entirely sure why this has to be reversed. Math.
    // SW S SE 3 2 1 -- positive values in relation to origin
    const radians = [[5, 6, 7], [4, 0, 8],  [3, 2, 1]] // start at NW corner 3/4pi
    const adjacentCoords = radians.map(adjRow => adjRow.map(radian => this.getAdjacentByRadian(origin, radian, radius))
        // filter out of bounds coords.
        .filter(coord => this.coordInBounds(coord))
    )
    // Gross.
    const data = adjacentCoords.map(adjRow => adjRow.map(coord => this.get(coord)).join(''))
    return new Grid({ data, subGridOrigin: adjacentCoords.at(0).at(0) })
  }

  getCardinalDirsFromPoint(coord) {
    const dirs = { N: 6, W: 4, S: 2, E: 8 }
    const compass = { origin: { val: this.get(coord), coord } }
    for (const [dir, radian] of Object.entries(dirs)) {
      const adj = this.getAdjacentByRadian(coord, radian)
      compass[dir] = { val: null, coord: null }
      if(this.coordInBounds(adj)) {
        compass[dir].val = this.get(adj)
        compass[dir].coord = adj
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
