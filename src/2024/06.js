const {splitClean} = require("../util/inputUtils");
const Grid = require("../util/grid");
const GridCoord = require("../util/gridCoord");

const findGuard = (grid) => {
    for(let possValue of ['^', '>', 'v', '<']) {
        const coord = grid.findValue(possValue)
        if(coord) return {...coord, dir: possValue }
    }
}

const gridDirectionFromChar = (guardValue) => {
    if(guardValue === '^') return { row: -1, col: 0, dir: guardValue }
    if(guardValue === 'v') return { row: 1, col: 0, dir: guardValue }
    if(guardValue === '<') return { row: 0, col: -1, dir: guardValue }
    if(guardValue === '>') return { row: 0, col: 1, dir: guardValue }
}

const rotateNinety = (guardValue) => {
    if(guardValue === '^') return '>'
    if(guardValue === 'v') return '<'
    if(guardValue === '<') return '^'
    if(guardValue === '>') return 'v'
}

const getGuardFuturePath = (grid, guardCoord, distance = 1) => {
    const { row, col, dir } = gridDirectionFromChar(grid.get(guardCoord))
    const pathCoord = new GridCoord(
      guardCoord.row + (row !== 0 ? row * distance : row),
      guardCoord.col + (col !== 0 ? col * distance : col)
    )
    return { ...pathCoord, dir }
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
    } else if (['^', 'v'].includes(guardNextCoord.dir)) {
        traceChar = '|'
    } else if (['<', '>'].includes(guardNextCoord.dir)) {
        traceChar = '-'
    }
    grid.set(guardNextCoord, grid.get(guardCoord))
    grid.set(guardCoord, traceChar)
    return guardNextCoord
}

const detectLoop = (grid, guardCoord, existingPath) => {
    const guardOnPath = positionOnPath(existingPath, guardCoord)
    // coordinate is on the existing path and the guard is facing the same direction
    return guardOnPath !== undefined && existingPath.length > 1 && guardOnPath.dir === guardCoord.dir
}

const positionOnPath = (path, coord) => path.find(p => p.row === coord.row && p.col === coord.col)

const tracePath = (grid) => {
    const guardPath = []
    const possibleLoops = []
    let currGuardPos = findGuard(grid)
    guardPath.push(currGuardPos)
    while(grid.coordInBounds(currGuardPos)) {
        console.log(`Guard at: ${currGuardPos.row}, ${currGuardPos.col}\n${grid.toString()}`)
        try {
            if(detectLoop(grid, currGuardPos, guardPath)) {
                console.log(`Loop detected at: ${currGuardPos.row}, ${currGuardPos.col}`)
                break
            }
            let newGuardPos = moveGuard(currGuardPos, grid)
            if(!positionOnPath(guardPath, currGuardPos)) {
                guardPath.push(currGuardPos)
            }
            currGuardPos = newGuardPos
        } catch (err) {
            console.log(`Guard moved out of bounds at: ${currGuardPos.row}, ${currGuardPos.col}`)
            break
        }
    }
    return { positions: guardPath, possibleLoops }
}

const part1 = (input) => {
    const guardMap = new Grid({data: splitClean(input)})
    const { positions } = tracePath(guardMap)
    return positions.length + 1
}

module.exports = (input) => {
    return { part1: part1(input), part2: 0 }
}
