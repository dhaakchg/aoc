const {splitClean} = require('../util/inputUtils')
const { euclideanDistance3d, combinationN } = require('../util/helpers')

class Circuit {
  constructor(jboxes = []) {
    this.jboxes = [...jboxes]
  }

  boxInCircuit(jbox) {
    return this.jboxes.some(circuitJbox =>
      circuitJbox.x === jbox?.x &&
      circuitJbox.y === jbox?.y &&
      circuitJbox.z === jbox?.z
    )
  }

  addToCircuit(jboxes) {
    jboxes.filter(jobx => !this.boxInCircuit(jobx)).forEach(jbox => this.jboxes.push(jbox))
  }

  isEqual(circuit) {
    return this.toString() === circuit?.toString();
  }

  toString() {
    return this.jboxes.map(jbox => jbox.toString()).join(' <-> ')
  }
}

class JBox {
  constructor(x, y, z) {
    this.x = x
    this.y = y
    this.z = z
    this.connections = []
  }

  connect(jbox) {
    this.connections.push(jbox)
  }

  isConnectedTo(jbox) {
    return this.connections.some(conn =>
      conn.x === jbox?.x &&
      conn.y === jbox?.y &&
      conn.z === jbox?.z
    )
  }

  isConnected() {
    return this.connections.length > 0
  }

  toString() {
    return `(x=${this.x},y=${this.y},z=${this.z})`
  }
}

const findBoxCircuit = (circuits, jbox) => {
  return circuits.find(circuit => circuit.boxInCircuit(jbox))
}

const boxesInSameCircuit = (circuits, boxA, boxB) => {
  const circuitA = findBoxCircuit(circuits, boxA)
  const circuitB = findBoxCircuit(circuits, boxB)
  return circuitA?.isEqual(circuitB)
}

const parseCoords = (input) => {
    return splitClean(input).map(line => {
        const [x, y, z] = line.split(',').map(Number)
        return new JBox(x, y, z)
    })
}

const sortBoxPairsByDistance = (jboxes) => {
  return [...combinationN(jboxes, 2)].map(([boxA, boxB]) => {
    return { boxA, boxB, distance: euclideanDistance3d(boxA, boxB) }
  }).toSorted((a, b) => a.distance - b.distance)
}

const findClosestUnconnectedBoxes = (jboxes, circuits) => {
  let closestBoxes = []
  let closestDistance = Infinity
  for(let i = 0; i < jboxes.length; i++) {
    const boxA = jboxes[i]
    for(let j = 0; j < jboxes.length; j++) {
      const boxB = jboxes[j]
      if(boxesInSameCircuit(circuits, boxA, boxB) || boxA.isConnectedTo(boxB) || boxB.isConnectedTo(boxA)) continue
      const distance = euclideanDistance3d(boxA, boxB)
      if(distance !== 0 && distance < closestDistance) {
        closestDistance = distance
        closestBoxes = [boxA, boxB]
      }
    }
  }
  return closestBoxes
}

const solve1 = (jboxes, connectionLimit) => {
  let circuits = []
  const shortestConnections = sortBoxPairsByDistance(jboxes)
  let connectionsMade = 0
  while(connectionsMade < connectionLimit) {
    const { boxA, boxB } = shortestConnections.shift()
    let circuitA = findBoxCircuit(circuits, boxA)
    let circuitB = findBoxCircuit(circuits, boxB)
    if(!circuitA?.isEqual(circuitB) && !boxA.isConnectedTo(boxB) && !boxB.isConnectedTo(boxA)) {
      // Boxes are not in the same circuit, connect and add
      boxA.connect(boxB)
      boxB.connect(boxA)
      connectionsMade++
      if(circuitA) {
        circuitA.addToCircuit([boxA, boxB])
      } else if (circuitB) {
        circuitB.addToCircuit([boxA, boxB])
      } else if (boxA && boxB) {
        circuits.push(new Circuit([boxA, boxB]))
      }
    }
  }

  return circuits.toSorted((cA, cB) => cB.jboxes.length - cA.jboxes.length).slice(0, 3).reduce((acc, circuit) => {
    console.log(`${circuit}`)
    return acc * circuit.jboxes.length
  }, 1)
}

module.exports = (input, limit = 1000) => {
  const jBoxes = parseCoords(input)
  const part1 = solve1(jBoxes, limit)
  return { part1, part2: 0 }
}
