const solution = require('./12')
const primer = `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`

test('Day 12', () => {
    expect(solution(primer)).toEqual({ part1: 21, part2: 0 })
})