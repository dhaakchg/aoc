const solution = require('./01')
const primer1 = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`

const primer2 = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
oneight`

test('Day 1', () => {
    expect(solution(primer1).part1).toEqual(142)
    expect(solution(primer2).part2).toEqual(299)
})