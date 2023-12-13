const {splitClean} = require("../util/inputUtils");
const _ = require('lodash')
const Grid = require("../util/grid");

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
    '|': { conn: ['N', 'S'], rev: ['S', 'N'] },
    '-': { conn: ['E', 'W'], rev: ['W', 'E'] },
    'L': { conn: ['S', 'W'], rev: ['N', 'E'] }, // conn from perspective of the joining pipe, not N, E
    'J': { conn: ['S', 'E'], rev: ['N', 'W'] },
    '7': { conn: ['N', 'E'], rev: ['S', 'W'] },
    'F': { conn: ['N', 'W'], rev: ['S', 'E'] }
}

const dirRev = dir => {
    if (dir === 'N') return 'S'
    if (dir === 'S') return 'N'
    if (dir === 'E') return 'W'
    if (dir === 'W') return 'E'
}

const isPipe = char => Object.keys(PIPES).includes(char)
const pipeConnects = (dir, pipe) => {
    if (!isPipe(pipe)) {
        return false
    } else {
        return PIPES[pipe].conn.includes(dir)
    }
}
const isGround = char => char === '.'
const findLoop = (startCoord, grid, pathGrid) => {
    let steps = 0
    let currCoord = {...startCoord}
    pathGrid.set(currCoord, 0)
    let cameFrom = null
    do {
        const connPipes = getConnPipes(currCoord, grid)
        const { dir, coord } = connPipes.find(pipe => pipe.dir !== dirRev(cameFrom))
        cameFrom = dir
        currCoord = coord
        steps++
        pathGrid.set(currCoord, steps)
        console.log(`Path:\n${pathGrid.toString()}`)
    } while (!_.isEqual(currCoord, startCoord))
    return Math.round(steps / 2)
}

const getConnPipes = (coord, grid) => {
    return Object.entries(grid.getCardinalDirsFromPoint(coord))
        .filter(([dir, value]) => value.val !== null && pipeConnects(dir, value.val))
        .map(([dir, value]) => ({...value, dir}))
}
const detectStartPipe = grid => {
    const coord = grid.findValue('S')
    const connPipes = getConnPipes(coord, grid)
    const pipe = Object.entries(PIPES).find(([_key, value]) => connPipes.map(p => p.dir).every(dir => value.rev.includes(dir)))[0]
    grid.set(coord, pipe)
    return { pipe, coord, connPipes }
}

module.exports = (input) => {
    const grid = new Grid({data: splitClean(input)})
    const pathGrid = new Grid({rows: grid.rows, cols: grid.cols})
    console.log(grid.toString())
    console.log(pathGrid.toString())
    const { pipe: startPipe, coord: startCoords, connPipes } = detectStartPipe(grid)
    // console.log(`Start: ${JSON.stringify(startCoords)} Pipe: ${startPipe}, adj: ${JSON.stringify(grid.getCardinalDirsFromPoint(startCoords))}`)
    // const startAdj = grid.getAdjacentGrid(startCoords)
    // console.log(`Start subgrid: ${startAdj.toString()}`)
    const part1 = findLoop(startCoords, grid, pathGrid)
    return { part1, part2: 0 }
}