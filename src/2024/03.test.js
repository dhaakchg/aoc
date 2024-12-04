const solution = require('./03')
const primer = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`

test('Day 3', () => {
    expect(solution(primer)).toEqual({ part1: 161, part2: 0 })
})
