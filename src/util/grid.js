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

  get1dIndex(row, col) {
    return (row * this.cols) + col
  }

  getGridVal(row, col) {
    return this.grid[this.get1dIndex(row, col)]
  }

  findValue(value) {
    const index = this.grid.indexOf(value)
    return {row: Math.floor(index/ this.cols), col: index % this.cols}
  }

  toString(){
    return range(0, this.rows).map(i => {
      return this.grid.slice(i * this.cols, (i * this.cols) + this.cols).join('')
    }).join('\n')
  }
}

module.exports = Grid
