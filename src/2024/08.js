const {splitClean} = require("../util/inputUtils")
const Grid = require("../util/grid")
const GridCoord = require("../util/gridCoord")
const { alphabet, combinationN } = require('../util/helpers')
const frequencies = [
  ...alphabet.split(''),
  ...alphabet.toUpperCase().split(''),
  ...'0123456789'.split('')
]

const getAntennas = (grid) => {
    const antennas = {}
    frequencies.forEach(freq =>  {
        const freqAntennas = grid.findAll(freq)
        if ( freqAntennas.length > 0 ) antennas[freq] = freqAntennas
    })
    return antennas
}

const freqAntinodes = (antennas, grid) => {
  const antinodes = new Set()
  for(let [freq, coords] of Object.entries(antennas)) {
    for (const [p1, p2] of combinationN(coords, 2)) {
      const dr = p2.row - p1.row
      const dc = p2.col - p1.col
      const a1 = new GridCoord(p1.row - dr, p1.col - dc)
      const a2 = new GridCoord(p2.row + dr, p2.col + dc);
      [a1, a2].forEach(a => {
        if(grid.coordInBounds(a)) {
          antinodes.add(`${a.row},${a.col}`)
        }
      })
    }
  }
  return antinodes
}

const freqAntinodes2 = (antennas, grid) => {
  const antinodes = new Set()
  for(let [_freq, coords] of Object.entries(antennas)) {
    for (const [p1, p2] of combinationN(coords, 2)) {
      antinodes.add(`${p1.row},${p1.col}`)
      antinodes.add(`${p2.row},${p2.col}`)
      const dr = p2.row - p1.row
      const dc = p2.col - p1.col
      let a1 = new GridCoord(p1.row, p1.col)
      let a2 = new GridCoord(p2.row, p2.col)
      do {
        a1 = new GridCoord(a1.row - dr, a1.col - dc)
        if(grid.coordInBounds(a1)) {
          antinodes.add(`${a1.row},${a1.col}`)
          // grid.set(a1, '#')
          // console.log(`Set antinode @${a1}\n${grid.toString()}`)
        }
      } while(grid.coordInBounds(a1))
      do {
        a2 = new GridCoord(a2.row + dr, a2.col + dc);
        if(grid.coordInBounds(a2)) {
          antinodes.add(`${a2.row},${a2.col}`)
          // grid.set(a2, '#')
          // console.log(`Set antinode @${a2}\n${grid.toString()}`)
        }
      } while (grid.coordInBounds(a2))
    }
  }
  return antinodes
}

module.exports = (input) => {
  const antennaMap = new Grid({data: splitClean(input)})
  const antennas = getAntennas(antennaMap)
  const antinodes = freqAntinodes(antennas, antennaMap)
  const antinodes2 = freqAntinodes2(antennas, antennaMap)
  return { part1: antinodes.size, part2: antinodes2.size }
}
