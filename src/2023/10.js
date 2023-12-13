const {splitClean} = require("../util/inputUtils");
const _ = require('lodash')
const Grid = require("../util/grid");
const GridCoord = require("../util/gridCoord")

/**
 *
 * | is a vertical pipe connecting north and south.
 * - is a horizontal pipe connecting east and west.
 * L is a 90-degree bend connecting north and east.
 * J is a 90-degree bend connecting north and west.
 * 7 is a 90-degree bend connecting south and west.
 * F is a 90-degree bend connecting south and east.
 * . is ground; there is no pipe in this tile.
 * S is the starting position of the animal; there is a pipe on this tile, but your sketch doesn't show what shape the pipe has.
 *
 * ..F7.
 * .FJ|.
 * SJ.L7
 * |F--J
 * LJ...
 *
 * ..45.
 * .236.
 * 01.78
 * 14567
 * 23...
 */
const PIPES = {
    // conn from perspective of the origin pipe
    '|': { N: ['|', '7', 'F'], S: ['|', 'L', 'J'] },
    '-': { E: ['-', 'J', '7'], W: ['-', 'L', 'F'] },
    'L': { N: ['|', '7', 'F'], E: ['-', 'J', '7'] },
    'J': { N: ['|', '7', 'F'], W: ['-', 'F', 'L'] },
    '7': { S: ['|', 'J', 'L'], W: ['-', 'F', 'L'] },
    'F': { S: ['|', 'J', 'L'], E: ['-', 'J', '7'] }
}
const detectStartPipe = grid => {
    const coord = grid.findValue('S')
    const compass = grid.getCardinalDirsFromPoint(coord)
    const pipe = Object.keys(PIPES).find(pipe => {
        let pipes = []
        Object.keys(compass).filter(key => key !== 'origin').forEach(compassDir => {
            const { val } = compass[compassDir]
            if ( val !== null && pipesConnect(pipe, val, compassDir)) {
                pipes.push(true)
            }
        })
        return pipes.length === 2
    })
    grid.set(coord, pipe)
    return coord
}
const dirRev = dir => {
    if (dir === 'N') return 'S'
    if (dir === 'S') return 'N'
    if (dir === 'E') return 'W'
    if (dir === 'W') return 'E'
}
const isPipe = char => Object.keys(PIPES).includes(char)
const pipesConnect = (fromPipe, toPipe, direction) => {
    if (!isPipe(fromPipe) || !isPipe(toPipe)) {
        return false
    } else {
        return (direction in PIPES[fromPipe]) && (PIPES[fromPipe][direction].includes(toPipe))
    }
}
const findLoop = (startCoord, grid, pathGrid) => {
    let currCoord = {...startCoord}
    const loopCoords = [startCoord]
    pathGrid.set(currCoord, 0)
    let cameFrom = null
    do {
        const connPipes = getConnPipes(currCoord, grid)
        const { compassDir, coord } = connPipes.find(pipe => pipe.compassDir !== dirRev(cameFrom))
        cameFrom = compassDir
        currCoord = coord
        loopCoords.push(currCoord)
        pathGrid.set(currCoord, '*')
        // console.log(`Path:\n${pathGrid.toString()}`)
    } while (!_.isEqual(currCoord, startCoord))
    return loopCoords
}
const getConnPipes = (origin, grid) => {
    const pipes = []
    const compass = grid.getCardinalDirsFromPoint(origin)
    Object.keys(compass).filter(key => key !== 'origin').forEach(compassDir => {
        const { val, coord } = compass[compassDir]
        if ( val !== null && pipesConnect(compass['origin'].val, val, compassDir)) {
            pipes.push({val, coord, compassDir})
        }
    })
    return pipes
}
const coordOnLoop = (loop, coord) => loop.find(loopCoord => _.isEqual(loopCoord, coord)) !== undefined
const fillGround = (grid, loop) => {
    grid.as1dArray().forEach((v, i) => {
        const gridCoord = grid.getRowColFromIndex(i)
        if(!coordOnLoop(loop, gridCoord)) {
            grid.set(gridCoord, '.')
        }
    })
}
const traceRay = (row, rowIdx, grid, loop) => {
    let inLoop = 0
    let inside = false
    for(let col = 0; col < row.length; col++) {
        const currentCoord = new GridCoord(rowIdx, col)
        const nodeInside = coordOnLoop(loop, currentCoord)
        const vertical = nodeInside && ['|', 'L', 'J'].includes(row[col])
        if(vertical) inside = !inside
        if(!nodeInside && inside) inLoop++
    }
    // console.log(`Tested row ${rowIdx}, found: ${inLoop}`)
    return inLoop
}
const findInLoop = (grid, loop) => {
    return grid.getRows().map((row, rowIdx) => traceRay(row, rowIdx, grid, loop)).reduce((a, c) => a + c, 0)
}

module.exports = (input) => {
    const grid = new Grid({data: splitClean(input)})
    const pathGrid = new Grid({rows: grid.rows, cols: grid.cols})
    const startCoords = detectStartPipe(grid)
    // console.log(`Start: ${JSON.stringify(startCoords)} Pipe: ${startPipe}, adj: ${JSON.stringify(grid.getCardinalDirsFromPoint(startCoords))}`)
    // const startAdj = grid.getAdjacentGrid(startCoords)
    // console.log(`Start subgrid: ${startAdj.toString()}`)
    const loop = findLoop(startCoords, grid, pathGrid)
    // console.log(`Path:\n${pathGrid.toString()}`)
    const part1 = Math.round((loop.length - 1) / 2) // start is duplicated at start and end of array
    // fillGround(grid, loop) // This takes too long for the actual input...
    // console.log(`After fill:\n${grid.toString()}`)
    const part2 = findInLoop(grid, loop)
    return { part1, part2 }
}