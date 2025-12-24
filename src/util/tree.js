class TreeNode {
  constructor(value, children = []) {
    this.value = value;
    this.children = children;
  }
}

class Tree {
  constructor (root) {
    this.root = root;
  }

  addChild(parentNode, childNode) {
    parentNode.children.push(childNode);
  }

  traverseDFS(node = this.root, visitFn) {
    visitFn(node);
    node.children.forEach(child => this.traverseDFS(child, visitFn));
  }

  traverseBFS(visitFn) {
    const queue = [this.root];
    while (queue.length > 0) {
      const currentNode = queue.shift();
      visitFn(currentNode);
      queue.push(...currentNode.children);
    }
  }
}

module.exports = { Tree, TreeNode };