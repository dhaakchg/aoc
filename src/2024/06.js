const {splitClean} = require("../util/inputUtils");
const Grid = require("../util/grid");
const GridCoord = require("../util/gridCoord");

const findGuard = (grid) => {
    for(let possValue of ['^', '>', 'v', '<']) {
        const coord = grid.findValue(possValue)
        if(coord) return coord
    }
}

const getDirection = (guardValue, distance = 1) => {
    if(guardValue === '^') return { row: -1 * distance, col: 0 }
    if(guardValue === 'v') return { row: distance, col: 0 }
    if(guardValue === '<') return { row: 0, col: -1 * distance }
    if(guardValue === '>') return { row: 0, col: distance }
}

const rotateNinety = (guardValue) => {
    if(guardValue === '^') return '>'
    if(guardValue === 'v') return '<'
    if(guardValue === '<') return '^'
    if(guardValue === '>') return 'v'
}

const moveGuard = (guardCoord, grid) => {
    let guardNextCoord = nextGuardPosition(grid, guardCoord)
    while(grid.get(guardNextCoord) === '#') {
        grid.set(guardCoord, rotateNinety(grid.get(guardCoord)))
        guardNextCoord = nextGuardPosition(grid, guardCoord)
    }
    grid.set(guardNextCoord, grid.get(guardCoord))
    // grid.set(guardCoord, 'X')
    return guardNextCoord
}

const wouldLoop = (grid, guardCoord) => {
    const nextCoord = nextGuardPosition(grid, guardCoord)
    const possibleBlockCoord = nextGuardPosition(grid, nextCoord, 2)
    return rotateNinety(grid.get(guardCoord)) === grid.get(nextCoord) &&
      grid.get(possibleBlockCoord) !== '#'
}

const nextGuardPosition = (grid, guardCoord, distance = 1) => {
    const { row, col } = getDirection(grid.get(guardCoord), distance)
    return new GridCoord(guardCoord.row + row, guardCoord.col + col)
}

const tracePath = (grid) => {
    const positions = []
    const possibleLoops = []
    let currGuardPos = findGuard(grid)
    positions.push(currGuardPos)
    while(grid.coordInBounds(currGuardPos)) {
        try {
            // if(wouldLoop(grid, currGuardPos)) {
            //     console.log(`Loop detected at: ${currGuardPos.row}, ${currGuardPos.col}\n${grid.toString()}`)
            //     possibleLoops.push(nextGuardPosition(grid, currGuardPos))
            // }
            let newGuardPos = moveGuard(currGuardPos, grid)
            if(!positions.find(p => p.row === currGuardPos.row && p.col === currGuardPos.col)) {
                positions.push(currGuardPos)
            }
            currGuardPos = newGuardPos
            // console.log(`Guard at: ${currGuardPos.row}, ${currGuardPos.col}\n${grid.toString()}`)
        } catch (err) {
            // console.log(`Guard moved out of bounds at: ${guardPos.row}, ${guardPos.col}`)
            break
        }
    }
    return { positions, possibleLoops }
}

const getDistinct = (grid) => grid.findAll('X').length + 1

module.exports = (input) => {
    const { positions, possibleLoops } = tracePath(new Grid({data: splitClean(input)}))
    return { part1: positions.length + 1, part2: possibleLoops.length }
}
