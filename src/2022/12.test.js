const solution = require('./12')
const primer = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`

test('Day 12', () => {
    expect(solution(primer)).toEqual([31, 29])
})