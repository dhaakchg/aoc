const {splitClean} = require('../util/inputUtils')
const { UndirectedGraph } = require('../util/UndirectedGraph')

const parseToGraph = (input) => {
  const graph = new UndirectedGraph()
  splitClean(input).map(line => {
    const { name, outputs } = line.match(/^(?<name>\w+): (?<outputs>.+)$/).groups
    return { vertex: name.trim(), edges: outputs.split(' ').map(e => e.trim()) }
  }).forEach(({ vertex, edges }) => {
    graph.addVertex(vertex, edges)
  })
  return graph
}

const findPaths = (graph, start, end) => {
  const paths = []
  let stack = [{ vertex: start, path: new Set() }] // stack
  while(stack.length) {
    const { vertex: currentVertex, path } = stack.pop()
    const currentPath = new Set([...path, currentVertex])
    if(currentVertex === end) {
      paths.push(currentPath)
    }
    const edges = graph.adjacencyList.get(currentVertex) || [];
    edges.forEach(edge => {
      if(!currentPath.has(edge)) {
        stack.push({ vertex: edge, path: currentPath })
      }
    });
  }

  return paths
}

module.exports = (input) => {
  const g = parseToGraph(input)
  const part1 = findPaths(g, 'you', 'out').length
  const part2 = findPaths(g, 'svr', 'out').filter(p => p.has('dac') && p.has('fft')).length
  return { part1, part2 }
}
