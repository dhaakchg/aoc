const {splitClean} = require('../util/inputUtils')

const getBestBatteries = (bank) => {
  let firstBatteryIndex = 0
  let firstBattery = Number.parseInt(bank[firstBatteryIndex])
  bank.slice(0, bank.length - 1).split('').map(Number).forEach((b, index) => {
    if(b > firstBattery) {
      firstBatteryIndex = index
      firstBattery = b
    }
  })
  let secondBattery = Number.parseInt(bank[firstBatteryIndex + 1])
  bank.slice(firstBatteryIndex + 1, bank.length).split('').map(Number).forEach(b => {
    if(b > secondBattery) {
      secondBattery = b
    }
  })
  return Number.parseInt(`${firstBattery}${secondBattery}`)
}

module.exports = (input) => {
  let part1 = 0
  let part2 = 0
  const banks = splitClean(input)
  banks.map(bank => {
    part1 += getBestBatteries(bank)
  })
  return { part1, part2 }
}
