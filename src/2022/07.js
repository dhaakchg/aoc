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
            const newDir = new Dir(cmd[2], cwd)
            cwd.addChild(newDir)
            cwd = newDir
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
    this.root.children.forEach(child => {

    })

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
}

class File {
  constructor(name, size) {
    this.name = name
    this.size = size
  }

  getSize() {
    return this.size
  }
}

module.exports = (input) => {
  let part1 = 95437
  let part2 = 0
  const tree = new DirTree()

  tree.buildTree(splitClean(input))

  console.log(JSON.stringify(tree))

  return [part1, part2]
}
