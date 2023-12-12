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
const pipes = {
    '|': { conn: ['N', 'S'], rev: ['S', 'N'] },
    '-': { conn: ['E', 'W'], rev: ['W', 'E'] },
    'L': { conn: ['S', 'W'], rev: ['N', 'E'] }, // conn from perspective of the joining pipe, not N, E
    'J': { conn: ['S', 'E'], rev: ['N', 'W'] },
    '7': { conn: ['N', 'E'], rev: ['S', 'W'] },
    'F': { conn: ['N', 'W'], rev: ['S', 'E'] }
}

const isPipe = char => Object.keys(pipes).includes(char)
const pipeConnects = (dir, pipe) => {
    if (!isPipe(pipe)) {
        return false
    } else {
        return pipes[pipe].conn.includes(dir)
    }
}
const isGround = char => char === '.'
const connectingPipes = (pipe, compass) => {

}

const detectStartPipe = grid => {
    const coord = grid.findValue('S')
    const compass = grid.getCardinalDirsFromPoint(coord)
    const connectingDirections = Object.entries(compass).filter(([dir, value]) => {
        return value.val !== null && pipeConnects(dir, value.val)
    }).map(([dir]) => dir)
    const pipe = Object.entries(pipes).find(([_key, value]) => connectingDirections.every(dir => value.rev.includes(dir)))[0]
    return { pipe, coord }
}

module.exports = (input) => {
    const grid = new Grid({data: splitClean(input)})
    console.log(grid.toString())
    const { pipe: startPipe, coord: startCoords } = detectStartPipe(grid)
    console.log(`Start: ${JSON.stringify(startCoords)} Pipe: ${startPipe}, adj: ${JSON.stringify(grid.getCardinalDirsFromPoint(startCoords))}`)
    const startAdj = grid.getAdjacentGrid(startCoords)
    console.log(`Start subgrid: ${startAdj.toString()}`)
    return { part1: 0, part2: 0 }
}