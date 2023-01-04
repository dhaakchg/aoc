const {splitClean} = require("../util/inputUtils");
const {range} = require("../util/helpers");
const Grid = require("../util/grid")

const SAND_SOURCE = [500, 0]
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

module.exports = (input) => {
    const rlines = rockLines(input)
    const {rows, cols, xOffset} = findGridBounds(rlines)
    const grid = new Grid({rows, cols})
    rlines.forEach(rl => {
        for(let i = 0; i < rl.length - 1; i++) {
            const start = rockToRowCol(rl[i], xOffset)
            const end = rockToRowCol(rl[i+1], xOffset)
            grid.drawLine(start, end, '#')
            console.log(`${grid}`)
        }
    })
    console.log(rlines, `\n${grid}`)
    return [24, 100]
}