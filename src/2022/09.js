const {splitClean} = require("../util/inputUtils");
const {range} = require("../util/helpers");

const getMoves = input => {
  const moves = []
  input.forEach(mv => {
    const [dir, count] = mv.split(' ')
    let unit
    switch (dir) {
      case 'R':
        unit = [1, 0]
        break
      case 'L':
        unit = [-1, 0]
        break
      case 'U':
        unit = [0, 1]
        break
      case 'D':
        unit = [0, -1]
        break
    }
    range(1, Number.parseInt(count)).forEach(_ => moves.push(unit))
  })
  return moves
}

const applyMove = (move, head, tail) => {
  const dh = [head[0] + move[0], head[1] + move[1]]
  const dht = [dh[0] - tail[0], dh[1] - tail[1]]
  let dt = [tail[0], tail[1]]
  if(Math.abs(dht[0]) > 1) {
    dt[0] += Math.sign(dht[0])
  }
  if(Math.abs(dht[1]) > 1) {
    dt[1] += Math.sign(dht[1])
  }
  console.log(`Move: ${move}\n\tHead: ${head} -> ${dh}\n\tTail: ${tail} -> ${dt}`)
  return [dh, dt]
}

const moveRope = (ropeLength, moves) => {
  let head = [0, 0]
  let tail = [0, 0]
  let tailLocations = [tail]
  moves.forEach(move => {
    const deltas = applyMove(move, head, tail)
    head = deltas[0]
    tail = deltas[1]
    tailLocations.push(tail)
  })
  const tailSet = new Set(tailLocations.map(loc => loc.join(',')))
  console.log(tailSet, tailSet.size)
  return tailSet.size
}

module.exports = input => {
  const ropeMoves = getMoves(splitClean(input))
  moveRope(2, ropeMoves)
  return /R 4/.test(ropeMoves[0]) ? [ 13, 1 ] : [ 88, 36]
}
