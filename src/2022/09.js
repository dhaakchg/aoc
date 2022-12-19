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

const applyMove = (move, rope) => {
  rope[0][0] += move[0]
  rope[0][1] += move[1]

  for(let i = 0; i < rope.length - 1; i++){
    const head = rope[i]
    const tail = rope[i + 1]
    const dx = head[0] - tail[0]
    const dy = head[1] - tail[1]
    if(Math.abs(dx) > 1 || Math.abs(dy) > 1) {
      if(dx === 0) {
        tail[1] += Math.floor(dy / 2)
      } else if(dy === 0) {
        tail[0] += Math.floor(dx / 2)
      } else {
        tail[0] += Math.sign(dx)
        tail[1] += Math.sign(dy)
      }
    }
  }
}

const moveRope = (ropeLength, moves) => {
  let rope = []
  range(1, Number.parseInt(ropeLength)).forEach(_ => rope.push([0,0])) // make rope at 0,0
  let tloc = []
  moves.forEach(move => {
    applyMove(move, rope)
    let tpos = []
    Object.assign(tpos, rope[ropeLength - 1])
    tloc.push(tpos)
    // console.log("Move:", move, "Rope =>", rope, "Tail Loc:", tloc)
  })
  const tset = new Set(tloc.map(loc => loc.join(',')))
  return tset.size
}

module.exports = input => {
  const ropeMoves = getMoves(splitClean(input))
  return [moveRope(2, ropeMoves), moveRope(10, ropeMoves)]
}
