const Monkey = require('../util/monkey')
const {range} = require("../util/helpers");

module.exports = input => {
  let roundCounts = [20, 1000]
  return roundCounts.map(count => {
    let monkeys = []
    input.split(/\n{2}/).forEach(chunk => monkeys.push(new Monkey(chunk)))
    const rounds = range(1, count)
    rounds.forEach(round => {
      monkeys.forEach((monkey, i, array) => {
        const turnResult = monkey.turn(count === 20)
        // console.log(turnResult.log.join('\n'))
        turnResult.transfer.forEach(transfer => {
          const {targetMonkey, worryLevel} = transfer
          array.find(t => t.id === targetMonkey).addItem(worryLevel)
        })
      })
      if([1, 20].concat(range(100, 900, 100)).concat(range(1000, 10000, 1000)).includes(round)) {
        const roundResult = [`After round ${round}, the monkeys are holding items with these worry levels:`]
        monkeys.forEach(monkey => roundResult.push(`Monkey ${monkey.id}: ${monkey.currentItems}`))
        console.log(roundResult.join('\n'))
        console.log(`== After round ${round} ==\n${monkeys.map(m => `Monkey ${m.id} inspected items ${m.monkeyBusiness} times`).join('\n')}`)
      }
    })
    return monkeys.map(monkey => monkey.monkeyBusiness).sort((a, b) => b - a).slice(0,2).reduce((a, n) => a * n)
  })
}
