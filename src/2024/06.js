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
    while(['#', 'O'].includes(grid.get(guardNextCoord))) {
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

const addToPath = (guardPath, currGuardPos) => {
    if(!positionOnPath(guardPath, currGuardPos)) {
        guardPath.push(currGuardPos)
    }
}

const tracePath = (grid) => {
    const guardPath = []
    let loopDetected = false
    let currGuardPos = findGuard(grid)
    guardPath.push(currGuardPos)
    while(grid.coordInBounds(currGuardPos)) {
        // console.log(`Guard at: ${currGuardPos.row}, ${currGuardPos.col}\n${grid.toString()}`)
        try {
            loopDetected = detectLoop(grid, currGuardPos, guardPath)
            if(loopDetected) {
                // console.log(`Loop detected at: ${currGuardPos.row}, ${currGuardPos.col}`)
                break
            }
            let newGuardPos = moveGuard(currGuardPos, grid)
            addToPath(guardPath, currGuardPos)
            currGuardPos = newGuardPos
        } catch (err) {
            // console.log(`Guard moved out of bounds at: ${currGuardPos.row}, ${currGuardPos.col}`)
            addToPath(guardPath, currGuardPos)
            break
        }
    }
    return { positions: guardPath, loopDetected }
}

const detectLoops = (guardMap, traversedPath) => {
    let loopsDetected = 0
    const pathObstacles = traversedPath.slice(1)
    // const pathObstacles = guardMap.findAll('.')
    pathObstacles.forEach((coord, i, a) => {
        const obstacleGrid = guardMap.deepCopy()
        obstacleGrid.set(coord, 'O')
        // console.log(`Obstacle set at: ${coord.row}, ${coord.col}\n${obstacleGrid.toString()}`)
        const { positions, loopDetected } = tracePath(obstacleGrid)
        if (loopDetected) loopsDetected += 1
        console.log(`${i + 1}/${a.length}: Obstacle set at: ${coord.row}, ${coord.col}, unique positions: ${positions.length}, loop detected: ${loopDetected}, loops: ${loopsDetected}`)
    })
    return loopsDetected
}

module.exports = (input) => {
    const { positions } = tracePath(new Grid({data: splitClean(input)}))

    return { part1: positions.length, part2: detectLoops(new Grid({data: splitClean(input)}), positions) }
}
