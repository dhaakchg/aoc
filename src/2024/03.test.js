const solution = require('./03')
const primer1 = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`
const primer2 = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`

test('Day 3', () => {
    expect(solution(primer1)).toEqual({ part1: 161, part2: 161 })
    expect(solution(primer2)).toEqual({ part1: 161, part2: 48 })
})
