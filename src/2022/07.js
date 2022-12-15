const {splitClean} = require("../util/inputUtils");
const maxDirSize = 100000
const fileSysSize = 70000000
const unusedReq = 30000000

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

  part1() {
    const dirs = this.root.matchPart1()
    return dirs.map(dir => {
      // console.log(`dir: ${dir.name} size: ${dir.getSize()} <= ${maxDirSize}`)
      return dir.getSize()
    }).reduce((a, c) => a + c)
  }

  part2() {
    const totalUsed = this.root.getSize()
    const unusedSpace = fileSysSize - totalUsed
    const allDirs = [this.root].concat(this.root.getSubDirs())
    // console.log('/ using:', totalUsed, 'total dirs:', allDirs.length)
    let wouldWork = allDirs.filter(dir => unusedSpace + dir.size >= unusedReq)
    wouldWork.sort((a, b) => a.size - b.size)
    return wouldWork[0].size
  }
}

class Dir {
  constructor(name, parent = null) {
    this.name = name
    this.parent = parent
    this.children = []
    this.size = null
  }

  addChild(child) {
    this.children.push(child)
  }

  getParent() {
    return this.parent
  }

  getSize() {
    if(this.size === null) {
      this.size = this.children.map(child => child.getSize()).reduce((a, c) => a + c)
    }
    return this.size
  }

  toString(indent = 0) {
    return [`${'  '.repeat(indent)}- ${this.name} (dir, size=${this.getSize()})`].concat(this.children.map(child => child.toString(indent + 1))).join('\n')
  }

  matchPart1() {
    // this is gross.
    let matches = this.getSize() <= maxDirSize ? [this] : []
    return matches.concat(this.children.filter(child => child instanceof Dir).map(child => child.matchPart1())).flat()
  }

  getSubDirs() {
    const subDirs = this.children.filter(child => child instanceof Dir)
    return subDirs.concat(subDirs.map(sub => sub.getSubDirs())).flat()
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
  let part2 = 0
  const tree = new DirTree()

  tree.buildTree(splitClean(input))
  tree.printTree()

  return [tree.part1(), tree.part2()]
}
