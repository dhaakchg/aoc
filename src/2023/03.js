const {splitClean} = require("../util/inputUtils");
const { range } = require("../util/helpers")
const Grid = require("../util/grid");

const getPartNumAndIndexes = (grid) => {
    return [...grid.as1dArray().join('').matchAll(/(\d+)/g)].map(m => {
        return { partNum: parseInt(m[0]), indexes: range(m.index, m.index + m[0].length - 1).map(i => grid.getRowColFromIndex(i)) }
    })
}

const getSymbolIndexes = (grid) => {
    const indexes = []
    grid.as1dArray().forEach((val, index) => {
        if (val.match(/[^0-9.]/) !== null) indexes.push(grid.getRowColFromIndex(index))
    })
    return indexes
}

const numHasAdjSym = (parts, symbols, grid) => {
    return parts.map(part => {
        const { partNum, indexes } = part
        const partHasAdjSym = indexes.map(i => symbols.map(sym => grid.arePointsAdjacent(i, sym)).some(Boolean)).some(Boolean)
        return { partNum, partHasAdjSym }
    }).filter(p => p.partHasAdjSym).map(p => p.partNum)
}

const gearRatios = (parts, symbols, grid) => {
    return symbols.map(symbol => parts.filter(part => part.indexes.map(i => grid.arePointsAdjacent(symbol, i)).some(Boolean)))
        .filter(p => p.length === 2)
        .map(p => p.map(x => x.partNum)
            .reduce((a, c) => a * c)
        )
}

module.exports = (input) => {
    const grid = new Grid({data: splitClean(input)})
    const symbols = getSymbolIndexes(grid)
    const partNums = getPartNumAndIndexes(grid)
    const part1 = numHasAdjSym(partNums, symbols, grid).reduce((a, c) => a + c)
    const part2 = gearRatios(partNums, symbols, grid).reduce((a, c) => a + c)
    return { part1, part2 }
}