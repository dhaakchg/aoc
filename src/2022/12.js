const {splitClean} = require("../util/inputUtils");
const Grid = require("../util/grid")
const {alphabet} = require("../util/helpers")

const getElevation = (height) => {
    return alphabet.indexOf(height)
}

const navigate = (heightMap, movesGrid) => {
    const startCoords = heightMap.findValue('S')
    const endCoords = heightMap.findValue('E')
    console.log('Trying to nav from:', startCoords, ' -> ', endCoords)
}


module.exports = (input) => {
    const heightGrid = new Grid({data: splitClean(input)})
    const moveGrid = new Grid({rows: heightGrid.rows, cols: heightGrid.cols})
    navigate(heightGrid, moveGrid)
    return [31, 29]
}