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
    return this.jboxes.map(jbox => jbox.toString()).join(':')
  }
}

class JBox {
  constructor(x, y, z) {
    this.x = x
    this.y = y
    this.z = z
    this.connections = new Set()
  }

  connect(jbox) {
    this.connections.add(jbox.toString())
  }

  isConnectedTo(jbox) {
    return this.connections.has(jbox.toString())
  }

  isConnected() {
    return this.connections.size > 0
  }

  toString() {
    return `(${this.x},${this.y},${this.z})`
  }
}

const findBoxCircuit = (circuits, jbox) => {
  return circuits.findIndex(circuit => circuit.boxInCircuit(jbox))
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

const solve1 = (jboxes, connectionLimit) => {
  let circuits = jboxes.map(jbox => new Circuit([jbox]))
  const shortestConnections = sortBoxPairsByDistance(jboxes)
  let connectionsMade = 0
  while(connectionsMade < connectionLimit) {
    const { boxA, boxB, distance } = shortestConnections.shift()
    console.log(`${boxA} ${boxB} : distance=${distance.toFixed(2)}`)
    let circuitAIdx = findBoxCircuit(circuits, boxA)
    let circuitBIdx = findBoxCircuit(circuits, boxB)
    if(circuitAIdx === -1 || circuitBIdx === -1) {
      throw new Error('Could not find circuit for box')
    }

    // Why does making the connection here make this work. Explicitly says to not connect them if already in
    // the same circuit but doing this below will never work.
    boxA.connect(boxB)
    boxB.connect(boxA)
    connectionsMade++

    console.log(`\tBoxA circuit idx: ${circuitAIdx}, BoxB circuit idx: ${circuitBIdx}`)
    if(circuitAIdx !== circuitBIdx) {
      // Boxes are not in the same circuit (and thus not connected yet), connect and add
      // boxA.connect(boxB)
      // boxB.connect(boxA)
      // connectionsMade++
      // Merge circuits
      console.log(`\tAdded connection between ${boxA} and ${boxB}; merging circuits: ${circuits[circuitAIdx]} + ${circuits[circuitBIdx]}`)
      circuits[circuitAIdx].addToCircuit(circuits[circuitBIdx].jboxes)
      circuits.splice(circuitBIdx, 1)
      circuits.sort((cA, cB) => cB.jboxes.length - cA.jboxes.length)
      console.log(`\t${circuits.length} circuits remain after merge.`)
    } else {
      console.log(`\tSkipping connection between ${boxA} and ${boxB}; already connected in circuit: ${circuits[circuitAIdx]}`)
    }
  }
  circuits.sort((cA, cB) => cB.jboxes.length - cA.jboxes.length)
  return circuits.slice(0, 3).reduce((acc, circuit) => {
    console.log(`${circuit}`)
    return acc * circuit.jboxes.length
  }, 1)
}

const solve2 = (jboxes) => {
  let circuits = jboxes.map(jbox => new Circuit([jbox]))
  const shortestConnections = sortBoxPairsByDistance(jboxes)
  let lastConnection = []
  while(circuits.length > 1) {
    const { boxA, boxB, distance } = shortestConnections.shift()
    console.log(`${boxA} ${boxB} : distance=${distance.toFixed(2)}`)
    let circuitAIdx = findBoxCircuit(circuits, boxA)
    let circuitBIdx = findBoxCircuit(circuits, boxB)
    if(circuitAIdx === -1 || circuitBIdx === -1) {
      throw new Error('Could not find circuit for box')
    }

    // Why does making the connection here make this work. Explicitly says to not connect them if already in
    // the same circuit but doing this below will never work.
    boxA.connect(boxB)
    boxB.connect(boxA)
    lastConnection = [boxA, boxB]
    console.log(`\tBoxA circuit idx: ${circuitAIdx}, BoxB circuit idx: ${circuitBIdx}`)
    if(circuitAIdx !== circuitBIdx) {
      // Boxes are not in the same circuit (and thus not connected yet), connect and add
      // boxA.connect(boxB)
      // boxB.connect(boxA)
      // connectionsMade++
      // Merge circuits
      console.log(`\tAdded connection between ${boxA} and ${boxB}; merging circuits: ${circuits[circuitAIdx]} + ${circuits[circuitBIdx]}`)
      circuits[circuitAIdx].addToCircuit(circuits[circuitBIdx].jboxes)
      circuits.splice(circuitBIdx, 1)
      circuits.sort((cA, cB) => cB.jboxes.length - cA.jboxes.length)
      console.log(`\t${circuits.length} circuits remain after merge.`)
    } else {
      console.log(`\tSkipping connection between ${boxA} and ${boxB}; already connected in circuit: ${circuits[circuitAIdx]}`)
    }
  }
  return lastConnection[0].x * lastConnection[1].x
}

module.exports = (input, limit = 1000) => {
  const jBoxes = parseCoords(input)
  const part1 = solve1(jBoxes, limit)
  const part2 = solve2(jBoxes)
  return { part1, part2 }
}
