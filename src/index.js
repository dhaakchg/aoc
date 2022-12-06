const { getRawInput } = require('./util/inputUtils')
const day01 = require('./2022/01')
const day02 = require('./2022/02')
const day03 = require('./2022/03')

console.log('Day 01: ', day01(getRawInput(2022, 1)))
console.log('Day 02: ', day02(getRawInput(2022, 2)))
console.log('Day 03: ', day03(getRawInput(2022, 3)))
