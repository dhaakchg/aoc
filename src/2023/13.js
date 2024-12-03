const {splitOnEmptyLine, splitClean} = require("../util/inputUtils");
const Grid = require("../util/grid");
const GridCoord = require("../util/gridCoord")

const createNoteGrids = input => {
    return splitOnEmptyLine(input).map(note => new Grid({data: splitClean(note)}))
}

const foldGridH = grid => {
    const gridRows = grid.getRows()


}
const findReflectionHorizontal = grid => {

}

module.exports = (input) => {
    createNoteGrids(input).forEach(g => console.log(`${g.toString()}`))
    return { part1: 0, part2: 0 }
}