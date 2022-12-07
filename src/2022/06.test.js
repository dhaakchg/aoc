const solution = require('./06')

test.each([
  ['bvwbjplbgvbhsrlpgdmjqwftvncz', 5],
  ['nppdvjthqldpwncqszvftbrmjlhg', 6],
  ['nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 10],
  ['zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 11],
])('Day 6: %p first marker after char %p', (msgBuffer, marker) => {
  expect(solution(msgBuffer)).toEqual(marker)
})
