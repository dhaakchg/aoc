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
        rslice: this.grid[r]
      },
      col: {
        index: c,
        cslice: this.grid.map(gr => gr[c])
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

  treeVisible(tx) {
    let visible = false
    const treeHeight = this.grid[tx.row.index][tx.col.index]
    if((tx.row.index === 0 || tx.row.index === tx.row.rslice.length - 1) ||
      (tx.col.index === 0 || tx.col.index === tx.col.cslice.length - 1)) {
      visible = true
    } else {
      const left = tx.row.rslice.slice(0, tx.col.index)
      const right = tx.row.rslice.slice(tx.col.index + 1, tx.row.rslice.length).reverse()
      const top = tx.col.cslice.slice(0, tx.row.index)
      const bottom = tx.col.cslice.slice(tx.row.index + 1, tx.col.cslice.length).reverse()
      // console.log(`Checking Tree at pos: [${tx.row.index}][${tx.col.index}] height: ${treeHeight}\n${this.printTreeSlices(tx)}`)
      visible = [left, right, top, bottom].filter(chunk => {
        return chunk.filter(th => th < treeHeight).length === chunk.length
      }).length > 0
      // console.log(`left: ${left} right: ${right} top: ${top} bottom: ${bottom} -> visible: ${visible}`);
    }
    return visible
  }

  treeScore(tx) {
    const treeHeight = this.grid[tx.row.index][tx.col.index]
    // console.log(`Checking Tree at pos: [${tx.row.index}][${tx.col.index}] height: ${treeHeight}\n${this.printTreeSlices(tx)}`)
    const left = tx.row.rslice.slice(0, tx.col.index).reverse()
    const right = tx.row.rslice.slice(tx.col.index + 1, tx.row.rslice.length)
    const top = tx.col.cslice.slice(0, tx.row.index).reverse()
    const bottom = tx.col.cslice.slice(tx.row.index + 1, tx.col.cslice.length);
    const scores = [left, right, top, bottom].map(chunk => {
      let cs = 0
      let i = 0
      while(i < chunk.length) {
        if(chunk[i] < treeHeight) {
          cs += 1
        } else if(chunk[i] >= treeHeight) {
          cs += 1
          break
        }
        i++
      }
      return cs
    })
    const score = scores.reduce((a, c) => a * c)
    // console.log(`left: ${left} right: ${right} top: ${top} bottom: ${bottom}`);
    // console.log(`left: ${scores[0]} right: ${scores[1]} top: ${scores[2]} bottom: ${scores[3]} -> ${score}`);
    return score
  }

  countVisible() {
    // let visible = (this.rows * 2) + ((this.columns - 2) * 2)
    let visible = 0
    for(let row = 0; row < this.rows; row++ ) {
      for(let col = 0; col < this.columns; col++ ) {
        const treeX = this.getTreeSlices(row, col)
        if(this.treeVisible(treeX)) {
          visible += 1
        }
      }
    }
    return visible
  }

  calcScenic() {
    let bestScenic = 0
    let scoreGrid = []
    for(let row = 0; row < this.rows; row++ ) {
      let rs = []
      for(let col = 0; col < this.columns; col++ ) {
        const treeX = this.getTreeSlices(row, col)
        const score = this.treeScore(treeX)
        rs.push(score)
        if(score > bestScenic) {
          bestScenic = score
        }
      }
      scoreGrid.push(rs.join(''))
    }
    // console.log(scoreGrid.join('\n'))
    return bestScenic
  }

  toString() {
    this.grid.join('\n')
  }
}

module.exports = input => {
  const trees = new TreeGrid(splitClean(input))
  return [trees.countVisible(), trees.calcScenic()]
}
