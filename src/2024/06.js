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

const getGuardFuturePath = (grid, guardCoord, direction = null, distance = 1) => {
    const { row, col } = getDirection(direction || grid.get(guardCoord))
    return new GridCoord(
      guardCoord.row + (row !== 0 ? row * distance : row),
      guardCoord.col + (col !== 0 ? col * distance : col)
    )
}

const moveGuard = (guardCoord, grid) => {
    let guardNextCoord = getGuardFuturePath(grid, guardCoord)
    let rotated = false
    let traceChar = grid.get(guardCoord)
    while(grid.get(guardNextCoord) === '#') {
        grid.set(guardCoord, rotateNinety(grid.get(guardCoord)))
        guardNextCoord = getGuardFuturePath(grid, guardCoord)
        rotated = true
    }
    if(rotated) {
        traceChar = '+'
    } else if (getDirection(grid.get(guardCoord)).row !== 0) {
        traceChar = '|'
    } else if (getDirection(grid.get(guardCoord)).col !== 0) {
        traceChar = '_'
    }
    grid.set(guardNextCoord, grid.get(guardCoord))
    grid.set(guardCoord, traceChar)
    return guardNextCoord
}

const wouldLoop = (grid, guardCoord) => {
    const nextCoord = getGuardFuturePath(grid, guardCoord)
    const possibleBlockCoord = getGuardFuturePath(grid, guardCoord, 2)
    if(rotateNinety(grid.get(guardCoord)) === grid.get(nextCoord) &&
      grid.coordInBounds(possibleBlockCoord) &&
      grid.get(possibleBlockCoord) !== '#') {
        console.log(`Set block @${possibleBlockCoord.row}, ${possibleBlockCoord.col}`)
        return possibleBlockCoord
    }
    return null
}

const positionOnPath = (path, coord) => path.find(p => p.row === coord.row && p.col === coord.col)

const tracePath = (grid) => {
    const positions = []
    const possibleLoops = []
    let currGuardPos = findGuard(grid)
    positions.push(currGuardPos)
    while(grid.coordInBounds(currGuardPos)) {
        console.log(`Guard at: ${currGuardPos.row}, ${currGuardPos.col}\n${grid.toString()}`)
        try {
            // const setBlock = wouldLoop(grid, currGuardPos)
            // if(setBlock !== null) {
            //     console.log(`Loop detected at: ${currGuardPos.row}, ${currGuardPos.col}\n${grid.toString()}`)
            //     possibleLoops.push(setBlock)
            // }
            let newGuardPos = moveGuard(currGuardPos, grid)
            if(!positionOnPath(positions, currGuardPos)) {
                positions.push(currGuardPos)
            }
            currGuardPos = newGuardPos
        } catch (err) {
            // console.log(`Guard moved out of bounds at: ${guardPos.row}, ${guardPos.col}`)
            break
        }
    }
    return { positions, possibleLoops }
}

module.exports = (input) => {
    const { positions, possibleLoops } = tracePath(new Grid({data: splitClean(input)}))
    console.log(`${possibleLoops}`)
    return { part1: positions.length + 1, part2: possibleLoops.length }
}
