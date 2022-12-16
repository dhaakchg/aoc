const solution = require('./08')
const primer = `30373
25512
65332
33549
35390`

test('Day 8', () => {
  expect(solution(primer)).toEqual([21, 8])
})
