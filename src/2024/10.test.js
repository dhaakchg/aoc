const solution = require('./10')
const primer = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`


// for each trailhead
// check each adjacent cell.
//  if sequential from 0, start a new trail
//
// tracepath(grid, trailheadCoord, currenttrail)
// check each adjacent cell from current coordinate
// if
// if the previous coord is not in the trail, start a new trail.

test('Day 10', () => {
    expect(solution(primer)).toEqual({ part1: 36, part2: 81 })
})
