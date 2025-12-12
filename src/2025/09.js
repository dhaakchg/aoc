const {splitClean} = require('../util/inputUtils')
const Grid = require("../util/grid");
const GridCoord = require("../util/gridCoord");
const { combinationN, range } = require('../util/helpers')

const getTiles = (input) => {
  return splitClean(input).map(line => {
    const [col, row] = line.split(',').map(Number)
    return new GridCoord(row, col)
  })
}

const solve1 = (redTiles) => {
  const corners = [...combinationN(redTiles, 2)]
  return corners.map(cornerPair => {
    const [coordA, coordB] = cornerPair
    const dX = Math.abs(coordA.col - coordB.col) + 1
    const dY = Math.abs(coordA.row - coordB.row) + 1
    return dX * dY
  }).toSorted((a, b) => b - a)[0]
}

const getPolygonPerimeter = (redTiles) => {
  const vertices = [...redTiles, redTiles[0]]
  const polygonEdges = { vertical: [], horizontal: [] }
  for(let i = 0; i < vertices.length - 1; i++) {
    const [start, end] = [vertices[i], vertices[i + 1]]
    const edge = getEdge(start, end)
    if (edge[0].col === edge[edge.length - 1].col) {
      polygonEdges.vertical.push(edge)
    } else {
      polygonEdges.horizontal.push(edge)
    }
  }
  return polygonEdges
}

const getEdge = (start, end) => {
  const { row: sr, col: sc } = start
  const { row: er, col: ec } = end
  // Draw vertical line
  if(sc === ec) {
    // console.log(`Drawing vertical line from ${start} -> ${end}`)
    const rowRange = sr <= er ? range(sr, er) : range(er, sr) // in case coordinates are backwards
    return rowRange.map(r => new GridCoord(r, sc))
  }
  // Draw horizontal line
  if(sr === er) {
    // console.log(`Drawing horizontal line from ${start} -> ${end}`)
    const colRange = sc <= ec ? range(sc, ec) : range(ec, sc) // in case coordinates are backwards
    return colRange.map(c => new GridCoord(sr, c))
  }
}

const getGridBounds = (redTiles) => {
  const rows = redTiles.map(tile => tile.row)
  const cols = redTiles.map(tile => tile.col)
  return {
    minRow: Math.min(...rows) - 1,
    maxRow: Math.max(...rows) + 1,
    minCol: Math.min(...cols) - 1,
    maxCol: Math.max(...cols) + 1,
  }
}

const pointOnEdge = (point, edges) => {
  return edges.find(edge => {
    return edge.find(edgePoint => edgePoint.row === point.row && edgePoint.col === point.col) !== undefined
  }) !== undefined
}

const castRay = (point, edges, bounds) => {
  let intersections = 0
  if(pointOnEdge(point, [...edges.horizontal, ...edges.vertical])) {
    return true // starting on the edge is inside already
  }
  // Cast ray to the right (increasing col)
  const row = point.row
  let onHorizontalEdge = false
  for(let col = point.col + 1; col < bounds.maxCol; col++) {
    const pointOnVerticalEdge = pointOnEdge({ row, col }, edges.vertical)
    const nextPointOnHorizontalEdge = pointOnEdge({ row, col: col + 1 }, edges.horizontal)
    if(pointOnVerticalEdge && !onHorizontalEdge && nextPointOnHorizontalEdge) {
      console.log(`Ray from (${point.row}, ${point.col}) intersected vertical edge onto horizontal at (${row}, ${col})`)
      onHorizontalEdge = true
      intersections++
    } else if(pointOnVerticalEdge && onHorizontalEdge && !nextPointOnHorizontalEdge) {
      onHorizontalEdge = false
      intersections++
      console.log(`Ray from (${point.row}, ${point.col}) intersected vertical edge off horizontal at (${row}, ${col})`)
    } else if(pointOnVerticalEdge && !onHorizontalEdge && !nextPointOnHorizontalEdge) {
      console.log(`Ray from (${point.row}, ${point.col}) intersected pure vertical edge at (${row}, ${col})`)
      intersections++
    }
  }
  if(intersections % 2 === 1) {
    return true // inside
  }
  return false // outside
}

const solve2 = (redTiles) => {
  const corners = [...combinationN(redTiles, 2)]
  const polygonEdges = getPolygonPerimeter(redTiles)
  const bounds = getGridBounds(redTiles)
  const inside = [
    new GridCoord(3, 8),
    new GridCoord(4, 4),
    new GridCoord(6, 10)
  ]
  const outside = [
    ...range(0, 8).map(r => new GridCoord(r, 0)),
    new GridCoord(2, 6),
    new GridCoord(2, 12),
  ]
  console.log(inside.map(point => castRay(point, polygonEdges, bounds)))
  console.log(outside.map(point => castRay(point, polygonEdges, bounds)))
  return 0
}

module.exports = (input) => {
  const redTiles = getTiles(input)
  return { part1: solve1(redTiles), part2: solve2(redTiles) }
}
