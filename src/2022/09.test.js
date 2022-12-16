const solution = require('./09')
const primer = [
  ['R 4\nU 4\nL 3\nD 1\nR 4\nD 1\nL 5\nR 2', [ 13, 1 ]],
  ['R 5\nU 8\nL 8\nD 3\nR 17\nD 10\nL 25\nU 20', [ 88, 36]]
]

test.each(primer)('Day 9', (input, expected) => {
  expect(solution(input)).toEqual(expected)
})
