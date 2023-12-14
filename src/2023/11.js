const {splitClean} = require("../util/inputUtils")
const Grid = require("../util/grid")
const GridCoord = require("../util/gridCoord")
const {manhattan, combinationN, range} = require("../util/helpers")

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

const expandGalaxyWithGrid = (universe, expansionFactor = 1) => {
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

const expandGalaxy = (universe, expansionFactor = 1) => {
    const { emptyRows, emptyCols } = findEmptyRowCol(universe)
    const galaxyCoords = findGalaxies(universe)
    return galaxyCoords.map(galaxy => {
        const { row, col } = galaxy
        let newRow = row
        let newCol = col
        newRow += emptyRows.filter(r => row > r).length * expansionFactor
        newCol += emptyCols.filter(c => col > c).length * expansionFactor
        return new GridCoord(newRow, newCol)
    })
}
const findGalaxies = grid => grid.findAll('#')

const findDistances = galaxies => {
    const distances = []
    for (const pair of combinationN(range(0, galaxies.length - 1), 2)) {
        distances.push(manhattan(galaxies[pair[0]], galaxies[pair[1]]))
    }
    return distances
}

module.exports = (input, factor = 999999) => {
    const oU = new Grid({data: splitClean(input)})
    const eU = expandGalaxyWithGrid(oU)
    // console.log(`original\n${oU.toString()}\nrows:${oU.rows} cols:${oU.cols}\n${JSON.stringify(findGalaxies(oU))}`)
    // console.log(`expanded\n${eU.toString()}\nrows:${eU.rows} cols:${eU.cols}\n${JSON.stringify(findGalaxies(eU))}`)
    const tU = new Grid({data: splitClean(expanded)})
    // console.log(`reference\n${tU.toString()}\nrows:${tU.rows} cols:${tU.cols}\n${JSON.stringify(findGalaxies(tU))}`)
    const part1 = findDistances(expandGalaxy(oU,1)).reduce((a, c) => a + c, 0)
    const part2 = findDistances(expandGalaxy(oU,factor)).reduce((a, c) => a + c, 0)
    return { part1, part2 }
}