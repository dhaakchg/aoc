const {splitClean} = require("../util/inputUtils")
const Grid = require("../util/grid")
const GridCoord = require("../util/gridCoord")

const orig  = `
...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`

const expanded = `
....#........
.........#...
#............
.............
.............
........#....
.#...........
............#
.............
.............
.........#...
#....#.......`

const findEmptyRowCol = (grid) => {
    const emptyRows = []
    grid.getRows().forEach((row, idx) => {
        if(row.every(char => char === '.')) {
            emptyRows.push(idx)
        }
    })
    const emptyCols = []
    grid.getCols().forEach((col, idx) => {
        if(col.every(char => char === '.')) {
            emptyCols.push(idx)
        }
    })
    return { emptyRows, emptyCols }
}

const expandGalaxy = (universe, expansionFactor = 1) => {
    const { emptyRows, emptyCols } = findEmptyRowCol(universe)
    const galaxyCoords = findGalaxies(universe)
    const expandedUniverse = new Grid({
        rows: universe.rows + (emptyRows.length * expansionFactor),
        cols: universe.cols + (emptyCols.length * expansionFactor)
    })
    galaxyCoords.forEach(galaxy => {
        const { row, col } = galaxy
        let newRow = row
        let newCol = col
        newRow += emptyRows.filter(r => row > r).length * expansionFactor
        newCol += emptyCols.filter(c => col > c).length * expansionFactor
        const exGalaxy = new GridCoord(newRow, newCol)
        expandedUniverse.set(exGalaxy, '#')
    })
    return expandedUniverse
}
const findGalaxies = grid => grid.findAll('#')

module.exports = (input) => {
    const oU = new Grid({data: splitClean(input)})
    const eU = expandGalaxy(oU)
    console.log(`original\n${oU.toString()}\nrows:${oU.rows} cols:${oU.cols}\n${JSON.stringify(findGalaxies(oU))}`)
    console.log(`expanded\n${eU.toString()}\nrows:${eU.rows} cols:${eU.cols}\n${JSON.stringify(findGalaxies(eU))}`)
    const tU = new Grid({data: splitClean(expanded)})
    console.log(`reference\n${tU.toString()}\nrows:${tU.rows} cols:${tU.cols}\n${JSON.stringify(findGalaxies(tU))}`)
    return { part1: 367, part2: 0 }
}