class UndirectedGraph {
  constructor(vertices = []) {
    this.adjacencyList = new Map();
    vertices.forEach(vertex => this.addVertex(vertex.toString()));
  }

  addVertex(vertex, edges = []) {
    if(!this.adjacencyList.has(vertex.toString())) {
      this.adjacencyList.set(vertex, edges);
    }
  }

  dfs(vertex, visited = new Set()) {
    visited.add(vertex);
    const edges = this.adjacencyList.get(vertex) || [];
    edges.forEach(edge => {
      if(!visited.has(edge)) {
        this.dfs(edge, visited);
      }
    });
    return visited;
  }
}

module.exports = { UndirectedGraph };