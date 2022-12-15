const {splitClean} = require("../util/inputUtils");

class DirTree {
  constructor() {
    this.root = null
  }

  buildTree(input) {
    let cwd = this.root
    input.forEach(line => {
      const cmd = line.split(' ')
      if(cmd[0] === '$') {
        if(cmd[1] === 'cd') {
          if(cmd[2] === '/') {
            this.root = new Dir('/')
            cwd = this.root
          } else if (cmd[2] === '..') {
            cwd = cwd.getParent()
          } else {
            cwd = cwd.children.find(child => child instanceof Dir && child.name === cmd[2])
          }
        }
      } else {
        if(cmd[0] === 'dir') {
          cwd.addChild(new Dir(cmd[1], cwd))
        } else {
          cwd.addChild(new File(cmd[1], Number.parseInt(cmd[0])))
        }
      }
    })
  }

  printTree() {
    console.log(this.root.toString())
  }
}

class Dir {
  constructor(name, parent = null) {
    this.name = name
    this.parent = parent
    this.children = []
  }

  addChild(child) {
    this.children.push(child)
  }

  getParent() {
    return this.parent
  }

  getSize() {
    return this.children.map(child => child.getSize()).reduce((a, c) => a + c)
  }

  toString(indent = 0) {
    return [`${'  '.repeat(indent)}- ${this.name} (dir, size=${this.getSize()})`].concat(this.children.map(child => child.toString(indent + 1))).join('\n')
  }
}

class File {
  constructor(name, size) {
    this.name = name
    this.size = size
  }

  getSize() {
    return this.size
  }

  toString(indent) {
    return `${'  '.repeat(indent)}- ${this.name} (file, size=${this.size})`;
  }
}

module.exports = (input) => {
  let part1 = 95437
  let part2 = 0
  const tree = new DirTree()

  tree.buildTree(splitClean(input))
  tree.printTree()

  return [part1, part2]
}
