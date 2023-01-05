const {splitClean} = require("../util/inputUtils");
const {range} = require("../util/helpers");
const Grid = require("../util/grid")

let SAND_SOURCE = [0, 500]
let SOURCE_OFFSET = 0
const rockLines = (raw) => {
    return splitClean(raw)
        .map(line => line.split(' -> ')
            .map(coordinate => coordinate.split(',')
                .map(c => Number.parseInt(c))))
}

const rockToRowCol = (rock, offSet) => {
    return [rock[1], rock[0] - offSet]
}
const findGridBounds = (rockLines) => {
    const bounds = {xmin: 500, xmax: 500, ymin: 0, ymax: 0}
    rockLines.forEach(line => {
        const [lxmin, lxmax] = [Math.min, Math.max].map(f => f(...line.map(coord => coord[0])))
        const [lymin, lymax] = [Math.min, Math.max].map(f => f(...line.map(coord => coord[1])))
        bounds.xmin = lxmin < bounds.xmin ? lxmin : bounds.xmin
        bounds.xmax = lxmax > bounds.xmax ? lxmax : bounds.xmax
        bounds.ymin = lymin < bounds.ymin ? lymin : bounds.ymin
        bounds.ymax = lymax > bounds.ymax ? lymax : bounds.xmax
    })
    console.log('Grid bounds:', bounds)
    return bounds
}

const initRockGrid = (rawInput, addFloor= false) => {
    const rlines = rockLines(rawInput)
    let {xmin, xmax, ymin, ymax} = findGridBounds(rlines)
    if(addFloor) {
        ymax += 2
        xmin += (SAND_SOURCE[1] - ymax) - xmin
        xmax += (SAND_SOURCE[1] + ymax) - xmax
    }
    const rows = range(ymin, ymax).length
    const cols = range(xmin, xmax).length
    SOURCE_OFFSET = xmin
    const grid = new Grid({rows, cols})
    console.log(`xmin: ${xmin} xmax: ${xmax} ymin: ${ymin} ymax: ${ymax} offset: ${SOURCE_OFFSET}`)
    rlines.forEach(rl => {
        for(let i = 0; i < rl.length - 1; i++) {
            const start = rockToRowCol(rl[i], SOURCE_OFFSET)
            const end = rockToRowCol(rl[i+1], SOURCE_OFFSET)
            grid.drawLine(start, end, '#')
        }
    })
    if(addFloor) {
        grid.drawLine(rockToRowCol([xmin, ymax], SOURCE_OFFSET), rockToRowCol([xmax, ymax], SOURCE_OFFSET), '#')
    }
    grid.set(SAND_SOURCE[0], SAND_SOURCE[1] - SOURCE_OFFSET, '+')
    return grid
}

const dropSand = (grid) => {
    try {
        let sand = [SAND_SOURCE[0], SAND_SOURCE[1] - SOURCE_OFFSET]
        let sandAtRest = false
        do {
            const prev = [...sand]
            if (grid.get(sand[0] + 1, sand[1]) === '.') { // Try and go down
                sand[0] += 1
            } else if (grid.get(sand[0] + 1, sand[1] - 1) === '.') { // Try and go left
                sand[0] += 1
                sand[1] += -1
            } else if (grid.get(sand[0] + 1, sand[1] + 1) === '.') { // Try and go right
                sand[0] += 1
                sand[1] += 1
            } else {
                sandAtRest = true
                if(sand[0] === SAND_SOURCE[0] && sand[1] === SAND_SOURCE[1] - SOURCE_OFFSET) {
                    console.log(`Sand stopped at source!`)
                    return false
                } else {
                    // moved
                    grid.set(prev[0], prev[1], '.')
                    grid.set(sand[0], sand[1], 'o')
                }
            }
            // console.log(`${grid}`)
        } while (!sandAtRest)
        return true
    } catch (e) {
        console.log(`Caught ${e}, sand must be falling into the abyss out of bounds now`)
        return false
    }
}

module.exports = (input) => {
    const grid1 = initRockGrid(input)
    let grains1 = 0
    while(dropSand(grid1)) {
        grains1 += 1
    }
    console.log(`Grains: ${grains1}\n${grid1}`)

    const grid2 = initRockGrid(input, true)
    let grains2 = 0
    while(dropSand(grid2)) {
        grains2 += 1
    }
    // console.log(`Grains: ${grains2}\n${grid2}`)
    return [grains1, grains2]
}