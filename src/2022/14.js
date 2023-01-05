const {splitClean} = require("../util/inputUtils");
const {range} = require("../util/helpers");
const Grid = require("../util/grid")

let SAND_SOURCE = [0, 500]
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
    return {
        ...bounds,
        rows: range(bounds.ymin, bounds.ymax).length,
        cols: range(bounds.xmin, bounds.xmax).length,
        xOffset: bounds.xmin
    }
}

const initRockGrid = (rawInput) => {
    const rlines = rockLines(rawInput)
    const {rows, cols, xOffset} = findGridBounds(rlines)
    const grid = new Grid({rows, cols})
    rlines.forEach(rl => {
        for(let i = 0; i < rl.length - 1; i++) {
            const start = rockToRowCol(rl[i], xOffset)
            const end = rockToRowCol(rl[i+1], xOffset)
            grid.drawLine(start, end, '#')
        }
    })
    SAND_SOURCE[1] -= xOffset
    grid.set(SAND_SOURCE[0], SAND_SOURCE[1], '+')
    return grid
}

const moveSand = (sand) => {

}

const dropSand = (grid) => {
    try {
        let sand = [SAND_SOURCE[0], SAND_SOURCE[1]]
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
            }
            if (sand !== prev) {
                // moved
                grid.set(prev[0], prev[1], '.')
                grid.set(sand[0], sand[1], 'o')
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
    const grid = initRockGrid(input)
    let grains = 0
    while(dropSand(grid)) {
        grains += 1
    }
    console.log(`${grid}`)
    return [grains, 100]
}