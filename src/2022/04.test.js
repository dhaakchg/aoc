const solution = require('./04')
const primer = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8
`

test('Day 4', () => {
  expect(solution(primer)).toEqual([2, 4])
})
