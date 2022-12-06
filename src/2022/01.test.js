const solution = require("./01");
const primer = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`

test('Day 1', () => {
  expect(solution(primer)).toEqual([24000, 45000]);
});
