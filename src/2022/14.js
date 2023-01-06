const {splitClean} = require("../util/inputUtils");
const {range} = require("../util/helpers");
const Grid = require("../util/grid")
const fs = require("fs");

let SAND_SOURCE = [0, 500]
const parseRockPaths = (raw) => {
    return splitClean(raw).map(line => line.split(' -> ').map(coords => {
        const [c, r] = coords.split(',').map(c => Number.parseInt(c))
        return [r, c]
    }))
}

const shiftRockPaths = (rockPaths, offset) => {
    return rockPaths.map(rockPath => rockPath.map(rock => {
        return [rock[0], (rock[1] - SAND_SOURCE[1]) + offset]
    }))
}
const findGridBounds = (rockLines) => {
    const bounds = { xmin: 0, xmax: 500, ymin: 0, ymax: 0}
    rockLines.forEach(line => {
        const [lxmin, lxmax] = [Math.min, Math.max].map(f => f(...line.map(coord => coord[1])))
        const [lymin, lymax] = [Math.min, Math.max].map(f => f(...line.map(coord => coord[0])))
        bounds.ymin = lymin < bounds.ymin ? lymin : bounds.ymin
        bounds.ymax = lymax > bounds.ymax ? lymax : bounds.ymax
    })
    bounds.p1limit = bounds.ymax
    bounds.ymax += 2
    bounds.xmax = (bounds.ymax * 2) + 4
    const rows = range(bounds.ymin, bounds.ymax).length
    const cols = range(bounds.xmin, bounds.xmax).length
    const calc = {
        rows,
        cols,
        offset: Math.floor(cols / 2)
    }
    console.log('Grid bounds:', {...bounds, ...calc})
    return {...bounds, ...calc}
}

const initRockGrid = (rPaths, bounds) => {
    const grid = new Grid({rows: bounds.rows, cols: bounds.cols})
    rPaths.forEach(rl => {
        for(let i = 0; i < rl.length - 1; i++) {
            const [sr, sc] = rl[i]
            const [er, ec] = rl[i+1]
            grid.drawLine([sr, sc], [er, ec], '#')
        }
    })
    grid.drawLine([bounds.ymax, bounds.xmin], [bounds.ymax, bounds.xmax], '#')
    grid.set(0, bounds.offset, '+')
    return grid
}

const dropSand = (grid, offset, limit = null) => {
    let sand = [0, offset]
    let sandAtRest = false
    do {
        const prev = [...sand]
        const nextRow = sand[0] + 1
        if (grid.get(nextRow, sand[1]) === '.') { // Try and go down
            sand[0] = nextRow
        } else if (grid.get(nextRow, sand[1] - 1) === '.') { // Try and go left
            sand[0] = nextRow
            sand[1] += -1
        } else if (grid.get(nextRow, sand[1] + 1) === '.') { // Try and go right
            sand[0] = nextRow
            sand[1] += 1
        } else {
            sandAtRest = true
            if(sand[0] === 0 && sand[1] === offset) {
                console.log(`Sand stopped at source!`)
                return false
            } else {
                // moved
                grid.set(prev[0], prev[1], '.')
                grid.set(sand[0], sand[1], 'o')
            }
        }
        if(limit && sand[0] === limit) {
            console.log(`Oh noes! Reach limit row ${limit}, sand must be falling into the abyss out of bounds now`)
            return false
        }
        // console.log(`${grid}`)
    } while (!sandAtRest)
    return true
}

module.exports = (input) => {
    const rlines = parseRockPaths(input)
    const bounds = findGridBounds(rlines)
    const rPaths = shiftRockPaths(rlines, bounds.offset)

    const grid1 = initRockGrid(rPaths, bounds)
    let grains1 = 0
    while(dropSand(grid1, bounds.offset, bounds.p1limit)) {
        grains1 += 1
    }
    console.log(`Grains: ${grains1}`)
    fs.writeFileSync('/Users/dhaak/Sources/aoc/input/2022/14.p1.txt', grid1.toString(), { flag: 'w' })

    const grid2 = initRockGrid(rPaths, bounds)
    let grains2 = 0
    while(dropSand(grid2, bounds.offset)) {
        grains2 += 1
    }
    console.log(`Grains: ${grains2}`)
    fs.writeFileSync('/Users/dhaak/Sources/aoc/input/2022/14.p2.txt', grid2.toString(), { flag: 'w' })
    return [grains1, grains2 + 1] // I don't understand this stupid bug
}