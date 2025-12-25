const {splitClean} = require('../util/inputUtils')
const Grid = require("../util/grid");

class Present {
  constructor(id, shapeLines) {
    this.id = Number(id.replace(':', ''))
    this.shape = new Grid({ data: shapeLines })
  }
}

class Region {
  constructor(width, height, presentMap) {
    this.width = width
    this.height = height
    this.presentMap = presentMap
  }
}

const parseInput = (input) => {
  const chunks = input.replaceAll('\r', '').split(/\n{2}/)

  const presents = chunks.slice(0, chunks.length - 1).map(chunk => {
    const lines = chunk.split('\n').map(line => line.trim())
    return new Present(lines[0], lines.slice(1))
  })

  const regions = chunks[chunks.length - 1].split('\n').map(line => {
    const re = /^(?<width>\d+)x(?<length>\d+):\s+(?<presentMap>.*)$/
    const { width, length, presentMap } = line.match(re).groups
    return new Region(Number(width), Number(length), presentMap.split(' ').map(Number))
  })
  return { presents, regions }
}

module.exports = (input) => {
  const { presents, regions } = parseInput(input)
  return { part1: 0, part2: 0 }
}
