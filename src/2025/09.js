const {splitClean} = require('../util/inputUtils')
const GridCoord = require("../util/gridCoord");
const { combinationN } = require('../util/helpers')

const getTiles = (input) => {
  return splitClean(input).map(line => {
    const [col, row] = line.split(',').map(Number)
    return new GridCoord(row, col)
  })
}

const solve1 = (redTiles) => {
  const corners = [...combinationN(redTiles, 2)]
  return corners.map(cornerPair => calcRectangleArea(...cornerPair)).toSorted((a, b) => b - a)[0]
}

const calcRectangleArea = (coordA, coordB) => {
  const dX = Math.abs(coordA.col - coordB.col) + 1
  const dY = Math.abs(coordA.row - coordB.row) + 1
  return dX * dY
}

const getPolygonPerimeter = (redTiles) => {
  const vertices = [...redTiles, redTiles[0]]
  const polygonEdges = { vertical: [], horizontal: [] }
  for(let i = 0; i < vertices.length - 1; i++) {
    const [start, end] = [vertices[i], vertices[i + 1]]
    const edge = getEdge(start, end)
    if ('rows' in edge) {
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
    const rowRange = sr <= er ? { start: sr, end: er } : { start: er, end: sr } // in case coordinates are backwards
    return { rows: rowRange, col: sc }
  }
  // Draw horizontal line
  if(sr === er) {
    const colRange = sc <= ec ? { start: sc, end: ec } : { start: ec, end: sc } // in case coordinates are backwards
    return { cols: colRange, row: sr }
  }
}

const pointOnEdge = (point, edges) => {
  return edges.find(edge => {
    return ('col' in edge && point.col === edge.col && edge.rows.start <= point.row && point.row <= edge.rows.end) ||
      ('row' in edge && point.row === edge.row && edge.cols.start <= point.col && point.col <= edge.cols.end)
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
      // console.log(`Ray from (${point.row}, ${point.col}) intersected vertical edge onto horizontal at (${row}, ${col})`)
      onHorizontalEdge = true
      intersections++
    } else if(pointOnVerticalEdge && onHorizontalEdge && !nextPointOnHorizontalEdge) {
      onHorizontalEdge = false
      intersections++
      // console.log(`Ray from (${point.row}, ${point.col}) intersected vertical edge off horizontal at (${row}, ${col})`)
    } else if(pointOnVerticalEdge && !onHorizontalEdge && !nextPointOnHorizontalEdge) {
      // console.log(`Ray from (${point.row}, ${point.col}) intersected pure vertical edge at (${row}, ${col})`)
      intersections++
    }
  }
  if(intersections % 2 === 1) {
    return true // inside
  }
  return false // outside
}

function edgeIntersectsRect(rectangle, edge) {
  const { topLeft, topRight, bottomLeft, bottomRight } = rectangle
  const leftEdge = getEdge(topLeft, bottomLeft)
  const rightEdge = getEdge(topRight, bottomRight)
  const topEdge = getEdge(topLeft, topRight)
  const bottomEdge = getEdge(bottomLeft, bottomRight)

  if('rows' in edge) {
    // Vertical edge
    const edgeCol = edge.col
    const edgeRowStart = edge.rows.start
    const edgeRowEnd = edge.rows.end
    if(edgeCol <= leftEdge.col || edgeCol >= rightEdge.col) {
      return false // line is outside rectangle X bounds
    }
    if(edgeRowEnd <= topEdge.row || edgeRowStart >= bottomEdge.row) {
      return false // line is outside rectangle Y bounds
    }
  }
  if('cols' in edge) {
    // Horizontal edge
    const edgeRow = edge.row
    const edgeColStart = edge.cols.start
    const edgeColEnd = edge.cols.end
    if(edgeRow <= topEdge.row || edgeRow >= bottomEdge.row) {
      return false // line is outside rectangle Y bounds
    }
    if(edgeColEnd <= leftEdge.col || edgeColStart >= rightEdge.col) {
      return false // line is outside rectangle X bounds
    }
  }
  return true;
}

const solve2 = (redTiles) => {
  const polygonEdges = getPolygonPerimeter(redTiles)
  const rectanglesToCheck = []
  for(const pair of combinationN(redTiles, 2)) {
    const [coordA, coordB] = pair
    const corners = getCornersOfRectangle(coordA, coordB)
    const area = calcRectangleArea(coordA, coordB)
    rectanglesToCheck.push({ corners, area })
  }
  rectanglesToCheck.sort((a, b) => b.area - a.area)
  return Math.max(...rectanglesToCheck.filter(({ corners }) => {
    for(const edge of [...polygonEdges.horizontal, ...polygonEdges.vertical]) {
      if(edgeIntersectsRect(corners, edge)) {
        return false
      }
    }
    return true
  }).map(rectangle => rectangle.area))
}

const getCornersOfRectangle = (coordA, coordB) => {
  const minRow = Math.min(coordA.row, coordB.row)
  const maxRow = Math.max(coordA.row, coordB.row)
  const minCol = Math.min(coordA.col, coordB.col)
  const maxCol = Math.max(coordA.col, coordB.col)
  return {
    topLeft: new GridCoord(minRow, minCol),
    topRight: new GridCoord(minRow, maxCol),
    bottomLeft: new GridCoord(maxRow, minCol),
    bottomRight: new GridCoord(maxRow, maxCol),
  }
}

module.exports = (input) => {
  const redTiles = getTiles(input)
  return { part1: solve1(redTiles), part2: solve2(redTiles) }
}
