const solution = require('./05')
const primer = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`

test('Day 05', () => {
    expect(solution(primer)).toEqual({ part1: 3, part2: 14 })
})
