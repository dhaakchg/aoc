const {splitClean} = require("../util/inputUtils");

class TreeGrid {
  constructor(input) {
    this.grid = []
    input.forEach(line => {
      this.grid.push(line.split(''))
    })
    this.rows = this.grid.length
    this.columns = this.grid[0].length
  }

  getTreeSlices(r, c) {
    return {
      row: {
        index: r,
        slice: this.grid[r]
      },
      col: {
        index: c,
        slice: this.grid.map(gr => gr[c])
      }
    }
  }

  printTreeSlices(ts) {
    let p = []
    for(let row = 0; row < this.rows; row++ ) {
      let rs = ''
      for (let col = 0; col < this.columns; col++) {
        if(row === ts.row.index || col === ts.col.index) {
          rs += this.grid[row][col]
        } else {
          rs += '.'
        }
      }
      p.push(rs)
    }
    return p.join('\n')
  }

  treeVisible(tp, treeSlice) {
    let visible = false
    if(tp === 0 || tp === treeSlice.length - 1) {
      visible = true
    } else {
      const left = treeSlice.slice(0, tp)
      const right = treeSlice.slice(tp + 1, treeSlice.length).reverse()
      const treeHeight = treeSlice[tp]
      if(left.filter(t => t < treeHeight).length === left.length && right.filter(t => t < treeHeight).length === right.length) {
        visible = true
      }
    }
    console.log(`Tree pos: ${tp}, slice: ${treeSlice} visible: ${visible}`)
    return visible
  }

  countVisible() {
    // let visible = (this.rows * 2) + ((this.columns - 2) * 2)
    let visible = 0
    for(let row = 1; row < this.rows - 1; row++ ) { // skip perimeter
      for(let col = 1; col < this.columns - 1; col++ ) { // skip perimeter
        const treeX = this.getTreeSlices(row, col)
        console.log(`Checking tree [${row}][${col}]`)
        console.log(this.printTreeSlices(treeX))
        if(this.treeVisible(row, treeX.row.slice) || this.treeVisible(col, treeX.col.slice)) {
          visible += 1
        }
      }
    }
    return visible
  }

  toString() {
    this.grid.join('\n')
  }
}

module.exports = input => {
  const trees = new TreeGrid(splitClean(input))
  console.log(trees)
  return trees.countVisible()
}
