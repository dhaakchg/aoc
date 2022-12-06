const solution = require('./02')
const primer = `A Y
B X
C Z
`

test('Day 2', () => {
  expect(solution(primer)).toEqual(12);
});
