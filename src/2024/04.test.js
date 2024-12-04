const solution = require('./04')
const primer = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`

test('Day 4', () => {
    expect(solution(primer)).toEqual({ part1: 'primer', part2: 'input' })
})
