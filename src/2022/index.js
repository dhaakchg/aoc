const { getRawInput } = require('../util/inputUtils')
const path = require('path')
const year = path.basename(__dirname)
const day01 = require('./01')
const day02 = require('./02')
const day03 = require('./03')
const day04 = require('./04')
const day05 = require('./05')
const day06 = require('./06')
const day07 = require('./07')
const day08 = require('./08')
const day09 = require('./09')
const day10 = require('./10')
const day11 = require('./11')
// const day12 = require('./12')
const day13 = require('./13')
const day14 = require('./14')
const day15 = require('./15')
// const day16 = require('./16')
// const day17 = require('./17')
// const day18 = require('./18')
// const day19 = require('./19')
// const day20 = require('./20')
// const day21 = require('./21')
// const day22 = require('./22')
// const day23 = require('./23')
// const day24 = require('./24')
// const day25 = require('./25')

module.exports = (daysToRun = []) => {
    daysToRun.forEach(() => {

    })
    console.log('Day 01: ', day01(getRawInput(year, 1)))
    console.log('Day 02: ', day02(getRawInput(year, 2)))
    console.log('Day 03: ', day03(getRawInput(year, 3)))
    console.log('Day 04: ', day04(getRawInput(year, 4)))
    console.log('Day 05: ', day05(getRawInput(year, 5)))
    console.log('Day 06: ', day06(getRawInput(year, 6)))
    console.log('Day 07: ', day07(getRawInput(year, 7)))
    console.log('Day 08: ', day08(getRawInput(year, 8)))
    console.log('Day 09: ', day09(getRawInput(year, 9)))
    console.log('Day 10: ', day10(getRawInput(year, 10)))
    console.log('Day 11: ', [day11(getRawInput(year, 11), 20), day11(getRawInput(year, 11), 10000)])
// console.log('Day 12: ', day12(getRawInput(year, 12)))
    console.log('Day 13: ', day13(getRawInput(year, 13)))
    console.log('Day 14: ', day14(getRawInput(year, 14)))
    console.log('Day 15: ', day15({data: getRawInput(year, 15), yPos: 2000000, bBounds: [0, 4000000]}))
// console.log('Day 16: ', day16(getRawInput(year, 16)))
// console.log('Day 17: ', day17(getRawInput(year, 17)))
// console.log('Day 18: ', day18(getRawInput(year, 18)))
// console.log('Day 19: ', day19(getRawInput(year, 19)))
// console.log('Day 20: ', day20(getRawInput(year, 20)))
// console.log('Day 21: ', day21(getRawInput(year, 21)))
// console.log('Day 22: ', day22(getRawInput(year, 22)))
// console.log('Day 23: ', day23(getRawInput(year, 23)))
// console.log('Day 24: ', day24(getRawInput(year, 24)))
// console.log('Day 25: ', day25(getRawInput(year, 25)))
}