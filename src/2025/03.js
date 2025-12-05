const {splitClean} = require('../util/inputUtils')

const getBestBatteries = (bank, batteriesToFind) => {
  const bankAsNumbers = bank.split('').map(Number)
  const bestBatteries = []
  let bestBatteryIndex = 0
  let startIndex = 0
  let endIndex = bank.length - batteriesToFind + 1
  for (let b = 0; b < batteriesToFind; b++) {
    bestBatteryIndex = startIndex
    for(let i = startIndex; i < endIndex; i++) {
      if(bankAsNumbers[i] > bankAsNumbers[bestBatteryIndex]) {
        bestBatteryIndex = i
      }
    }
    bestBatteries.push(bankAsNumbers[bestBatteryIndex])
    startIndex = bestBatteryIndex + 1
    endIndex++
  }

  return Number.parseInt(bestBatteries.join(''))
}

module.exports = (input) => {
  let part1 = 0
  let part2 = 0
  const banks = splitClean(input)
  banks.map(bank => {
    part1 += getBestBatteries(bank, 2)
    part2 += getBestBatteries(bank, 12)
  })
  return { part1, part2 }
}
