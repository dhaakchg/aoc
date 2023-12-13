const solution = require('./10')

const test1 = `-L|F7
7S-7|
L|7||
-L-J|
L|-JF`

const test2 = `7-F7-
.FJ|7
SJLL7
|F--J
LJ.LJ`

const test3 = `...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........`

const test4 = `.F----7F7F7F7F-7....
.|F--7||||||||FJ....
.||.FJ||||||||L7....
FJL7L7LJLJ||LJ.L-7..
L--J.L7...LJS7F-7L7.
....F-J..F7FJ|L7L7L7
....L7.F7||L7|.L7L7|
.....|FJLJ|FJ|F7|.LJ
....FJL-7.||.||||...
....L---J.LJ.LJLJ...`

const test5 = `FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJIF7FJ-
L---JF-JLJIIIIFJLJJ7
|F|F-JF---7IIIL7L|7|
|FFJF7L7F-JF7IIL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L`

test('Day 10', () => {
    expect(solution(test1)).toEqual({ part1: 4, part2: 1 })
})

test('Day 10', () => {
    expect(solution(test2)).toEqual({ part1: 8, part2: 1 })
})

test('Day 10', () => {
    expect(solution(test3)).toEqual({ part1: 23, part2: 4 })
})

test('Day 10', () => {
    expect(solution(test4)).toEqual({ part1: 70, part2: 8 })
})

test('Day 10', () => {
    expect(solution(test5)).toEqual({ part1: 80, part2: 10 })
})