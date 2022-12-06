const { getRawInput } = require('./util/inputUtils')
const day01 = require('./2022/01')
const day02 = require('./2022/02')
const day03 = require('./2022/03')
const day04 = require('./2022/04')
const day05 = require('./2022/05')

console.log('Day 01: ', day01(getRawInput(2022, 1)))
console.log('Day 02: ', day02(getRawInput(2022, 2)))
console.log('Day 03: ', day03(getRawInput(2022, 3)))
console.log('Day 04: ', day04(getRawInput(2022, 4)))
console.log('Day 05: ', day05(getRawInput(2022, 5)))
