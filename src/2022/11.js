const Monkey = require('../util/monkey')
const {range} = require("../util/helpers");

const calcMonkeyBusines = (input, rndCount) => {
  let monkeys = []
  input.split(/\n{2}/).forEach(chunk => monkeys.push(new Monkey(chunk)))
  const product = monkeys.reduce((p, monkey) => p *= monkey.test.testNum, 1n)
  monkeys.forEach(monkey => monkey.product = product)
  const rounds = range(1, rndCount)
  rounds.forEach(round => {
    monkeys.forEach((monkey, i, array) => {
      const turnResult = monkey.turn(rndCount === 20)
      // console.log(turnResult.log.join('\n'))
      turnResult.transfer.forEach(transfer => {
        const {targetMonkey, worryLevel} = transfer
        array.find(t => t.id === targetMonkey).addItem(worryLevel)
      })
    })
    if([1].concat(range(10, 90, 10)).concat(range(100, 900, 100)).concat(range(1000, 10000, 1000)).includes(round)) {
      const roundResult = [`After round ${round}, the monkeys are holding items with these worry levels:`]
      monkeys.forEach(monkey => roundResult.push(`Monkey ${monkey.id}: ${monkey.currentItems}`))
      // console.log(roundResult.join('\n'))
      // console.log(`== After round ${round} ==\n${monkeys.map(m => `Monkey ${m.id} inspected items ${m.monkeyBusiness} times`).join('\n')}`)
    }
  })
  return monkeys.map(monkey => monkey.monkeyBusiness).sort((a, b) => b - a).slice(0,2).reduce((a, n) => a * n)
}

module.exports = (input) => {
  return [ calcMonkeyBusines(input, 20), calcMonkeyBusines(input, 10000) ]
}
