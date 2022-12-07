const solution = require('./06')

test.each([
  ['mjqjpqmgbljsphdztnvjfqwrcgsmlb', [7, 19]],
  ['bvwbjplbgvbhsrlpgdmjqwftvncz', [5, 23]],
  ['nppdvjthqldpwncqszvftbrmjlhg', [6, 23]],
  ['nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', [10, 29]],
  ['zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', [11, 26]],
])('Day 6: %p first marker after char %p', (msgBuffer, markers) => {
  expect(solution(msgBuffer)).toEqual(markers)
})
