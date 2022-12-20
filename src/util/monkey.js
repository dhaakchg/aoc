const RE = {
  monkey: /Monkey (?<id>\d+):/,
  startItems: /Starting items: (?<items>.*)/,
  operation: /Operation: (?<op>.*)/,
  test: /Test: (?<testOp>.*) by (?<testNum>\d+)/,
  testIf: /If (?<ifCond>.*): throw to monkey (?<monkey>\d+)/
}

class Monkey {
  constructor(monkeyDescriptor) {
    this.parse(monkeyDescriptor.trim())
    this.monkeyBusiness = 0
  }

  parse(chunk) {
    const instructions = chunk.split('\n').map(line => line.trim())
    this.id = this.parseId(instructions.find(line => RE.monkey.test(line)))
    this.currentItems = this.parseStartItems(instructions.find(line => RE.startItems.test(line)))
    this.op = this.parseOperation(instructions.find(line => RE.operation.test(line)))
    this.test = this.parseTest(instructions.find(line => RE.test.test(line)))
    this.ifCond = this.parseTestIf(instructions.filter(line => RE.testIf.test(line)))
  }

  parseId(line) {
    return Number.parseInt(line.match(RE.monkey).groups.id)
  }

  parseStartItems(line) {
    return line.match(RE.startItems).groups.items.split(',').map(item => Number.parseInt(item.trim()))
  }

  parseOperation(line) {
    const operation = line.match(RE.operation).groups.op
    let pieces = operation.split(' ')
    return {lhs: pieces[2], operator: pieces[3], rhs: Number.parseInt(pieces[4])}
  }

  parseTest(line) {
    const {testOp, testNum} = line.match(RE.test).groups
    return {testOp, testNum}
  }

  parseTestIf(lines) {
    const result = {}
    lines.forEach(line => {
      const {ifCond, monkey} = line.match(RE.testIf).groups
      result[ifCond] = Number.parseInt(monkey)
    })
    return result
  }

  addItem(item) {
    this.currentItems.push(item)
  }

  turn() {
    let turnResult = {log: [`Monkey ${this.id}:`], transfer: []}
    this.currentItems.forEach(item => {
      turnResult.log.push(`  Monkey inspects an item with a worry level of ${item}.`)
      let worryLevel = item
      let worryOp = ''
      switch (this.op.operator) {
        case '*':
          worryLevel *= isNaN(this.op.rhs) ? worryLevel : this.op.rhs
          worryOp = 'is multiplied'
          break
        case '+':
          worryLevel += isNaN(this.op.rhs) ? worryLevel : this.op.rhs
          worryOp = 'increases'
          break
        case '-':
          worryLevel -= isNaN(this.op.rhs) ? worryLevel : this.op.rhs
          worryOp = 'decreases'
          break
        case '/':
          worryLevel /= isNaN(this.op.rhs) ? worryLevel : this.op.rhs
          worryOp = 'is divided'
          break
      }
      turnResult.log.push(`    Worry level ${worryOp} by ${isNaN(this.op.rhs) ? item : this.op.rhs} to ${worryLevel}.`)
      worryLevel = Math.floor(worryLevel / 3)
      turnResult.log.push(`    Monkey gets bored with item. Worry level is divided by 3 to ${worryLevel}.`)
      let testResult = false
      switch (this.test.testOp) {
        case 'divisible':
          testResult = worryLevel % this.test.testNum === 0
          break
      }
      turnResult.log.push(`    Current worry level is${testResult ? ' ' : ' not '}${this.test.testOp} by ${this.test.testNum}.`)
      let targetMonkey = testResult ? this.ifCond['true'] : this.ifCond['false']
      turnResult.transfer.push({targetMonkey, worryLevel})
      turnResult.log.push(`    Item with worry level ${worryLevel} is thrown to monkey ${targetMonkey}.`)
      this.monkeyBusiness += 1
    })
    this.currentItems = []
    return turnResult
  }
}

module.exports = Monkey
