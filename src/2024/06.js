const {splitClean} = require("../util/inputUtils");
const Grid = require("../util/grid");
const GridCoord = require("../util/gridCoord");

const findGuard = (grid) => {
    for(let possValue of ['^', '>', 'v', '<']) {
        const coord = grid.findValue(possValue)
        if(coord) return coord
    }
}

const getDirection = (guardValue) => {
    if(guardValue === '^') return { row: -1, col: 0 }
    if(guardValue === 'v') return { row: 1, col: 0 }
    if(guardValue === '<') return { row: 0, col: -1 }
    if(guardValue === '>') return { row: 0, col: 1 }
}

const rotateNinety = (guardValue) => {
    if(guardValue === '^') return '>'
    if(guardValue === 'v') return '<'
    if(guardValue === '<') return '^'
    if(guardValue === '>') return 'v'
}

const getGuardNext = (guardCoord, grid) => {
    let guardNextCoord = move(grid, guardCoord)
    while(grid.get(guardNextCoord) === '#') {
        grid.set(guardCoord, rotateNinety(grid.get(guardCoord)))
        guardNextCoord = move(grid, guardCoord)
    }
    grid.set(guardNextCoord, grid.get(guardCoord))
    grid.set(guardCoord, 'X')
    return guardNextCoord
}

const move = (grid, guardCoord) => {
    const { row, col } = getDirection(grid.get(guardCoord))
    return new GridCoord(guardCoord.row + row, guardCoord.col + col)
}

const tracePath = (grid) => {
    const positions = []
    let guardPos = findGuard(grid)
    positions.push(guardPos)
    while(grid.coordInBounds(guardPos)) {
        try {
            let guardNext = getGuardNext(guardPos, grid)
            if(!positions.find(p => p.row === guardPos.row && p.col === guardPos.col)) {
                positions.push(guardPos)
            }
            guardPos = guardNext
            // console.log(`Guard at: ${guardPos.row}, ${guardPos.col}\n${grid.toString()}`)
        } catch (err) {
            console.log(`Guard moved out of bounds at: ${guardPos.row}, ${guardPos.col}`)
            break
        }
    }
    return positions.length + 1
}

const getDistinct = (grid) => grid.findAll('X').length + 1

module.exports = (input) => {
    const theMap = new Grid({data: splitClean(input)})
    const part1 = tracePath(theMap)
    console.log(`tracepath: ${part1} distinct: ${getDistinct(theMap)}`)
    return { part1, part2: 0 }
}
