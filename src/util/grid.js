class Grid {
  constructor(rows, cols) {
    this.rows = rows
    this.cols = cols
    this.grid = new Array(this.rows * this.cols).fill(null)
  }

  get1dIndex(row, col) {
    return col + (row * this.cols);
  }

}

module.exports = Grid
